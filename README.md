AI Meeting Notes Summarizer
An intelligent full-stack web application that transforms raw meeting transcripts into clean, structured, and editable summaries using the Google Gemini API. The application is built with Node.js and EJS and is designed for easy deployment on Vercel.

Features
Upload or Paste Transcripts: Users can either upload a .txt file or paste the transcript text directly into a textarea.

Customizable Summaries: Provide custom prompts (e.g., "focus on action items," "create an executive summary") to tailor the AI's output.

AI-Powered Generation: Leverages the power of the Google Gemini API to generate high-quality, context-aware summaries.

Editable Output: The generated summary is displayed in an editable textarea, allowing for quick modifications and refinements.

Secure Email Sharing: Share the final summary with multiple recipients via email, configured securely for a production environment.

Vercel Ready: Comes with a vercel.json configuration for seamless, serverless deployment.

Tech Stack
Backend: Node.js, Express.js

Frontend: EJS (Embedded JavaScript templates), Tailwind CSS

AI Model: Google Gemini API (gemini-1.5-flash)

File Handling: Multer (for multipart/form-data)

Emailing: Nodemailer

Deployment: Vercel

Setup and Installation (Local Development)
Follow these steps to get the project running on your local machine.

1. Prerequisites
Node.js (v18.x or later recommended)

npm (comes with Node.js)

A Google Account to get a Gemini API Key.

An email account with SMTP access (e.g., Gmail with an App Password).

2. Clone the Repository
git clone <your-repository-url>
cd ai-meeting-summarizer

3. Install Dependencies
npm install

4. Set Up Environment Variables
Create a file named .env in the root of your project directory. Copy the contents of .env.example (if provided) or use the structure below and fill in your credentials.

# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# SMTP Email Server Configuration (Example for Gmail)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your.email@gmail.com"
SMTP_PASS="your_16_character_gmail_app_password"

Important Notes:

Gemini API Key: Get your key from Google AI Studio.

Gmail SMTP_PASS: You must use a 16-character App Password, not your regular Google account password. You can generate one in your Google Account's security settings after enabling 2-Step Verification.

5. Run the Application
node index.js

The application should now be running at http://localhost:3000.

Deployment to Vercel
This project is configured for easy deployment to Vercel.

Push to Git: Make sure your project (including index.js, package.json, and vercel.json) is pushed to a GitHub, GitLab, or Bitbucket repository.

Import Project: On your Vercel dashboard, import the repository. Vercel will automatically detect it as a Node.js project.

Configure Environment Variables: In the Vercel project settings, navigate to "Environment Variables" and add the same keys and values from your local .env file (GEMINI_API_KEY, SMTP_HOST, etc.).

Deploy: Click the "Deploy" button. Vercel will build and deploy your application.

License
This project is licensed under the MIT License. See the LICENSE file for details.