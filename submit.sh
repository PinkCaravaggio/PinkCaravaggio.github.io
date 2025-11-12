#!/bin/bash

# --------------------------
# User configurable variables
# --------------------------
REPO_PATH="$1"               # Local project folder path
GITHUB_USER="your-username"  # GitHub username
GITHUB_REPO="repo-name"      # Repository name on GitHub
GITHUB_TOKEN="your-token"    # Personal access token
COMMIT_MSG="Initial commit"  # Default commit message

# --------------------------
# Go to project folder
# --------------------------
cd "$REPO_PATH" || { echo "Folder not found!"; exit 1; }

# --------------------------
# Initialize git if not already
# --------------------------
if [ ! -d ".git" ]; then
    git init
fi

# --------------------------
# Set local git config
# --------------------------
git config user.name "$GITHUB_USER"
git config user.email "$GITHUB_USER@users.noreply.github.com"
git config credential.helper store

# --------------------------
# Add remote (HTTPS with token)
# --------------------------
git remote remove origin 2>/dev/null
git remote add origin "https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/$GITHUB_REPO.git"

# --------------------------
# Stage, commit, and push
# --------------------------
# git add .
git add -A
git commit -m "$COMMIT_MSG"
git branch -M main
git push -u origin main
