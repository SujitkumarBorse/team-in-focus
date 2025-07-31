const fs = require('fs');
const path = require('path');

// Path to index.html
const indexPath = path.join(__dirname, 'src', 'index.html');

// Read the current index.html
let content = fs.readFileSync(indexPath, 'utf8');

// Change base href for GitHub Pages
content = content.replace('<base href="/">', '<base href="/team-in-focus/">');

// Also update favicon path for GitHub Pages
content = content.replace('href="camera-icon.png"', 'href="/team-in-focus/camera-icon.png"');

// Write back to index.html
fs.writeFileSync(indexPath, content);

console.log('✅ Base href updated for GitHub Pages deployment');

// Run the build command
const {
    execSync
} = require('child_process');
try {
    console.log('🏗️ Building for GitHub Pages...');
    execSync('ng build --base-href=/team-in-focus/', {
        stdio: 'inherit'
    });

    // Copy 404.html to the build output for GitHub Pages routing
    console.log('📋 Copying 404.html for GitHub Pages routing...');
    const buildPath = path.join(__dirname, 'dist', 'team-in-focus', 'browser');
    const source404Path = path.join(__dirname, 'public', '404.html');
    const dest404Path = path.join(buildPath, '404.html');

    if (fs.existsSync(source404Path)) {
        fs.copyFileSync(source404Path, dest404Path);
        console.log('✅ 404.html copied successfully');
    } else {
        console.log('⚠️ 404.html not found in public directory');
    }

    console.log('🚀 Deploying to GitHub Pages...');
    execSync('npx angular-cli-ghpages --dir=dist/team-in-focus/browser', {
        stdio: 'inherit'
    });

    console.log('✅ Deployment complete!');
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
} finally {
    // Restore base href for local development
    content = content.replace('<base href="/team-in-focus/">', '<base href="/">');

    // Restore favicon path for local development
    content = content.replace('href="/team-in-focus/camera-icon.png"', 'href="camera-icon.png"');

    fs.writeFileSync(indexPath, content);
    console.log('✅ Base href and favicon path restored for local development');
}