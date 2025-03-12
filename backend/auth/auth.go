package auth

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
	ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
	RedirectURL:  redirectURL,
	Scopes:       []string{"email", "profile"},
	Endpoint:     google.Endpoint,
}

// Session store
var Store = sessions.NewCookieStore([]byte("super-secret-key"))
var redirectURL string
func init() {
	// check if runninng in production or locally
	if os.Getenv("RENDER") == "true" {
		redirectURL = "http://https://tujifund-app.onrender.com/auth/callback"
	} else {
		redirectURL = "http://localhost:8080/auth/callback"
	}

}

func HandleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	Url := googleOauthConfig.AuthCodeURL("random-state-token")
	http.Redirect(w, r, Url, http.StatusTemporaryRedirect)
}

func HandleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "authoriztion code not found", http.StatusBadRequest)
		return
	}
	token, err := googleOauthConfig.Exchange(r.Context(), code)
	if err != nil {
		http.Error(w, "failed to exchange token", http.StatusBadRequest)
		return
	}
	// fetch user info from google
	client := googleOauthConfig.Client(r.Context(), token)
	resp, err := client.Get(("https://www.googleapis.com/oauth2/v2/userinfo"))
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var user struct {
		Email string `json:"email"`
		Name  string `json:"name"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		http.Error(w, "Failed to parse user info", http.StatusInternalServerError)
		return
	}
	// create session
	session, _ := Store.Get(r, "sessionname")
	session.Values["Email"] = user.Email
	session.Values["Name"] = user.Name
	if err := session.Save(r, w); err != nil {
		http.Error(w, "Failed to save session", http.StatusInternalServerError)
		return
	}

	// make an api call to  http://localhost:8080/api/register to register user using the user.Email and user.Name
	userData := map[string]string{
		"username":      user.Name,
		"email":         user.Email,
		"auth_provider": "google",
	}

	// Encode user data to JSON
	jsonData, err := json.Marshal(userData)
	if err != nil {
		log.Printf("failed to marshal user data: %v", err)
		return
	}

	// Make the API request
	apiResp, err := http.Post("http://localhost:8080/api/register", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Printf("failed to make register API call: %v", err)
		return

	}
	defer apiResp.Body.Close()

	body, _ := io.ReadAll(apiResp.Body)
	log.Printf("Response body: %s", body)

	// Check the response status
	if apiResp.StatusCode != http.StatusCreated {
		log.Printf("register API call failed with status: %s", apiResp.Status)
		return

	}

	// redirect to dashboard
	http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusSeeOther)
}

func HandleDashboard(w http.ResponseWriter, r *http.Request) {
	session, _ := Store.Get(r, "sessionname")
	email, emailExists := session.Values["email"].(string)
	name, nameExists := session.Values["name"].(string)

	if !emailExists || !nameExists {
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}
	fmt.Printf("Welcome, %s! Your email is %s", name, email)
}

// implement logout
func HandleLogout(w http.ResponseWriter, r *http.Request) {
	session, _ := Store.Get(r, "sessionname")
	session.Options.MaxAge = -1
	if err := session.Save(r, w); err != nil {
		http.Error(w, "Failed to save session", http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, "/login", http.StatusSeeOther)
}
