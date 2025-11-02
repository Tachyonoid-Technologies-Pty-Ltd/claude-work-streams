# Branch Protection Setup Guide
## Securing master and development branches

**Date:** 2025-10-31
**Repository:** claude-work-streams
**Required Role:** Repository Administrator

---

## Overview

This guide walks through setting up branch protection rules to require pull request approval for commits to `master` and `development` branches.

**Goal:** Prevent direct commits to protected branches. All changes must go through pull requests approved by repository owner.

---

## Step-by-Step Instructions

### 1. Access Repository Settings

1. Go to: https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams
2. Click **Settings** tab (requires admin access)
3. In left sidebar, click **Branches** under "Code and automation"

---

### 2. Add Branch Protection Rule for `master`

#### 2.1 Create Rule

1. Click **Add branch protection rule** button
2. In "Branch name pattern" field, enter: `master`

#### 2.2 Configure Protection Settings

**Require a pull request before merging:**
- ✅ Check: "Require a pull request before merging"
- ✅ Check: "Require approvals"
- Set "Required number of approvals before merging": **1**
- ✅ Check: "Dismiss stale pull request approvals when new commits are pushed"
- ✅ Check: "Require review from Code Owners" (if you have CODEOWNERS file)

**Require status checks to pass before merging:**
- ⬜ Optional: Check if you have CI/CD set up
- If checked, select required status checks

**Require conversation resolution before merging:**
- ✅ Check: "Require conversation resolution before merging"
- Ensures all PR comments are addressed

**Require signed commits:**
- ⬜ Optional: Check for additional security
- Requires GPG-signed commits

**Require linear history:**
- ✅ Check: "Require linear history"
- Prevents merge commits, keeps history clean

**Include administrators:**
- ✅ **IMPORTANT:** Check "Include administrators"
- This applies rules to YOU as well
- Ensures you also go through PR process
- Best practice for accountability

**Allow force pushes:**
- ⬜ **LEAVE UNCHECKED**
- Prevents rewriting history
- Protects against accidental data loss

**Allow deletions:**
- ⬜ **LEAVE UNCHECKED**
- Prevents branch deletion
- Protects main branch

#### 2.3 Save Rule

- Click **Create** button at bottom
- Rule is now active for `master` branch

---

### 3. Add Branch Protection Rule for `development`

#### 3.1 Create Rule

1. Click **Add branch protection rule** button again
2. In "Branch name pattern" field, enter: `development`

#### 3.2 Configure Protection Settings

Use **same settings as master** with one difference:

**Require a pull request before merging:**
- ✅ Check: "Require a pull request before merging"
- ✅ Check: "Require approvals"
- Set "Required number of approvals before merging": **1**
- ✅ Check: "Dismiss stale pull request approvals when new commits are pushed"

**Require conversation resolution before merging:**
- ✅ Check: "Require conversation resolution before merging"

**Require linear history:**
- ✅ Check: "Require linear history"

**Include administrators:**
- ✅ Check: "Include administrators"

**Allow force pushes:**
- ⬜ **LEAVE UNCHECKED**

**Allow deletions:**
- ⬜ **LEAVE UNCHECKED**

**Optional Difference for Development:**
- You MAY allow slightly more flexibility on development
- But recommended to keep same strict rules

#### 3.3 Save Rule

- Click **Create** button at bottom
- Rule is now active for `development` branch

---

## Verification

### Test Protection Rules

After setup, verify rules work:

1. **Test direct commit (should fail):**
   ```bash
   git checkout master
   echo "test" >> test.txt
   git add test.txt
   git commit -m "test direct commit"
   git push origin master
   ```
   **Expected:** Push rejected with message about branch protection

2. **Test PR workflow (should succeed):**
   ```bash
   git checkout -b test-branch
   echo "test" >> test.txt
   git add test.txt
   git commit -m "test via PR"
   git push origin test-branch
   gh pr create --base master --head test-branch --title "Test PR"
   ```
   **Expected:** PR created successfully, awaits your approval

3. **Approve and Merge:**
   - Go to PR on GitHub
   - Click "Approve" (as reviewer)
   - Click "Merge pull request"
   **Expected:** Merge succeeds after approval

4. **Clean up:**
   ```bash
   gh pr close [PR-number]
   git push origin --delete test-branch
   git checkout development
   git branch -D test-branch
   ```

---

## Workflow After Protection

### For You (Repository Owner)

**When making changes:**

1. Create feature branch:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/my-feature
   ```

2. Make changes and commit:
   ```bash
   # ... make changes ...
   git add .
   git commit -m "feat: description"
   git push origin feature/my-feature
   ```

3. Create PR:
   ```bash
   gh pr create --base development --head feature/my-feature --title "..." --body "..."
   ```

4. Approve your own PR:
   - Go to PR on GitHub web interface
   - Review changes
   - Click "Approve" (as reviewer)
   - Click "Merge pull request"

5. Delete feature branch:
   ```bash
   git checkout development
   git pull origin development
   git branch -D feature/my-feature
   git push origin --delete feature/my-feature
   ```

### Benefits

**Why protect even as admin:**
- ✅ Prevents accidental direct commits
- ✅ Creates audit trail (all changes via PRs)
- ✅ Ensures you review before merging
- ✅ Prevents force push accidents
- ✅ Professional workflow
- ✅ Sets example for contributors

---

## Current PR Status

**PR #4: Merge development to master**
- **URL:** https://github.com/Tachyonoid-Technologies-Pty-Ltd/claude-work-streams/pull/4
- **Status:** Awaiting review
- **Changes:** v1.2.0, v1.2.1, v1.2.2, v1.3.0 docs
- **Action Required:** Review and approve PR #4

**After PR #4 merges:**
- master will have v1.2.2 (latest stable)
- Users cloning get production-ready version
- npm package aligns with master

---

## Troubleshooting

### "I can't push to master anymore"

**This is correct!** Branch protection is working.

**Solution:** Use PR workflow (see above)

### "I need to fix something urgently on master"

**Options:**

1. **Recommended:** Create hotfix branch and PR
   ```bash
   git checkout master
   git pull origin master
   git checkout -b hotfix/urgent-fix
   # ... make fix ...
   git commit -m "hotfix: description"
   git push origin hotfix/urgent-fix
   gh pr create --base master --head hotfix/urgent-fix
   # Approve and merge quickly
   ```

2. **Emergency only:** Temporarily disable protection
   - Go to Settings > Branches
   - Click "Edit" on master rule
   - Uncheck "Include administrators"
   - Make fix
   - Re-enable immediately

### "How do I approve my own PRs?"

1. Go to PR on GitHub
2. Click "Files changed" tab
3. Click "Review changes" button (top right)
4. Select "Approve"
5. Click "Submit review"
6. Go back to "Conversation" tab
7. Click "Merge pull request"

---

## Recommended Rulesets

### For Open Source Projects

**master branch:**
- Require PR approvals: 1+ (from maintainers)
- Include administrators: Yes
- Require status checks: Yes (if CI/CD exists)
- Require signed commits: Optional
- Linear history: Yes
- No force push: Yes
- No deletion: Yes

**development branch:**
- Same as master
- May allow more approvers

**feature branches:**
- No protection needed
- Can be force-pushed
- Can be deleted after merge

### For Private/Team Projects

**Same rules as above, plus:**
- Require status checks for CI/CD
- Require CODEOWNERS review
- May require 2+ approvals for master

---

## Documentation References

**GitHub Official Docs:**
- Branch protection rules: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- Managing rulesets: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets

**Best Practices:**
- Always protect main/master branches
- Always protect development/staging branches
- Include administrators in restrictions
- Require PR reviews (at least 1)
- Prevent force pushes and deletions
- Use linear history for clean git log

---

## Summary Checklist

After completing this guide:

- [ ] Branch protection rule created for `master`
- [ ] Branch protection rule created for `development`
- [ ] "Include administrators" enabled on both
- [ ] "Require approvals" set to 1+ on both
- [ ] "Require linear history" enabled on both
- [ ] "Allow force pushes" disabled on both
- [ ] "Allow deletions" disabled on both
- [ ] Protection rules tested and verified
- [ ] PR #4 reviewed and ready to merge

**Once all checkboxes complete, your repository is properly secured!**

---

**Document Version:** 1.0
**Last Updated:** 2025-10-31
**Author:** Work Streams Team
**Repository:** claude-work-streams
