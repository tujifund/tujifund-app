package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"tujifund-app/backend/auth"
	"tujifund-app/backend/database"

	"golang.org/x/crypto/bcrypt"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

const port = "8080"

func main() {
	// Configure SQLite database
	config := database.DBConfig{
		Driver: "sqlite",
		DBName: "data/tujifund.db",
	}

	// Create new database instance
	db, err := database.NewDBInstance(config)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer func() {
		if err := db.Close(); err != nil {
			log.Printf("Error closing database: %v", err)
		}
	}()

	// Initialize database schema
	if err := db.InitializeDatabase(); err != nil {
		log.Printf("Failed to initialize database: %v", err)
		log.Println("Attempting to continue with existing schema...")
	}

	// Create router
	router := mux.NewRouter()

	// Add CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"}, // Allow both dev servers
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Wrap router with CORS
	handler := c.Handler(router)

	// API endpoints
	router.HandleFunc("/api/users", getUsersHandler(db)).Methods("GET")
	// router.HandleFunc("/api/chamas", getChamasHandler(db)).Methods("GET")
	// Add more endpoints as needed

	// Add authentication endpoints
	router.HandleFunc("/api/register", registerHandler(db)).Methods("POST")
	router.HandleFunc("/api/login", loginHandler(db)).Methods("POST")
	router.HandleFunc("/api/verify", verifyHandler(db)).Methods("POST")
	router.HandleFunc("/api/user/profile", HandleUserProfile(db)).Methods("GET")
	router.HandleFunc("/auth/google/signin", auth.HandleGoogleLogin)
	router.HandleFunc("/auth/callback", auth.HandleGoogleCallback)
	router.HandleFunc("/api/protected", sessionMiddleware(db, protectedHandler)).Methods("GET")

	// Start server with CORS handler
	log.Printf("Starting server on http://localhost:%s\n", port)
	log.Printf("API endpoints available at http://localhost:%s/api/*\n", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

// API handler for fetching user profile
func HandleUserProfile(db *database.DBInstance) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		session, _ := auth.Store.Get(r, "sessionname")
		email := session.Values["Email"]
		name := session.Values["Name"]

		if email == nil || name == nil {
			http.Error(w, "User not authenticated", http.StatusUnauthorized)
			return
		}

		row := db.GetDB().QueryRow(`
    		SELECT id, username, email 
    		FROM users 
    		WHERE email = ? AND username = ?`, email, name)
		var id, username, dbEmail string
		err := row.Scan(&id, &username, &dbEmail)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "User not Found", http.StatusInternalServerError)
				return
			} else {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
		// Respond with user data
		user := map[string]string{
			"id":    id,
			"email": dbEmail,
			"name":  username,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}
}

// Example handler function
func getUsersHandler(db *database.DBInstance) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Query database
		rows, err := db.GetDB().Query("SELECT id, username, email FROM users")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Process results
		var users []map[string]interface{}
		for rows.Next() {
			var id, username, email string
			if err := rows.Scan(&id, &username, &email); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			users = append(users, map[string]interface{}{
				"id":       id,
				"username": username,
				"email":    email,
			})
		}

		// Return JSON response
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(users)
	}
}

// Register handler
func registerHandler(db *database.DBInstance) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		var user struct {
			Username  string `json:"username"`
			Email     string `json:"email"`
			Password  string `json:"password"`
			FirstName string `json:"firstName"`
			Surname   string `json:"surname"`
			Phone     string `json:"phone"`
			Country   string `json:"country"`
		}

		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		log.Printf("Registering user: %s, email: %s", user.Username, user.Email)

		// Validate required fields
		if user.Username == "" || user.Email == "" || (user.Password == "" && r.Header.Get("X-Google-Auth") != "true") {
			http.Error(w, "Username, email and password are required (unless using Google auth)", http.StatusBadRequest)
			return
		}

		userID := generateUserID()
		// Generate a unique ID for the user
		passwordHash := ""
		// Hash password
		if user.Password != "" {
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			if err != nil {
				log.Printf("Error hashing password: %v", err)
				http.Error(w, "Failed to hash password", http.StatusInternalServerError)
				return
			}
			passwordHash = string(hashedPassword)
		}

		// Simplified direct insert - avoid complex schema checks for now
		_, err := db.GetDB().Exec(`
			INSERT INTO users 
			(user_id, username, email, password_hash, first_name, last_name, phone_number, country, is_verified) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			userID, user.Username, user.Email, passwordHash, user.FirstName, user.Surname, user.Phone, user.Country,
			1, // Set is_verified to 1 (true) for development
		)
		if err != nil {
			log.Printf("Database error during registration: %v", err)

			if strings.Contains(err.Error(), "UNIQUE constraint failed") {
				http.Error(w, "Username or email already exists", http.StatusConflict)
			} else {
				http.Error(w, "Failed to create user: "+err.Error(), http.StatusInternalServerError)
			}
			return
		}

		// Create session
		session, _ := auth.Store.Get(r, "sessionname")
		session.Values["Email"] = user.Email
		session.Values["Name"] = user.Username
		if err := session.Save(r, w); err != nil {
			log.Printf("Failed to session: %v", err)
			http.Error(w, "Failed to create session", http.StatusInternalServerError)
			return
		}

		// Generate JWT token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"userId":   userID,
			"email":    user.Email,
			"username": user.Username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

		tokenString, err := token.SignedString([]byte(os.Getenv("GOOGLE_CLIENT_SECRET")))
		if err != nil {
			log.Printf("Failed to generate token: %v", err)
			http.Error(w, "Failed to generate token", http.StatusInternalServerError)
			return
		}

		// Return success response
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "User registered successfully",
			"userId":  userID,
			"token":   tokenString,
		})
	}
}

// Generate a unique ID for the user
func generateUserID() string {
	return time.Now().Format("20060102150405") + "_" + generateRandomString(8)
}

// Generate a random string of specified length
func generateRandomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	result := make([]byte, length)
	for i := range result {
		result[i] = charset[time.Now().UnixNano()%int64(len(charset))]
		time.Sleep(1 * time.Nanosecond) // To ensure uniqueness
	}
	return string(result)
}

// Login handler
func loginHandler(db *database.DBInstance) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var credentials struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Check if is_verified column exists
		var hasIsVerified bool
		err := db.GetDB().QueryRow(`
			SELECT COUNT(*) FROM pragma_table_info('users') 
			WHERE name = 'is_verified'
		`).Scan(&hasIsVerified)
		if err != nil {
			http.Error(w, "Failed to check schema: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Get user from database
		var user struct {
			ID           string
			Username     string
			Email        string
			PasswordHash string
			FirstName    string
			LastName     string
			PhoneNumber  string
			Country      string
			IsVerified   bool
		}

		var queryFields string
		if hasIsVerified {
			queryFields = "id, username, email, password_hash, first_name, last_name, phone_number, country, is_verified"
		} else {
			queryFields = "id, username, email, password_hash, first_name, last_name, phone_number, country"
		}

		var row *sql.Row
		if hasIsVerified {
			row = db.GetDB().QueryRow(`
				SELECT `+queryFields+` FROM users WHERE email = ?`,
				credentials.Email,
			)
			err = row.Scan(&user.ID, &user.Username, &user.Email, &user.PasswordHash, &user.FirstName, &user.LastName, &user.PhoneNumber, &user.Country, &user.IsVerified)
		} else {
			row = db.GetDB().QueryRow(`
				SELECT `+queryFields+` FROM users WHERE email = ?`,
				credentials.Email,
			)
			err = row.Scan(&user.ID, &user.Username, &user.Email, &user.PasswordHash, &user.FirstName, &user.LastName, &user.PhoneNumber, &user.Country)

			// Assume verified if column doesn't exist
			user.IsVerified = true
		}

		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			} else {
				http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			}
			return
		}

		// Check password
		if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(credentials.Password)); err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		// Only check verification if the column exists
		if hasIsVerified && !user.IsVerified {
			http.Error(w, "Account not verified", http.StatusForbidden)
			return
		}

		// Generate JWT token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"userId":   user.ID,
			"email":    user.Email,
			"username": user.Username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

		tokenString, err := token.SignedString([]byte("your-secret-key"))
		if err != nil {
			http.Error(w, "Failed to generate token", http.StatusInternalServerError)
			return
		}
		// Extract user agent
		userAgent := r.UserAgent()

		// Extract IP address
		ip := r.RemoteAddr
		if forwarded := r.Header.Get("X-Forwarded-For"); forwarded != "" {
			ip = strings.Split(forwarded, ",")[0]
		}

		sessionID, err := database.CreateSession(db.GetDB(), user.ID, tokenString, ip, userAgent, database.SessionTimeout)
		if err != nil {
			http.Error(w, "Failed to create session", http.StatusInternalServerError)
			return
		}

		// Return success response with token and user info
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":   "Login successful",
			"token":     tokenString,
			"sessionId": sessionID,
			"user": map[string]interface{}{
				"id":          user.ID,
				"username":    user.Username,
				"email":       user.Email,
				"firstName":   user.FirstName,
				"lastName":    user.LastName,
				"phoneNumber": user.PhoneNumber,
				"country":     user.Country,
			},
		})
	}
}

// Verification handler
func verifyHandler(db *database.DBInstance) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var request struct {
			Token string `json:"token"`
		}

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// Verify token
		var userID string
		err := db.GetDB().QueryRow(`
			SELECT id FROM users WHERE verification_token = ?`,
			request.Token,
		).Scan(&userID)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Invalid token", http.StatusNotFound)
			} else {
				http.Error(w, "Database error", http.StatusInternalServerError)
			}
			return
		}

		// Mark user as verified
		_, err = db.GetDB().Exec(`
			UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?`,
			userID,
		)
		if err != nil {
			http.Error(w, "Failed to verify user", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Account verified successfully"})
	}
}

func generateToken() string {
	return "random-token"
}

func sessionMiddleware(db *database.DBInstance, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessionID := r.Header.Get("X-Session-ID")
		if sessionID == "" {
			http.Error(w, "Session ID required", http.StatusUnauthorized)
			return
		}
		valid, _, err := database.IsValidSession(db.GetDB(), sessionID)
		if err != nil {
			http.Error(w, "Failed to validate session", http.StatusInternalServerError)
			return
		}
		if !valid {
			http.Error(w, "Invalid session", http.StatusUnauthorized)
			return
		}
		if err := database.UpdateSessionActivity(db.GetDB(), sessionID); err != nil {
			http.Error(w, "Failed to update session activity", http.StatusInternalServerError)
			return
		}

		next.ServeHTTP(w, r)
	}
}

func protectedHandler(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value("userID").(string)
	if !ok {
		http.Error(w, "User ID not found in context", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Access granted",
		"userID":  userID,
	})
}
