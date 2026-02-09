# Lab2Market Prairies App - Deployment Guide

Your Next.js application is ready for deployment! 

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. Push this code to GitHub
2. Go to vercel.com and import the repository
3. Vercel automatically detects Next.js and deploys it

### Option 2: GitHub Pages
Since we've configured `output: 'export'` in `next.config.ts`, this app produces static HTML.

1. Go to your repository **Settings** > **Pages**
2. Under **Build and deployment**, select **GitHub Actions**
3. Select "Static HTML" workflow

---

## 🛠️ Local Development

To run the application locally:

```bash
cd l2m-prairies-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Editing Content

All content is managed via JSON files in the `content/` directory:

- `about.json`: About page content
- `schedule.json`: Bootcamp and Core Program schedules
- `tech-stack.json`: Software platform list
- `reminders.json`: Home page reminders
- `support-hours.json`: Global support hours info

Simply edit these files and push to GitHub to update the site content.
