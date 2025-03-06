package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	ClientID:     "235545557579-1il82tci3v7nu4hh8sjhv6tqsk043kfg.apps.googleusercontent.com",
	ClientSecret: " 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",
	RedirectURL:  "http://localhost:8080/auth/callback",
	Scopes:       []string{"email", "profile"},
	Endpoint:     google.Endpoint,
}

// Session store
var store = sessions.NewCookieStore([]byte("super-secret-key"))

func HandleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	Url := googleOauthConfig.AuthCodeURL("random-state-token")
	http.Redirect(w, r, Url, http.StatusTemporaryRedirect)
}

func HandleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "athuration code not found", http.StatusBadRequest)
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
	session, _ := store.Get(r, "sessionname")
	session.Values["Email"] = user.Email
	session.Values["Name"] = user.Name
	if err := session.Save(r, w); err != nil {
		http.Error(w, "Failed to save session", http.StatusInternalServerError)
		return
	}
	// redirect to dashboard
	http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
}

func HandleDashboard(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "sessionname")
	email, emailExists := session.Values["email"].(string)
	name, nameExists := session.Values["name"].(string)

	if !emailExists || !nameExists {
		http.Redirect(w, r, "/login", http.StatusFound)
		return
	}
	fmt.Printf("Welcome, %s! Your email is %s",name,email)
}

//implement logout
func HandleLogout(w http.ResponseWriter,r *http.Request) {
	session,_ := store.Get(r,"sessionname")
	session.Options.MaxAge =-1
	if err := session.Save(r, w); err != nil {
		http.Error(w, "Failed to save session", http.StatusInternalServerError)
		return
	}
	http.Redirect(w,r,"/login",http.StatusSeeOther)
}