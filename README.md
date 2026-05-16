# GTA6Reloaded | The Ultimate Fan Hub

This is the complete source code for **GTA6Reloaded.com**. Built with a custom design system and a local backend admin for content management.

## 🚀 Local Development (Local Host)

To run the site locally with the **Backend Admin**:

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open your terminal in the project folder.
3. Run: `node server.js`
4. Visit: `http://localhost:3000`

### 🛠️ Admin Dashboard
To add new blog articles, upload images, and manage news:
- Visit: `http://localhost:3000/admin`
- Articles are saved locally in `/data/posts.json`.
- Uploaded images are saved in `/uploads`.

---

## 🌍 GitHub Pages Deployment

To host this on **GitHub Pages** with your custom domain **GTA6Reloaded.com**:

1. **Push to GitHub**:
   - Create a new repository: `github.com/[your-username]/gta6reloaded`
   - Push all files from the `public/` folder to the root of your repo.
   - *Note: The Node.js server is for local administration only. For GitHub Pages, we use the static files.*

2. **GitHub Settings**:
   - Go to **Settings → Pages**.
   - Set source to **main branch** and **/ (root)**.
   - The `CNAME` file is already included for `GTA6Reloaded.com`.

3. **DNS Configuration**:
   Add these A records to your domain registrar (e.g. GoDaddy, Namecheap):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
   - Add a CNAME record: `www` → `[your-username].github.io`

4. **SSL**:
   - Check "Enforce HTTPS" in GitHub Pages settings.

---

## 🎨 Design System
- **Background**: #0a0a0a
- **Primary**: #ff2a2a (Neon Red)
- **Secondary**: #ffd700 (Gold)
- **Typography**: Rajdhani (Headings), Inter (Body)

## ⚖️ Legal Disclaimer
GTA6Reloaded is a fan-run website and is not affiliated with Rockstar Games or Take-Two Interactive.
