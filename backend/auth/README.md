 ## Combining Sessions with Google OAuth 2.0

With OAuth 2.0, Google provides an access token and user data after login. Instead of using tokens for client authentication, you can store user details in a session.
## Authentication Flow
-  User clicks "Continue with Google" → Redirect to Google’s OAuth page.
-  Google authenticates the user and redirects back to your Go server.
-  Your server receives an authorization code → Exchanges it for an access token.
-  Retrieve user details (e.g., email, name) from Google.
-  Create a session for the user:
        Store user details in the session.
        Send a session cookie to the client.
 On each request, validate the session cookie to check if the user is logged in.

 ## client id and client secret

   ```bash
   Client ID
    235545557579-1il82tci3v7nu4hh8sjhv6tqsk043kfg.apps.googleusercontent.com

Client secret
    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

Creation date
    March 6, 2025 at 1:39:42 PM GMT+3
   ```
