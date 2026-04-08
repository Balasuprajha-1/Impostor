# 🚀 FAST DEPLOYMENT CHECKLIST

Copy-paste this to track your progress:

## STEP 1: Firebase Firestore Setup (5 minutes)
- [ ] Go to https://console.firebase.google.com/
- [ ] Select project: `wordimpostor-a0734`
- [ ] Click "Firestore Database" in sidebar
- [ ] Click "Create Database"
- [ ] Choose region `us-central1`
- [ ] Click "Start in test mode"
- [ ] Click "Enable"
- [ ] Go to "Rules" tab
- [ ] Copy & paste rules (see DEPLOYMENT_GUIDE.md Part 1.2)
- [ ] Click "Publish"

✅ **Firestore is ready!**

---

## STEP 2: Test Locally (5 minutes)
- [ ] Create `.env.local` file with Firebase credentials (already filled in)
- [ ] Run: `npm install`
- [ ] Run: `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Create a test room
- [ ] Open another tab, join room
- [ ] Verify real-time sync works

✅ **Local testing complete!**

---

## STEP 3: Push to GitHub (5 minutes)
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit"`
- [ ] Create repo at https://github.com/new
- [ ] Run: `git remote add origin https://github.com/USERNAME/word-impostor-game.git`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`

✅ **Code on GitHub!**

---

## STEP 4: Deploy to Vercel (3 minutes)
- [ ] Go to https://vercel.com/new
- [ ] Click "Import Project"
- [ ] Paste GitHub repo URL
- [ ] Click "Continue"
- [ ] Framework auto-selects "Next.js" ✓
- [ ] Click "Continue"

### Add 7 Environment Variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wordimpostor-a0734.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://wordimpostor-a0734-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wordimpostor-a0734
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wordimpostor-a0734.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1000936855822
NEXT_PUBLIC_FIREBASE_APP_ID=1:1000936855822:web:52f85cb6d327dd60e0df5f
```

- [ ] Add each variable one by one
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes... ⏳

✅ **Deployed to Vercel!**

---

## STEP 5: Verify It Works (2 minutes)
- [ ] Click Vercel URL when deployment completes
- [ ] Create a room
- [ ] Open in another browser/incognito
- [ ] Join the room
- [ ] Test game flow

✅ **🎉 LIVE AND WORKING!**

---

## Troubleshooting

| ❌ Problem | ✅ Solution |
|---|---|
| Build failed on Vercel | Check env variables are all set correctly |
| Can't join rooms | Firestore not created or rules wrong |
| No real-time sync | Check Firestore rules published |
| Blank page | Wait 5 min, refresh, check browser console (F12) |

---

## Next Deployments Are Easy!

After making code changes:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel auto-deploys! ✨

---

**Total Time: ~20 minutes to production! 🚀**
