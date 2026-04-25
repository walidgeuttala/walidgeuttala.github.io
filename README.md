# Walid Guettala — AI Researcher Portfolio

A sleek, dark-mode portfolio dashboard for an AI Researcher & PhD Candidate at ELTE University, specialising in Graph Neural Networks and Combinatorial Optimisation.

## Features
- 🔴 **Live GitHub Projects** — auto-fetches repos via GitHub API, including README image thumbnails
- 🖥️ **Terminal-style Hero** — glass-morphism dashboard aesthetic
- 📊 **Skill progress bars** — Python, PyTorch, C++, MATLAB, GNN
- 📚 **Publications list** — Neurocomputing paper and more
- ⚡ **Zero build step** — pure HTML + Tailwind CDN + vanilla JS

## Deploy to GitHub Pages (2 steps)

### Step 1 — Push this repo to GitHub
```bash
git init
git add .
git commit -m "feat: initial portfolio"
git remote add origin https://github.com/walid-guettala/portfolio.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages
1. Go to your repo → **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. That's it — the workflow in `.github/workflows/deploy.yml` handles everything automatically.

Your portfolio will be live at:
**https://walid-guettala.github.io/portfolio/**

Every `git push` to `main` redeploys automatically.
