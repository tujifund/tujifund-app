package main

import (
	"net/http"

	"github.com/gorilla/sessions"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	ClientID:     " 235545557579-1il82tci3v7nu4hh8sjhv6tqsk043kfg.apps.googleusercontent.com",
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
