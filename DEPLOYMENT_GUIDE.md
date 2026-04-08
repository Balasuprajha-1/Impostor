# Complete Deployment Guide - Firebase & Vercel

This guide walks you through deploying the Word Impostor Game to production using Firebase and Vercel.

## Part 1: Firebase Firestore Setup

Your Firebase Project ID: `wordimpostor-a0734`

### Step 1.1: Create Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project `wordimpostor-a0734`
3. In left sidebar, click **"Firestore Database"**
4. Click **"Create Database"**
5. Select region: **`us-central1`** (or closest to you)
6. Choose **Start in test mode** (for development)
7. Click **"Enable"**

### Step 1.2: Configure Firestore Security Rules

Once Firestore is created:

1. Click the **"Rules"** tab at the top
2. Replace all content with this (allows authenticated & test access):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for testing
    match /{document=**} {
      allow read, write: if request.auth != null || request.auth == null;
    }
  }
}
```

3. Click **"Publish"**

> ⚠️ **Security Note**: These rules are for development/testing. For production, add proper authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /gameRooms/{roomId} {
      allow read, write;
    }
  }
}
```

### Step 1.3: Create .env.local File Locally

Create file `.env.local` in your project root with your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wordimpostor-a0734.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://wordimpostor-a0734-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wordimpostor-a0734
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wordimpostor-a0734.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1000936855822
NEXT_PUBLIC_FIREBASE_APP_ID=1:1000936855822:web:52f85cb6d327dd60e0df5f
```

## Part 2: Test Locally (Before Deploying)

### Step 2.1: Install Dependencies

```bash
npm install
```

### Step 2.2: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- Create a room
- Add multiple players
- Start game
- Go through all phases to verify real-time sync works

### Step 2.3: Test in Multiple Tabs

1. Open http://localhost:3000 in Tab 1
2. Open http://localhost:3000 in Tab 2
3. Player 1: Create room, get Room ID
4. Player 2: Join with Room ID
5. Verify real-time updates work (messages sync immediately)

**If not syncing**: Check browser console (F12) for Firebase errors

---

## Part 3: Deploy to GitHub

### Step 3.1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Word Impostor Game"
```

### Step 3.2: Create GitHub Repository

1. Go to https://github.com/new
2. Create repository name: `word-impostor-game`
3. Make it **Public** (Vercel needs access)
4. **Do NOT** initialize with README (you already have one)

### Step 3.3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/word-impostor-game.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Verify**: Go to your GitHub repo and see all files there

---

## Part 4: Deploy to Vercel

### Step 4.1: Connect to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Project"**
3. Paste GitHub repo URL: `https://github.com/YOUR_USERNAME/word-impostor-game.git`
4. Click **"Continue"**

### Step 4.2: Configure Project

1. **Framework Preset**: Should auto-select "Next.js" ✓
2. **Root Directory**: Leave as `./`
3. Click **"Continue"**

### Step 4.3: Add Environment Variables

Click **"Add Environment Variable"** and enter these 7 variables:

| Variable Name | Value |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `wordimpostor-a0734.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | `https://wordimpostor-a0734-default-rtdb.firebaseio.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `wordimpostor-a0734` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `wordimpostor-a0734.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `1000936855822` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:1000936855822:web:52f85cb6d327dd60e0df5f` |

**Each time**:
1. Enter name in **"Name"** field
2. Enter value in **"Value"** field
3. Click **"Add"** button
4. Repeat for next variable

### Step 4.4: Deploy

Click **"Deploy"** button

Vercel will:
- Download your code ✓
- Install dependencies ✓
- Build Next.js app ✓
- Deploy to CDN ✓

This takes 2-3 minutes. You'll see a progress bar.

### Step 4.5: Deployment Success

When complete, you'll see:
- ✅ Green checkmark
- Your app URL: `https://word-impostor-game-xxx.vercel.app`

**Click the URL to visit your live game!** 🎉

---

## Part 5: Verify Deployment Works

### Step 5.1: Test Live Game

1. Visit your Vercel URL in browser
2. Create a room
3. Open in another browser/incognito window
4. Join with Room ID
5. Test real-time synchronization

### Step 5.2: Troubleshooting

**Issue**: Game loads but can't create/join rooms
- **Solution**: Check Firestore is enabled in Firebase Console
- Go to Firebase Console → Firestore Database → Should see database created

**Issue**: "Connection error" messages
- **Solution**: Verify all 7 environment variables are set in Vercel
  - Go to Vercel Dashboard → Project Settings → Environment Variables
  - All variables must be visible

**Issue**: Real-time updates not working
- **Solution**: Check Firestore security rules
  - Go to Firebase → Firestore → Rules tab
  - Rules should match the ones we set above

---

## Part 6: Making Updates

### After Making Code Changes:

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

2. **Vercel auto-deploys** - Your app updates automatically! 🚀

### To check deployment status:

- Go to https://vercel.com/dashboard
- Click your project
- See all deployments in "Deployments" tab

---

## Domain Setup (Optional)

To use a custom domain instead of `vercel.app`:

1. Go to Vercel Project Settings → Domains
2. Add your domain (e.g., `wordimpostor.com`)
3. Add DNS records (Vercel shows instructions)
4. Wait 5-10 minutes for DNS to propagate

---

## Firebase Limits & Monitoring

### Free Tier Limits

- **Firestore**: 50K reads/day free
- **Bandwidth**: 1GB/day free
- **Storage**: 1GB free

### Monitor Usage

1. Go to Firebase Console
2. Click **"Usage"** in left sidebar
3. See real-time metrics

### Upgrade if Needed

When you exceed free tier:
1. Go to Firebase Project Settings → Billing
2. Enable Blaze Plan (pay-as-you-go)
3. Only pay for what you use

---

## Quick Reference Checklist

### Before First Deployment:
- [ ] Firebase credentials ready
- [ ] `.env.local` file created locally
- [ ] Tested locally with real-time sync
- [ ] Code pushed to GitHub
- [ ] 7 env variables added to Vercel

### After Deployment:
- [ ] Visit live URL and test
- [ ] Create a room on live
- [ ] Verify Firestore database has new documents
- [ ] Test real-time sync with multiple browsers

### Ongoing:
- [ ] Monitor Firebase usage
- [ ] Update code and push to GitHub
- [ ] Check Vercel deployments dashboard

---

## Support & Troubleshooting

### Common Issues

| Problem | Solution |
|---|---|
| 404 Not Found | Wait 2-3 min for deployment to complete |
| Blank page | Check browser console (F12) for errors |
| Firebase not connecting | Verify env variables in Vercel dashboard |
| Real-time not syncing | Check Firestore rules allow read/write |

### Getting Help

1. Check browser console: F12 → Console tab → Read error messages
2. Check Vercel build logs: Vercel Dashboard → Deployments → Click deployment → "Build Logs"
3. Check Firebase: Firebase Console → Firestore → Check for your documents being created

---

## Security Notes

⚠️ **Before going to production (many users)**:

1. **Enable Authentication**: Users should sign in
2. **Strict Security Rules**: Don't allow all read/write
3. **Rate Limiting**: Prevent abuse
4. **HTTPS Only**: Already done by Vercel ✓

For now, this setup is perfect for testing with colleagues!

---

**Your game is ready to deploy! 🚀**

Next step: [Follow Part 3 to push to GitHub](#part-3-deploy-to-github)
