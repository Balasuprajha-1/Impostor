# Quick Start Guide

## 5-Minute Local Setup

### 1. Install Node.js
Download from https://nodejs.org (LTS version recommended)

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase for Development

- Go to https://console.firebase.google.com/
- Create a new project (or use existing)
- Click "Add project" → "Create database" → Choose Firestore
- Select "Start in test mode"
- Copy your Firebase config from Project Settings

### 4. Create .env.local
```bash
cp .env.local.example .env.local
```

Paste your Firebase credentials into `.env.local`

### 5. Run the Game
```bash
npm run dev
```

Visit http://localhost:3000 in your browser

---

## Playing Local Multiplayer

1. Open http://localhost:3000 in multiple browser windows/tabs
2. **Player 1**: Click "Create Room" → Enter name → Remember Room ID
3. **Other Players**: Click "Join Room" → Paste Room ID → Enter name
4. **Host**: Click "Start Game" when everyone is ready
5. Follow the game phases and have fun!

---

## Deploy to Vercel (2 Minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect Vercel
- Go to https://vercel.com/new
- Import your GitHub repo
- Add Environment Variables (copy from .env.local)
- Click Deploy

Your game is live! 🎉

---

## Troubleshooting

**Can't connect to Firebase?**
- Check .env.local has correct Firebase credentials
- Verify Firestore is created in Firebase Console
- Check browser console for error messages

**Real-time sync not working?**
- Refresh the page
- Check Firebase Firestore security rules
- Try incognito window to clear cache

**Build fails on Vercel?**
- Ensure all environment variables are set in Vercel dashboard
- Check that .env.local is in .gitignore

---

## Next Steps

- Customize colors in `tailwind.config.ts`
- Add more word pairs in `src/lib/gameService.ts`
- Add user authentication
- Deploy improvements and new features

Enjoy! 🎮
