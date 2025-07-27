# PowerShell script for deploying to GitHub Pages
Write-Host "Building for GitHub Pages..." -ForegroundColor Green
npm run build:github-pages

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Push your changes to GitHub" -ForegroundColor White
Write-Host "2. Go to your repository Settings > Pages" -ForegroundColor White
Write-Host "3. Set source to 'Deploy from a branch'" -ForegroundColor White
Write-Host "4. Select 'gh-pages' branch and '/(root)' folder" -ForegroundColor White
Write-Host "5. Click Save" -ForegroundColor White
Write-Host ""
Write-Host "Your site will be available at: https://[your-username].github.io/teamInFocus/" -ForegroundColor Cyan 