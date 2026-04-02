# Vercel Deployment Guide

## Unified Deployment (Recommended)

This project is configured to serve both English and Korean versions from a single Vercel project using **Rewrites**.

### 1. Configuration

The `vercel.json` file handles routing:

- `domain.com/` -> Serves `/index.html` (English)
- `domain.com/ko` -> Serves `/ko/index.html` (Korean)

### 2. Deployment Steps

1.  Go to Vercel Dashboard and create a **New Project**.
2.  Import this Git repository.
3.  **Root Directory**: Leave as `./` (Default).
4.  **Build Command**: None (Static HTML).
5.  Click **Deploy**.

No separate project is needed for the Korean version. The `vercel.json` configuration automatically routes `/ko` requests to the correct file while maintaining a single domain.
