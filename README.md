# CodeSentry AI 🔍

### Intelligent AI-Powered Code Review Assistant

CodeSentry AI is an AI-powered code review assistant that helps developers identify bugs, security vulnerabilities, logical errors, and performance issues in their code.

Built with Next.js and Google's Gemini API, it provides real-time streaming code reviews with a clean and interactive user interface.

**🌐 Live Demo:** https://codesentry-ai-five.vercel.app/

**📂 GitHub Repository:** https://github.com/batta-vaishnavi/codesentry-ai

---

## ✨ Features

- **AI-Powered Code Review:** Analyze source code using Google's Gemini AI.
- **Multiple Programming Languages:** Select a programming language for code analysis.
- **Real-Time Streaming:** Receive AI-generated reviews as they are produced.
- **Bug Detection:** Identify logical errors and potential runtime issues.
- **Security Analysis:** Highlight potential security vulnerabilities.
- **Code Quality Suggestions:** Get recommendations to improve readability and maintainability.
- **Review History:** Automatically save the latest 10 completed reviews.
- **View Previous Reviews:** Revisit previously generated code reviews.
- **Delete History:** Delete individual reviews or clear all saved history.
- **Cancel Review:** Stop an ongoing review request.
- **Markdown Rendering:** Display structured AI responses in a readable format.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | Frontend UI |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| Google Gemini API | AI-powered code analysis |
| React Markdown | Markdown rendering |
| LocalStorage | Browser-based review history |
| Vercel | Deployment |
| Git & GitHub | Version control |

## 🚀 Getting Started

Follow these steps to run CodeSentry AI locally.

### 1. Clone the repository

```bash
git clone https://github.com/batta-vaishnavi/codesentry-ai.git
```

### 2. Navigate to the project directory

```bash
cd codesentry-ai
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Get your API key from [Google AI Studio](https://aistudio.google.com/).

**Important:** Never commit your actual API key or share it publicly.

### 5. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

```text
codesentry-ai/
├── src/
│   └── app/
│       ├── api/
│       │   └── review/
│       │       └── route.ts
│       ├── page.tsx
│       └── layout.tsx
├── public/
├── .env.local
├── package.json
├── package-lock.json
└── README.md
```

## 🔐 Security

- The Gemini API key is stored in an environment variable.
- API requests are handled through a Next.js backend route.
- User input is validated before processing.
- Submitted code is treated as untrusted input.
- Review history is stored locally in the browser.

## 💡 Future Enhancements

- User authentication and personalized review history.
- Support for uploading code files.
- Downloadable code review reports.
- More advanced static analysis capabilities.
- Additional programming language support.

## 👩‍💻 Author

**Vaishnavi Batta**

GitHub: https://github.com/batta-vaishnavi

---

⭐ If you find CodeSentry AI useful, consider giving this repository a star!