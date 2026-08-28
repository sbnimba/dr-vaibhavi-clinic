const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- STARTING GITHUB PAGES DEPLOYMENT PROCESS ---');

const apiDir = path.join(__dirname, 'src', 'app', 'api');
const tempApiDir = path.join(__dirname, 'api_temp');
const configTs = path.join(__dirname, 'next.config.ts');
const configMjs = path.join(__dirname, 'next.config.mjs');

// 1. Temporarily enable static export via next.config.mjs and remove next.config.ts
console.log('Configuring Next.js for static export...');
if (fs.existsSync(configTs)) {
    fs.renameSync(configTs, configTs + '.bak');
}
const exportConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
`;
fs.writeFileSync(configMjs, exportConfig, 'utf8');

// 2. Temporarily move API routes out of src/app so static export compiles successfully
let movedApi = false;
if (fs.existsSync(apiDir)) {
    console.log('Temporarily moving API routes out of compilation path...');
    fs.renameSync(apiDir, tempApiDir);
    movedApi = true;
}

try {
    // 3. Build Next.js project
    console.log('Compiling Next.js static build...');
    execSync('npm run build', { stdio: 'inherit' });

    // 4. Run post-export image path fix
    console.log('Running post-export path cleanup...');
    execSync('node fix-out-images.js', { stdio: 'inherit' });

    // 5. Deploy to gh-pages branch
    console.log('Deploying static files to GitHub Pages (gh-pages branch)...');
    execSync('npx gh-pages -d out -b gh-pages -t', { stdio: 'inherit' });
    console.log('Successfully deployed to GitHub Pages!');
} catch (error) {
    console.error('Deployment build or upload step failed:', error);
} finally {
    // 6. Restore original directory structure and configuration files
    console.log('Restoring project configuration back to normal...');
    if (fs.existsSync(configMjs)) {
        fs.unlinkSync(configMjs);
    }
    if (fs.existsSync(configTs + '.bak')) {
        fs.renameSync(configTs + '.bak', configTs);
    }
    if (movedApi && fs.existsSync(tempApiDir)) {
        fs.renameSync(tempApiDir, apiDir);
    }
    console.log('Workspace restored and clean!');
}
