const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const upload = multer({ storage: multer.memoryStorage() });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    summary: "",
    customPrompt: "",
    successMessage: null,
    errorMessage: null,
  });
});

app.post("/summarize", upload.single("transcript"), async (req, res) => {
  try {
    if (!req.file && !req.body.transcript_text) {
      return res
        .status(400)
        .render("index", {
          summary: "",
          customPrompt: "",
          successMessage: null,
          errorMessage: "No transcript file uploaded or text pasted.",
        });
    }

    const transcriptText = req.file
      ? req.file.buffer.toString("utf8")
      : req.body.transcript_text;
    const customPrompt =
      req.body.prompt ||
      "Provide a comprehensive summary including an overview, key points, decisions, and action items.";

    const fullPrompt = `
          You are an expert meeting summarizer. Your task is to analyze the following meeting transcript and generate a clean, professional, and well-structured summary based on the user's instructions.

          USER INSTRUCTIONS:
          "${customPrompt}"

          MEETING TRANSCRIPT:
          ---
          ${transcriptText}
          ---

          IMPORTANT FORMATTING RULES:
          - DO NOT use any markdown formatting (e.g., no **, ##, *, -).
          - Use clear headings for sections (e.g., "Key Decisions," "Action Items").
          - Use numbered lists (1., 2., 3.) or simple bullet points (•) for list items.
          - Ensure there is clear spacing and line breaks between sections and points for readability.
          - The final output must be plain text only.
        `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const summaryText = response.text();

    res.render("index", {
      summary: summaryText,
      customPrompt: customPrompt,
      successMessage: null,
      errorMessage: null,
    });
  } catch (error) {
    console.error("Error during summarization:", error);
    res
      .status(500)
      .render("index", {
        summary: "",
        customPrompt: req.body.prompt,
        successMessage: null,
        errorMessage: "Failed to generate summary.",
      });
  }
});

app.post("/share", async (req, res) => {
  const { recipients, summary, customPrompt } = req.body;

  if (!recipients || !summary) {
    return res
      .status(400)
      .render("index", {
        summary,
        customPrompt,
        successMessage: null,
        errorMessage: "Recipients and summary are required to share.",
      });
  }

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Meeting Summarizer AI" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: "Your AI-Generated Meeting Summary",
      html: `
                <div style="font-family: sans-serif; line-height: 1.6;">
                    <h2 style="color: #333;">Meeting Summary</h2>
                    <pre style="white-space: pre-wrap; font-family: sans-serif; background-color: #f4f4f4; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">${summary}</pre>
                    <p style="font-size: 0.9em; color: #777;"><i>Shared from the AI-Powered Meeting Notes Summarizer.</i></p>
                </div>
            `,
    });

    res.render("index", {
      summary: "",
      customPrompt: "",
      successMessage: `Email sent successfully to ${recipients}!`,
      errorMessage: null,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .render("index", {
        summary,
        customPrompt,
        successMessage: null,
        errorMessage:
          "Failed to send email. Please check server logs and environment variables.",
      });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
