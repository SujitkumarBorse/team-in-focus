# 🚀 Team In Focus - Deployment Guide

This guide covers the complete deployment process for the Team In Focus Angular photography studio application to GitHub Pages.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Required Packages](#required-packages)
- [Initial Setup](#initial-setup)
- [Local Development](#local-development)
- [Deployment Process](#deployment-process)
- [Troubleshooting](#troubleshooting)
- [File Structure](#file-structure)

## 🔧 Prerequisites

Before deploying, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **GitHub Account** (for hosting)

### Check Your Versions:
```bash
node --version
npm --version
git --version
```

## 📦 Required Packages

### Core Dependencies (Already in package.json)
```json
{
  "@angular/core": "^17.0.0",
  "@angular/common": "^17.0.0",
  "@angular/router": "^17.0.0",
  "@angular/platform-browser": "^17.0.0",
  "@angular/platform-browser-dynamic": "^17.0.0",
  "@angular/forms": "^17.0.0",
  "@angular/common/http": "^17.0.0"
}
```

### Development Dependencies
```json
{
  "@angular/cli": "^17.0.0",
  "@angular-devkit/build-angular": "^17.0.0",
  "typescript": "^5.0.0",
  "rxjs": "^7.0.0"
}
```

### Deployment Package
```bash
npm install -g angular-cli-ghpages
```

## 🛠️ Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Deployment Tool
```bash
npm install -g angular-cli-ghpages
```

### 3. Verify Installation
```bash
npx angular-cli-ghpages --version
```

## 💻 Local Development

### Start Development Server
```bash
npm start
```
- **URL**: `http://localhost:4200`
- **Base Href**: `/` (for local development)
- **Hot Reload**: Enabled

### Build for Local Testing
```bash
npm run build:local
```
- **Output**: `dist/team-in-focus/browser/`
- **Base Href**: `/`

## 🚀 Deployment Process

### Method 1: Automated Deployment (Recommended)

#### Step 1: Deploy to GitHub Pages
```bash
npm run deploy
```

This command will:
1. ✅ Change base href to `/team-in-focus/`
2. ✅ Build the application for production
3. ✅ Deploy to GitHub Pages
4. ✅ Restore base href for local development

#### Step 2: Verify Deployment
- **URL**: `https://sujitkumarborse.github.io/team-in-focus/`
- **Branch**: `gh-pages` (automatically created)
- **Source**: `dist/team-in-focus/browser/`

### Method 2: Manual Deployment

#### Step 1: Build for Production
```bash
npm run build:gh-pages
```

#### Step 2: Deploy to GitHub Pages
```bash
npx angular-cli-ghpages --dir=dist/team-in-focus/browser
```

#### Step 3: Restore Local Development
```bash
npm run build:local
```

## 🔄 GitHub Actions (Automatic Deployment)

The project includes a GitHub Actions workflow for automatic deployment:

### Workflow File: `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:gh-pages
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/team-in-focus/browser
```

### Enable GitHub Actions:
1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Set **Source** to `Deploy from a branch`
4. Set **Branch** to `gh-pages`
5. Set **Folder** to `/ (root)`

## 📁 File Structure

### Key Files for Deployment:
```
teamInFocus/
├── src/
│   ├── index.html                 # Main HTML file (base href management)
│   ├── app/
│   │   ├── header/
│   │   │   └── header.component.html  # Camera icon path
│   │   └── services/
│   │       └── gallery.service.ts     # Gallery data path
├── public/
│   ├── camera-icon.png           # Camera icon asset
│   └── gallery-data.json         # Gallery data
├── angular.json                  # Angular CLI configuration
├── package.json                  # Dependencies and scripts
├── deploy.js                     # Smart deployment script
└── .github/workflows/deploy.yml  # GitHub Actions workflow
```

### Asset Paths:
- **Local Development**: Relative paths (`camera-icon.png`, `gallery-data.json`)
- **Production**: Base href adjusted (`/team-in-focus/camera-icon.png`)

## 🔧 Configuration Files

### angular.json
```json
{
  "projects": {
    "team-in-focus": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/team-in-focus/browser",
            "outputMode": "static"
          }
        }
      }
    }
  }
}
```

### package.json Scripts
```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "build:gh-pages": "ng build --base-href=/team-in-focus/",
    "build:local": "ng build",
    "deploy": "node deploy.js"
  }
}
```

## 🚨 Troubleshooting

### Common Issues and Solutions:

#### 1. Blank Screen on GitHub Pages
**Problem**: Assets not loading (404 errors)
**Solution**: 
- Check base href in `src/index.html`
- Ensure `deploy.js` is running correctly
- Verify asset paths are relative

#### 2. Camera Icon Not Displaying
**Problem**: Icon path incorrect
**Solution**:
- Use relative path: `src="camera-icon.png"`
- Ensure file exists in `public/` directory

#### 3. Gallery Images Not Loading
**Problem**: Gallery data not found
**Solution**:
- Use relative path: `gallery-data.json`
- Check JSON file structure
- Verify image URLs are valid

#### 4. Build Errors
**Problem**: TypeScript or dependency issues
**Solution**:
```bash
npm install
npm run build:local
```

#### 5. Deployment Fails
**Problem**: GitHub Pages deployment issues
**Solution**:
```bash
# Clear cache and retry
npm cache clean --force
npm install
npm run deploy
```

### Debug Commands:
```bash
# Check build output
npm run build:gh-pages
ls dist/team-in-focus/browser/

# Check GitHub Pages status
git ls-remote origin gh-pages

# Verify deployment
curl -I https://sujitkumarborse.github.io/team-in-focus/
```

## 📝 Daily Deployment Workflow

### For Regular Updates:

1. **Make Changes** to your code
2. **Test Locally**:
   ```bash
   npm start
   # Visit http://localhost:4200
   ```
3. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Your update description"
   git push
   ```
4. **Deploy**:
   ```bash
   npm run deploy
   ```
5. **Verify**: Visit `https://sujitkumarborse.github.io/team-in-focus/`

### For Major Updates:

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/new-feature
   ```
2. **Develop and Test**
3. **Merge to Main**:
   ```bash
   git checkout main
   git merge feature/new-feature
   ```
4. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔐 Security Notes

- **API Keys**: Never commit API keys to Git
- **Environment Variables**: Use `.env` files for sensitive data
- **Dependencies**: Regularly update packages for security patches

## 📞 Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review console errors** in browser developer tools
3. **Check GitHub Actions** logs for deployment issues
4. **Verify file paths** and base href settings

## 🎯 Quick Reference

### Essential Commands:
```bash
# Local Development
npm start                    # Start dev server
npm run build:local         # Build for local

# Deployment
npm run deploy              # Deploy to GitHub Pages
npm run build:gh-pages      # Build for production

# Git Operations
git add .                   # Stage changes
git commit -m "message"     # Commit changes
git push                    # Push to GitHub
```

### Important URLs:
- **Local**: `http://localhost:4200`
- **Production**: `https://sujitkumarborse.github.io/team-in-focus/`
- **Repository**: `https://github.com/SujitkumarBorse/team-in-focus`

---

**Last Updated**: December 2024
**Version**: 1.0
**Maintainer**: Team In Focus Development Team 