Login-signup-system
This project is a Next.js based Login-signup-system system featuring secure signup and login functionality using MongoDB and an SMTP server for email verification. 
It includes features like password hashing, session management, and is hosted on Vercel.

Features:
-User Signup & Login: Users can create an account and log in with their email and password.
-Email Confirmation: On signup, a confirmation email is sent using SMTP.
-Password Security: User passwords are securely hashed using bcrypt.
-Session Management: User sessions are managed via NextAuth.js, ensuring secure login persistence.
-Error Handling: Displays error messages for invalid logins, signup failures, etc.
-Responsive Design: The system is mobile-friendly and optimized for various screen sizes.

Tech Stack
Next.js: Server-side rendering and full-stack features.
MongoDB: Database for user data storage (email, hashed passwords, session data).
NextAuth.js: Manages user authentication and session handling.
Bcrypt: For secure password hashing.
SMTP Server: Sends verification emails on user signup.

Hosting
The application is hosted on Vercel. You can access the live version here: https://vercel.com/punithpuniis-projects/login-signup-system

How to Run Locally
To run the project locally:
-Ensure that Node.js and MongoDB are installed on your machine.
-Follow the setup instructions mentioned above.
-Start the development server using the command npm run dev.
