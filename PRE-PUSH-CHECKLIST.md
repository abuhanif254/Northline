# Pre-Push Checklist

Complete this checklist before pushing to GitHub.

## 🧹 Cleanup Tasks

- [ ] **Delete `.grok/` directory**
  ```powershell
  Remove-Item -Recurse -Force ".grok"
  ```

- [ ] **Delete `public/__grok/` directory**
  ```powershell
  Remove-Item -Recurse -Force "public\__grok"
  ```

- [ ] **Delete empty `server/` directory**
  ```powershell
  Remove-Item -Recurse -Force "server"
  ```

- [ ] **Verify no Grok files remain**
  ```powershell
  # Search for any remaining Grok references
  Get-ChildItem -Recurse -Filter "*grok*" -ErrorAction SilentlyContinue | Select-Object FullName
  ```

## 📁 File Verification

- [ ] `.gitignore` exists and is complete
- [ ] `.env.example` exists (template - safe to commit)
- [ ] `.env` exists but is NOT committed (in .gitignore)
- [ ] `README.md` is complete and helpful
- [ ] `DEPLOYMENT.md` has deployment instructions
- [ ] `MIGRATION-SUMMARY.md` documents all changes
- [ ] `package.json` has correct scripts
- [ ] `package-lock.json` exists
- [ ] `vercel.json` is properly configured

## 🔒 Security Check

- [ ] No secrets in `.env.example`
- [ ] No API keys or passwords in any committed files
- [ ] `.env` is in `.gitignore`
- [ ] No database credentials in source code
- [ ] No private tokens in configuration files

## 🧪 Local Testing

- [ ] `npm install` runs successfully
- [ ] `npm run dev` starts without errors
- [ ] Home page loads at `http://localhost:5173`
- [ ] No console errors in browser
- [ ] `npm run build` completes successfully
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run preview` works (production build preview)

## 📝 Documentation

- [ ] README.md describes the project clearly
- [ ] Installation instructions are accurate
- [ ] Development commands are documented
- [ ] Deployment instructions exist
- [ ] Environment variables are documented in `.env.example`

## 🎨 Code Quality

- [ ] Run linter: `npm run lint` (fix any issues)
- [ ] Run formatter: `npm run format`
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] Remove any console.log debugging statements
- [ ] Remove commented-out code

## 📦 Dependencies

- [ ] All dependencies are properly listed in `package.json`
- [ ] No unused dependencies
- [ ] `package-lock.json` is committed (for npm)
- [ ] `node_modules/` is in `.gitignore`

## 🚀 Git Preparation

- [ ] Git is initialized: `git init`
- [ ] Main branch: `git branch -M main`
- [ ] All files staged: `git add .`
- [ ] First commit ready: `git commit -m "Initial commit: Northline job board"`
- [ ] GitHub repository created (but empty)
- [ ] Remote added: `git remote add origin <your-repo-url>`

## ✅ Final Checks

Run these commands and verify output:

```powershell
# 1. Check git status
git status
# Expected: Many files ready to commit, .env should NOT appear

# 2. Check for sensitive files
git ls-files | Select-String -Pattern "\.env$"
# Expected: No output (or only .env.example)

# 3. Verify build works
npm run build
# Expected: Build completes successfully

# 4. Check file count
(Get-ChildItem -Recurse -File).Count
# Expected: Reasonable number of files (not thousands from node_modules)

# 5. Verify .gitignore is working
git check-ignore node_modules .env .output
# Expected: All three paths should be listed (they're ignored)
```

## 🎯 Ready to Push?

If all checkboxes above are checked ✅, you're ready to push!

```powershell
# Push to GitHub
git push -u origin main
```

## 🐛 Common Issues

### Issue: `.grok/` won't delete
**Solution:**
```powershell
# Try with force
Remove-Item -Path ".grok" -Recurse -Force -ErrorAction Stop

# Or manually delete via File Explorer
explorer .
```

### Issue: Git says files are too large
**Solution:**
```powershell
# Check file sizes
Get-ChildItem -Recurse | Where-Object {$_.Length -gt 50MB} | Select-Object FullName, @{N='Size(MB)';E={[math]::Round($_.Length/1MB,2)}}

# Add to .gitignore if needed
```

### Issue: `node_modules/` is being committed
**Solution:**
```powershell
# Verify .gitignore exists and contains node_modules/
cat .gitignore | Select-String "node_modules"

# Remove from git if already staged
git rm -r --cached node_modules
git commit -m "Remove node_modules from git"
```

### Issue: `.env` file is visible in git
**Solution:**
```powershell
# Remove from git but keep locally
git rm --cached .env
git commit -m "Remove .env from version control"
```

## 📊 Repository Statistics

After pushing, your repository will contain approximately:
- **Lines of Code:** ~15,000+ (TypeScript, TSX, CSS)
- **Files:** ~200 source files (excluding node_modules)
- **Size:** ~5-10 MB (excluding dependencies)
- **Languages:** TypeScript (80%), CSS (15%), JSON (5%)

## 🎉 Post-Push

After successful push:
1. Visit your GitHub repository
2. Verify files are there
3. Check that `.env` is NOT visible
4. Set up Vercel deployment (see DEPLOYMENT.md)
5. Add repository description and topics

---

**All checks passed?** 

Run:
```powershell
git push -u origin main
```

🚀 Your Northline job board is ready for GitHub!
