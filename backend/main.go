package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"
	"tujifund-app/backend/auth"
	"tujifund-app/backend/database"

	"golang.org/x/crypto/bcrypt"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

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
	//router.HandleFunc("/api/chamas", getChamasHandler(db)).Methods("GET")
	// Add more endpoints as needed

	// Add authentication endpoints
	router.HandleFunc("/api/register", registerHandler(db)).Methods("POST")
	router.HandleFunc("/api/login", loginHandler(db)).Methods("POST")
	router.HandleFunc("/api/verify", verifyHandler(db)).Methods("POST")

	router.HandleFunc("/auth/google/signin",auth.HandleGoogleLogin)
	router.HandleFunc("/auth/callback", auth.HandleGoogleCallback)

	// Start server with CORS handler
	log.Println("Starting server on http://localhost:8080")
	log.Println("API endpoints available at http://localhost:8080/api/*")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("Failed to start server: %v", err)
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

		// Log received data for debugging
		log.Printf("Registering user: %s, email: %s", user.Username, user.Email)

		// Validate required fields
		if user.Username == "" || user.Email == "" {
			http.Error(w, "Username, email and password are required", http.StatusBadRequest)
			return
		}

		// Hash password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Failed to hash password", http.StatusInternalServerError)
			return
		}

		// Generate a unique ID for the user
		userID := generateUserID()

		// Simplified direct insert - avoid complex schema checks for now
		_, err = db.GetDB().Exec(`
			INSERT INTO users 
			(user_id, username, email, password_hash, first_name, last_name, phone_number, country, is_verified) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			userID, user.Username, user.Email, string(hashedPassword),
			user.FirstName, user.Surname, user.Phone, user.Country,
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

		// Return success response
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "User registered successfully",
			"userId":  userID,
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

		// Return success response with token and user info
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Login successful",
			"token":   tokenString,
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

// Helper function to generate verification token
func generateToken() string {
	return "random-token" // Replace with actual token generation
}
