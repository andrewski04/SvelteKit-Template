# Authentication

## Auth Methods

### Email (Magic Link)

By default, authentication will use email to send a "magic link" to sign in, rather than password authentication.

In development, you can view any sent emails from MailDev by navigating to http://localhost:8080. Ensure that external dependencies (Docker containers) are running.

### OAuth

OAuth (such as Google & Microsoft SSO) will be implemented in the future since it requires a key from the provider. It should be relatively easy to implement on top of the existing authentication system.
