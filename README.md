# AI Career Coach 🚀

An advanced, AI-powered career development platform designed to bridge the gap between education and professional success. This project leverages the latest Google Gemini models and on-device machine learning to provide personalized coaching, interview simulations, and resume optimization.

## 🌟 Key Features

### 1. Intelligent Resume Engineering
- **Automated Parsing:** Powered by **Gemini 3 Flash** to extract skills, experience, and education from documents.
- **Strength Analytics:** Real-time scoring (0-100) based on industry standards.
- **Actionable Feedback:** AI-driven optimization tips to improve ATS compatibility.

### 2. High-Stakes Interview Suite
- **Live AI Simulation:** Low-latency, voice-to-voice interviews using **Gemini 2.5 Flash Native Audio**.
- **Behavioral Analysis:** On-device speech clarity monitoring powered by **TensorFlow.js**.
- **Mastery Tracking:** Progress visualization across specialized fields.

### 3. 24/7 AI Career Coach
- **Real-Time Insights:** Integrated with **Google Search Grounding** for live market trends and salary data.

## 🛠️ Tech Stack
- **Frontend:** React 19, Tailwind CSS, Recharts
- **AI:** Gemini 3 Pro, Gemini 3 Flash, Gemini 2.5 Flash (Live API)
- **ML:** TensorFlow.js

## 🚀 How to Share/Deploy (Crucial for Submission)

The "Page not found" error occurs because the AI Studio URL is private to your account. To share this project with others, follow these steps:

### Option A: Professional Deployment (Recommended)
1. **Push your code to GitHub.**
2. **Go to [Vercel](https://vercel.com/)** and click "Add New Project".
3. **Import your GitHub repository.**
4. **Add Environment Variable:** In the "Environment Variables" section of the deployment settings, add:
   - Key: `API_KEY`
   - Value: `YOUR_GEMINI_API_KEY`
5. **Deploy!** You will get a public link like `https://ai-career-coach.vercel.app` which you can share with anyone.

### Option B: Local Review
1. Reviewers must clone the repo.
2. Reviewers must create a `.env` file with their own `API_KEY`.
3. Run using a local server (e.g., `npx serve .`).

---
*Developed as a showcase of Generative AI integration in Career Tech.*
