# ⚡ Quick Deployment Guide

## 🚀 Daily Deployment (3 Steps)

### 1. Make Changes & Test
```bash
npm start                    # Test locally at http://localhost:4200
```

### 2. Commit & Push
```bash
git add .
git commit -m "Your update description"
git push
```

### 3. Deploy
```bash
npm run deploy              # Deploy to GitHub Pages
```

## 📍 Important URLs
- **Local**: `http://localhost:4200`
- **Live**: `https://sujitkumarborse.github.io/team-in-focus/`

## 🔧 Essential Commands
```bash
# Development
npm start                   # Start dev server
npm run build:local        # Build for local

# Deployment
npm run deploy             # Deploy to GitHub Pages
npm run build:gh-pages     # Build for production

# Git
git status                 # Check changes
git add .                  # Stage all changes
git commit -m "message"    # Commit changes
git push                   # Push to GitHub
```

## 🚨 Quick Fixes

### If Local Not Working:
```bash
npm install
npm start
```

### If Deployment Fails:
```bash
npm cache clean --force
npm install
npm run deploy
```

### If Assets Not Loading:
- Check `src/index.html` base href
- Verify asset paths are relative
- Run `npm run deploy` again

## 📞 Need Help?
- Check `DEPLOYMENT_GUIDE.md` for detailed instructions
- Review browser console for errors
- Check GitHub Actions logs 