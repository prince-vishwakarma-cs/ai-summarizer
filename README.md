
# 📝 AI Meeting Notes Summarizer

An intelligent full-stack web application that transforms raw meeting transcripts into **clean, structured, and editable summaries** using the **Google Gemini API**.  
Built with **Node.js** and **EJS**, designed for **easy deployment on Vercel**.

---

## 🚀 Features

- 📂 **Upload or Paste Transcripts**: Upload a `.txt` file or paste text directly into a textarea.  
- 🎯 **Customizable Summaries**: Provide prompts (e.g., *"focus on action items"*, *"create an executive summary"*) to tailor the AI's output.  
- 🤖 **AI-Powered Generation**: Uses the **Google Gemini API** to generate high-quality, context-aware summaries.  
- ✍️ **Editable Output**: Summaries appear in an editable textarea for quick refinements.  
- 📧 **Secure Email Sharing**: Send summaries to multiple recipients via **Nodemailer**, configured securely.  
- ⚡ **Vercel Ready**: Includes `vercel.json` for seamless serverless deployment.  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Frontend**: EJS (Embedded JavaScript templates), Tailwind CSS  
- **AI Model**: Google Gemini API (`gemini-1.5-flash`)  
- **File Handling**: Multer (multipart/form-data)  
- **Emailing**: Nodemailer  
- **Deployment**: Vercel  

---

## ⚙️ Setup and Installation (Local Development)

Follow these steps to set up and run the project locally.

### 1️⃣ Prerequisites
- Node.js (**v18.x or later** recommended)  
- npm (comes with Node.js)  
- Google Account (to get a **Gemini API Key**)  
- Email account with SMTP access (e.g., Gmail with an App Password)  

### 2️⃣ Clone the Repository
```bash
git clone <your-repository-url>
cd ai-meeting-summarizer
````

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Set Up Environment Variables

Create a `.env` file in the project root. Use the following structure:

```bash
# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# SMTP Email Server Configuration (Example for Gmail)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your.email@gmail.com"
SMTP_PASS="your_16_character_gmail_app_password"
```

#### 🔑 Important Notes

* **Gemini API Key** → Get it from [Google AI Studio](https://aistudio.google.com/).
* **Gmail SMTP\_PASS** → Must be a **16-character App Password**, not your regular Google password. Generate it in **Google Account → Security → App Passwords** (requires 2-Step Verification).

### 5️⃣ Run the Application

```bash
node index.js
```

The app should now be live at: **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Deployment on Vercel

1. **Push to Git** → Make sure `index.js`, `package.json`, and `vercel.json` are in your repo.
2. **Import Project** → On [Vercel Dashboard](https://vercel.com), import the repository.
3. **Configure Env Vars** → Add the same keys (`GEMINI_API_KEY`, `SMTP_HOST`, etc.) in Vercel → Project Settings → Environment Variables.
4. **Deploy** → Click **Deploy**, Vercel builds & deploys automatically.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.


