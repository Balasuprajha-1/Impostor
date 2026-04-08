# 🚀 GitHub → Vercel Deployment (No Local Setup)

Since you don't have Node.js locally, we'll push code directly to GitHub and let Vercel handle everything.

---

## 📋 What You Need Before Starting

- ✅ GitHub account (free)
- ✅ Vercel account (free)
- ✅ Firebase setup complete (see FIREBASE_SETUP_ONLY.md)
- ✅ This code folder (already downloaded)

---

## 🖥️ Step 1: Create GitHub Repository

### 1.1: Go to GitHub

Visit: https://github.com/new

### 1.2: Fill in Details

```
Repository name: word-impostor-game
Description: Word Impostor Game Built with Next.js and Firebase
Visibility: PUBLIC (very important!)
Initialize with: NOTHING - leave unchecked
```

### 1.3: Create Repository

Click **"Create repository"** green button

### 1.4: Copy Your GitHub URL

After creation, you'll see:

```
Your repository URL looks like:
https://github.com/YOUR_USERNAME/word-impostor-game
```

**Copy this entire URL** - you'll need it for Vercel

---

## 📦 Step 2: Upload Code to GitHub

Since you don't have Git locally, we'll use GitHub's web interface:

### 2.1: Click "uploading an existing file"

On your empty repository page, you'll see text that says:
"...or upload an existing file"

Click it.

### 2.2: Upload Project Files

```
This won't work easily through web import.
Let me give you an alternative...
```

---

## ⚡ **EASIER WAY: GitHub Desktop App**

### Download GitHub Desktop

Visit: https://desktop.github.com/

**Download and install** (5 minutes)

### 2.3: Clone and Add Files

1. Open GitHub Desktop
2. Go to File → Clone Repository
3. Choose your repository: `word-impostor-game`
4. Click "Clone"
5. This creates a folder locally
6. **Copy ALL files** from your impostor folder into this GitHub Desktop folder
7. GitHub Desktop will detect changes
8. Commit: "Initial commit"
9. Click "Push origin"

**That's it! Code is on GitHub**

---

## 🔑 Alternative: Git via GitHub Web (Harder but Possible)

If you prefer not to install GitHub Desktop:

### Using GitHub Web Upload

1. Go to your repository: https://github.com/YOUR_USERNAME/word-impostor-game
2. Click "Add file" → "Upload files"
3. Drag and drop your entire project folder
4. Click "Commit changes"

**limitation:** This won't upload properly
**Solution:** Use GitHub Desktop instead

---

## 🎯 Step 3: Deploy on Vercel

### 3.1: Go to Vercel

Visit: https://vercel.com/new

### 3.2: Import Your Repository

```
You'll see: "Import Git Repository"
Click the field
Paste: https://github.com/YOUR_USERNAME/word-impostor-game
Click: "Continue"
```

### 3.3: Configure Project

Vercel will auto-detect:
```
✓ Framework: Next.js
✓ Root Directory: ./
No changes needed!
Click: "Continue"
```

### 3.4: No Environment Variables Needed!

Since we hardcoded credentials:
- ✓ Skip environment variables
- ✓ No setup required
- ✓ Firebase credentials already in code

### 3.5: Deploy

Click: **"Deploy"** button (blue)

**Wait 2-3 minutes...**

When done, you'll see:
- ✅ Green checkmark
- 📱 Your live URL: `https://word-impostor-game-xxxxx.vercel.app`

---

## ✨ Step 4: Test Your Live Game

### 4.1: Open Your Live URL

Click the URL provided by Vercel (or go to dashboard)

### 4.2: Create a Test Room

```
1. Enter name: "Player1"
2. Click "Create Room"
3. Copy Room ID shown
```

### 4.3: Join from Another Browser

```
Open Incognito Window:
1. Paste same Vercel URL
2. Enter name: "Player2"
3. Paste Room ID
4. Click "Join Room"

Both windows should sync immediately! ✓
```

### 4.4: Play Full Game

```
1. Player1 clicks "Start Game"
2. Both get words assigned
3. Enter descriptions
4. Vote for impostor
5. See results

Everything works in real-time! 🎉
```

---

## 🎁 Share with Colleagues

When ready to share, get your Vercel URL:

```
https://word-impostor-game-xxxxx.vercel.app

Share this link with your colleagues!
They can:
- Create rooms
- Join with Room ID
- Play immediately
```

---

## 📝 Complete Timeline

```
Firebase Setup:     5 minutes  ✓
GitHub Deploy:      5 minutes  ✓
Vercel Deploy:      5 minutes  ✓
Live Testing:       2 minutes  ✓
─────────────────────────────
TOTAL:             15 minutes  🚀
```

---

## 🆘 Troubleshooting

### Issue: Vercel build failed

**Solution:**
1. Go to Vercel dashboard → your project
2. Click "Deployments" tab
3. Click the failed deployment
4. Read the error in "Build Logs"
5. Usually just needs 2-3 minutes retry
6. Click "Redeploy"

### Issue: Blank page on live URL

**Solution:**
1. Wait 2-3 more minutes (still loading)
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check browser console: F12 → Console tab
4. Look for Firebase errors

### Issue: Can't create/join rooms

**Solution:**
1. Firestore database not created
2. Go back to Firebase setup
3. Ensure "Enable Firestore Database" is done
4. Check security rules are published

### Issue: Real-time sync not working

**Solution:**
1. Go to Firebase console
2. Firestore Database → Rules tab
3. Verify rules allow read/write
4. Click "Publish" again
5. Refresh game page

---

## ✅ Deployment Checklist

### Before Deploying:
- [ ] Firebase Firestore created
- [ ] Security rules published
- [ ] Project folder ready
- [ ] GitHub account created
- [ ] Vercel account created

### During Deployment:
- [ ] Code pushed to GitHub
- [ ] Repository is PUBLIC (important!)
- [ ] Vercel connected to GitHub repo
- [ ] Deployment succeeded (green checkmark)

### After Deployment:
- [ ] Live URL accessible
- [ ] Can create rooms
- [ ] Can join rooms
- [ ] Real-time sync works
- [ ] All 4-8 players can play

### Ready to Share:
- [ ] Tested with multiple browsers
- [ ] Verified game flow works
- [ ] Share URL with colleagues
- [ ] Celebrate! 🎉

---

## 📱 Mobile Support

Your game works on phones too!

```
Share URL with colleagues via:
- WhatsApp
- Email
- Slack
- Teams

They can open on any device:
- Desktop ✓
- Phone ✓
- Tablet ✓
```

---

## 🔄 Making Updates Later

If you need to update code:

### Using GitHub Desktop:
```
1. Make code changes in your folder
2. Open GitHub Desktop
3. See changes listed
4. Write commit message
5. Click "Commit to main"
6. Click "Push origin"
7. Vercel auto-deploys in 1-2 minutes
8. Refresh live URL to see changes
```

### Without GitHub Desktop:
```
Use GitHub web upload:
1. Go to your repo on GitHub
2. Find the file to change
3. Click pencil icon
4. Edit online
5. Click "Commit changes"
6. Vercel auto-deploys
```

---

## 🎯 Next Steps

### Immediate:
1. ✅ Complete Firebase setup (FIREBASE_SETUP_ONLY.md)
2. ✅ Download GitHub Desktop
3. ✅ Create GitHub repository
4. ✅ Push code to GitHub
5. ✅ Deploy on Vercel
6. ✅ Test live game

### Later (Optional):
- Add custom word pairs
- Change colors/theme
- Add player statistics
- Add user accounts

---

**Ready? Let's deploy! 🚀**

Next step: Complete Firebase setup, then come back here for GitHub → Vercel
