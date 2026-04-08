# Terminal Commands for Deployment

Copy-paste these commands one by one in your terminal.

## 🖥️ LOCAL SETUP

### Install & Run
```bash
npm install
npm run dev
```

Then open: http://localhost:3000

---

## 📤 GITHUB SETUP

Run these commands in order:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Word Impostor Game"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/word-impostor-game.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

Check: Go to GitHub repo and see all your files there

---

## 🔄 AFTER MAKING CHANGES (Use this repeatedly)

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Your description of changes"

# Push to GitHub (Vercel auto-deploys!)
git push origin main
```

---

## 🔑 ENVIRONMENT VARIABLES

### Create .env.local file:
```bash
# Create file
echo "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc" > .env.local
echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wordimpostor-a0734.firebaseapp.com" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://wordimpostor-a0734-default-rtdb.firebaseio.com" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=wordimpostor-a0734" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wordimpostor-a0734.firebasestorage.app" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1000936855822" >> .env.local
echo "NEXT_PUBLIC_FIREBASE_APP_ID=1:1000936855822:web:52f85cb6d327dd60e0df5f" >> .env.local
```

Or manually create `.env.local` in project root with:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wordimpostor-a0734.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://wordimpostor-a0734-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wordimpostor-a0734
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wordimpostor-a0734.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1000936855822
NEXT_PUBLIC_FIREBASE_APP_ID=1:1000936855822:web:52f85cb6d327dd60e0df5f
```

---

## 🔍 VERIFY SETUP

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check your git config
git config --global user.name
git config --global user.email
```

---

## 🚀 VERCEL DEPLOYMENT

No terminal commands needed for Vercel!

Just:
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Add environment variables (copy-paste from above)
4. Click Deploy

---

## 📝 GIT CONFIGURATION (First time only)

If you haven't configured git:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify
git config --global user.name
git config --global user.email
```

---

## 🔧 TROUBLESHOOTING COMMANDS

```bash
# Check git status
git status

# See git log (recent commits)
git log --oneline -5

# See all branches
git branch -a

# See remote URLs
git remote -v

# If you made mistakes, reset to last commit
git reset --hard HEAD
```

---

## 📊 BUILD FOR PRODUCTION

```bash
# Build the app
npm run build

# Start production server locally
npm start
```

Open http://localhost:3000 to test production build

---

## 🧹 CLEANUP

```bash
# Remove node_modules if needed
rm -r node_modules

# Reinstall fresh
npm install
```

---

**That's it! Use the commands above for your entire deployment journey.** ✨
