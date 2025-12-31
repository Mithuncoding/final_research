# 🔬 PRISM - AI Research Assistant

<div align="center">

![PRISM Logo](public/icon.svg)

**Transform complex research papers into crystal-clear insights**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mithuncoding/final_research)

</div>

## ✨ Features

- 🧠 **Deep Analysis** - Extract methodology, findings, and evidence
- 💬 **AI Chat** - Ask questions about your papers
- 📊 **Smart Export** - PDF, Markdown, PowerPoint
- 💡 **Hypothesis Lab** - Generate research ideas
- 📖 **Smart Glossary** - Auto-extract technical terms
- 🔒 **Privacy First** - Your data stays local

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Gemini API Key (free from [AI Studio](https://aistudio.google.com/apikey))

### Local Development

```bash
# Clone the repository
git clone https://github.com/Mithuncoding/final_research.git
cd final_research

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key to .env
# VITE_GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🌐 Deploy to Vercel

### Method 1: One-Click Deploy

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Add environment variable: `VITE_GEMINI_API_KEY`
4. Deploy!

### Method 2: Manual Setup

1. **Fork/Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)**

   - Sign up/Login with GitHub
   - Click "Add New Project"

3. **Import Repository**

   - Select `final_research` from your repos

4. **Configure Project**

   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Set Environment Variables**

   - Click "Environment Variables"
   - Add: `VITE_GEMINI_API_KEY` = `your_api_key`

6. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app is live! 🎉

## 📱 In-App API Key Setup

Users can also set their API key directly in the app:

1. Click **Settings** in the header
2. Enter your Gemini API key
3. Click **Save Key**

This stores the key locally in the browser (no server storage).

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS
- **AI**: Google Gemini API (gemini-3-flash-preview)
- **State**: Zustand
- **PDF**: react-pdf, pdfjs-dist

## 👥 Team

Built with 💜 by:

- **Mithun** - Team Lead & Full Stack Developer
- **Damodar** - Backend Developer
- **Kaifulla** - AI/ML Engineer
- **Ranjith** - UI/UX Designer

## 📄 License

MIT License - feel free to use for your projects!

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

</div>
