# Deploying to GitHub Pages

This guide will help you deploy your Angular application to GitHub Pages.

## Prerequisites

1. Make sure your project is pushed to a GitHub repository
2. Ensure you have the necessary permissions to enable GitHub Pages

## Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment. Here's how it works:

1. **Push to main/master branch**: Every time you push changes to the main or master branch, the site will automatically be built and deployed.

2. **GitHub Actions workflow**: The `.github/workflows/deploy.yml` file handles the build and deployment process.

3. **Build configuration**: The `angular.json` file includes a `github-pages` configuration that:
   - Disables SSR (Server-Side Rendering) for static hosting
   - Sets the correct base href (`/teamInFocus/`)
   - Optimizes the build for production

## Manual Deployment

If you prefer to deploy manually:

1. **Build the project for GitHub Pages**:
   ```bash
   npm run build:github-pages
   ```

2. **Deploy using angular-cli-ghpages**:
   ```bash
   npm run deploy
   ```

## Setting up GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose the **gh-pages** branch and **/(root)** folder
5. Click **Save**

## Important Notes

- **Base href**: The application is configured with base href `/teamInFocus/` to match your repository name
- **SSR disabled**: GitHub Pages only supports static hosting, so Server-Side Rendering is disabled for deployment
- **Assets**: All assets from the `public/` folder are included in the build

## Troubleshooting

- If the site doesn't load, check that the base href matches your repository name
- Ensure all assets are properly referenced with relative paths
- Check the GitHub Actions logs for any build errors

## Local Testing

To test the GitHub Pages build locally:

```bash
npm run build:github-pages
npx http-server dist/team-in-focus -p 8080
```

Then visit `http://localhost:8080` to see your site. 