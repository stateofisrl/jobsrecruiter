# Deploy to GitHub Pages

## Setup Instructions

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., `job-alert-finder`)
3. Don't initialize with README (you already have code)

### 2. Push Your Code to GitHub
```bash
cd C:\Users\joseph\Downloads\Job-Alert-Finder\Job-Alert-Finder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3. Deploy to GitHub Pages
```bash
npm run deploy
```

This will:
- Build your React app
- Create a `gh-pages` branch
- Deploy the built files to GitHub Pages

### 4. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **gh-pages** branch
4. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Update Your Site
Whenever you make changes:
```bash
npm run deploy
```

## Local Development
To run locally:
```bash
npm run dev
```
Then open http://localhost:5173

## Notes
- The site is frontend-only (no backend needed)
- Forms send data directly to Smartsupp live chat
- Free hosting on GitHub Pages
