# Step-by-Step Visual Deployment Guide

## 🔥 PART 1: Firebase Setup

### Step 1 - Open Firebase Console
```
URL: https://console.firebase.google.com/
Expected to see: Your projects list
Your project: wordimpostor-a0734
```

### Step 2 - Go to Firestore
```
In left sidebar:
📦 Build → Firestore Database
```

### Step 3 - Create Database Button
```
Click: "Create Database" button
```

### Step 4 - Database Configuration Dialog
```
Select:
📍 Region: us-central1
🔒 Mode: Start in test mode
Click: "Enable"

⏳ Wait 1-2 minutes for database creation...
```

### Step 5 - Set Security Rules
```
After database created:
1. Click "Rules" tab at the top
2. Copy ENTIRE content to clipboard
3. Paste this code:

---START COPY---
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null || request.auth == null;
    }
  }
}
---END COPY---

4. Click "Publish" button (blue)
5. Wait for "Rules published successfully"
```

### ✅ Firebase Firestore is ready!

---

## 🖥️ PART 2: Local Testing

### Step 1 - Create .env.local
```
In Visual Studio Code:
1. Right-click in Explorer
2. New File: ".env.local"
3. Paste this content:

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wordimpostor-a0734.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://wordimpostor-a0734-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wordimpostor-a0734
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wordimpostor-a0734.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1000936855822
NEXT_PUBLIC_FIREBASE_APP_ID=1:1000936855822:web:52f85cb6d327dd60e0df5f

4. Save (Ctrl+S)
```

### Step 2 - Install Dependencies
```
In Terminal (Ctrl+`):
Command: npm install

Wait for: "added X packages"
```

### Step 3 - Start Dev Server
```
Command: npm run dev

You should see:
> word-impostor-game@0.1.0 dev
> next dev

  ▲ Next.js 14.x.x
  - Local: http://localhost:3000

✅ Ready to go!
```

### Step 4 - Open in Browser
```
URL: http://localhost:3000
You should see: Home page with "Create Room" / "Join Room" buttons
```

### Step 5 - Test Game Flow
```
In Chrome Tab 1:
1. Enter name: "Player1"
2. Enter room name: "TestRoom"
3. Click "Create Room"
4. Copy the Room ID shown

In Chrome Tab 2:
1. Enter name: "Player2"
2. Paste Room ID
3. Click "Join Room"
4. Both tabs should update in real-time ✓

In Tab 1 (Host):
1. Wait for at least 1 more player (now 2 total)
2. Click "Start Game"

Both tabs should now show:
- Their assigned word
- Description input box

If everything works → Your setup is correct! ✓
```

### ✅ Local testing complete!

---

## 📤 PART 3: Push to GitHub

### Step 1 - Initialize Git
```
Terminal commands (run one by one):
$ git init
$ git add .
$ git commit -m "Initial commit: Word Impostor Game"
```

### Step 2 - Create GitHub Repository
```
1. Go to: https://github.com/new
2. Repository name: word-impostor-game
3. Make it: Public
4. ❌ DO NOT check "Initialize with README"
5. Click "Create repository"

You'll see code to link:
git remote add origin https://github.com/YOUR_USERNAME/word-impostor-game.git
```

### Step 3 - Push to GitHub
```
Copy these commands from GitHub page:
$ git branch -M main
$ git remote add origin https://github.com/YOUR_USERNAME/word-impostor-game.git
$ git push -u origin main

Replace: YOUR_USERNAME with your actual GitHub username

Wait for: "Enumerating objects... 100%"
Then: "done"

✅ Code is on GitHub!
```

---

## 🚀 PART 4: Deploy to Vercel

### Step 1 - Go to Vercel Dashboard
```
URL: https://vercel.com/dashboard
```

### Step 2 - Import Project
```
Click: "Add New..." → "Project"
Click: "Import" (under "Import Git Repository")
```

### Step 3 - Connect GitHub
```
You'll see: "Connect your Git repository"
Paste: https://github.com/YOUR_USERNAME/word-impostor-game.git
Click: "Continue"

Vercel will: "Analyzing git repository"
✓ Found package.json
✓ Found Next.js
```

### Step 4 - Configure Project
```
You'll see:
- Framework Preset: Next.js ✓
- Root Directory: ./

Click: "Continue"
```

### Step 5 - Add Environment Variables
```
You'll see: "Environment Variables"

Add 7 variables (one by one):

Variable 1:
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc
Click: "Add"

Variable 2:
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: wordimpostor-a0734.firebaseapp.com
Click: "Add"

Variable 3:
Name: NEXT_PUBLIC_FIREBASE_DATABASE_URL
Value: https://wordimpostor-a0734-default-rtdb.firebaseio.com
Click: "Add"

Variable 4:
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: wordimpostor-a0734
Click: "Add"

Variable 5:
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: wordimpostor-a0734.firebasestorage.app
Click: "Add"

Variable 6:
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 1000936855822
Click: "Add"

Variable 7:
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:1000936855822:web:52f85cb6d327dd60e0df5f
Click: "Add"

After adding all 7, you should see all listed
```

### Step 6 - Deploy!
```
Click: "Deploy" button (large blue button)

You'll see progress:
  🔨 Building...
  📦 Bundling...
  ✓ Build completed
  🚀 Deploying...
  ✓ Deployed!

⏳ Total time: 2-3 minutes

When complete:
Green ✅ checkmark appears
Shows URL: https://word-impostor-game-xxxxx.vercel.app
```

### ✅ Deployed to Vercel!

---

## ✨ PART 5: Test Live Game

### Step 1 - Visit Your Live URL
```
Click: The URL shown after deployment
Example: https://word-impostor-game-abc123.vercel.app

You should see:
- Same home page as localhost
- "Create Room" and "Join Room" buttons
```

### Step 2 - Create a Test Room
```
Browser Window 1:
1. Name: "TestPlayer1"
2. Room: "LiveTest"
3. Click "Create Room"

See: Room ID (copy it)
```

### Step 3 - Join in Different Browser
```
Browser Window 2 (Incognito Mode):
1. Visit the same Vercel URL
2. Name: "TestPlayer2"
3. Room ID: paste from step 2
4. Click "Join Room"

See: Both players in different windows! 👥
```

### Step 4 - Test Real-Time Sync
```
Window 1: 
- Should see "TestPlayer2" appear in players list
- Should see count: 2/12

Window 2:
- Should see "TestPlayer1" listed
- Should see count: 2/12

✅ If both see each other instantly → REAL-TIME WORKING!
```

### ✅ LIVE GAME WORKING!

---

## 🎮 Full Game Test (Optional)

```
To fully test (need 3+ players):

1. Open 3+ browser windows
2. Create room in Window 1, get Room ID
3. Join with Window 2 & 3 (enter same Room ID)
4. Window 1 clicks "Start Game"
5. All windows get words assigned
6. Enter descriptions (Window 1: "dental", Window 2: "bristle", etc)
7. Click "Move to Voting" when all are done
8. Vote for who is impostor
9. See results on all windows simultaneously

If all sync correctly → Fully functional! 🎉
```

---

## 📋 Troubleshooting Guide

### Problem: Build Failed on Vercel
```
Solution:
1. Go to Vercel Dashboard → Deployments
2. Click the failed deployment
3. See "Build Logs" tab
4. Look for error, usually missing env variables
5. Fix in Project Settings → Environment Variables
6. Deploy again
```

### Problem: Blank Page or 404
```
Solution:
1. Wait 2-3 more minutes (still deploying)
2. Hard refresh (Ctrl+Shift+R)
3. Check browser console (F12 → Console tab)
4. Look for error messages about Firebase
```

### Problem: Can't Create/Join Rooms
```
Solution:
1. Go to Firebase Console
2. Firestore Database → should see database created
3. If not: Firestore not enabled
4. Create it now: https://console.firebase.google.com/
```

### Problem: Real-Time Sync Not Working
```
Solution:
1. Go to Firebase → Firestore → Rules
2. Check rules are published (should see green ✓)
3. Rules must allow read/write
4. If not, update them (see Part 1 Step 5)
5. Click "Publish" again
```

---

## 🎯 After Deployment

### Making Code Changes:
```
1. Make changes in VS Code
2. Save (Ctrl+S)
3. Terminal: git add .
4. Terminal: git commit -m "Description of change"
5. Terminal: git push origin main
6. Vercel auto-redeploys (1-2 min)
7. Refresh your live URL → See changes!
```

### Checking Deployment Status:
```
Go to: https://vercel.com/dashboard
Click: word-impostor-game
See: "Deployments" tab
Each push triggers a new deployment
```

---

## ✅ YOU'RE DONE! 

### Summary:
```
✓ Firebase Firestore created
✓ Code tested locally
✓ Pushed to GitHub
✓ Deployed to Vercel
✓ Game is LIVE
✓ Real-time sync WORKING
✓ Ready for teammates!
```

**Share this URL with your colleagues:**
```
https://word-impostor-game-xxxxx.vercel.app
```

🎉 **Enjoy playing!**
