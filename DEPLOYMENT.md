# Deployment Guide

This document outlines the deployment process for the Abel Insurance Group website.

## Deployment Method

The website is deployed using **GitHub Pages**, which provides free hosting for static websites directly from GitHub repositories.

## Deployment Configuration

### GitHub Pages Workflow

The deployment is automated using GitHub Actions. The workflow file `.github/workflows/deploy.yml` handles:

1. **Trigger**: Automatically deploys on push to `main` branch or manual trigger
2. **Build**: No build step required (pure HTML/CSS/JS)
3. **Upload**: Uploads the entire repository as an artifact
4. **Deploy**: Deploys the artifact to GitHub Pages

### Required GitHub Settings

To enable GitHub Pages for this repository:

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (not the legacy branch-based deployment)
3. Save the settings

The workflow will automatically deploy the site when changes are pushed to the `main` branch.

## Deployment Process

### Automatic Deployment

1. Make changes to the website files
2. Commit changes: `git commit -m "Your message"`
3. Push to main branch: `git push origin main`
4. GitHub Actions will automatically deploy the changes
5. Site will be available at: `https://adaryusrgillum.github.io/AbelInsuranceGroup/`

### Manual Deployment

You can also trigger a deployment manually:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow** button

## Accessing the Live Site

Once deployed, the website will be available at:

**https://adaryusrgillum.github.io/AbelInsuranceGroup/**

## Custom Domain (Optional)

To use a custom domain (e.g., `www.abelinsurancegroup.com`):

1. Add a `CNAME` file to the repository root with your domain name
2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `adaryusrgillum.github.io`
   - Or add A records pointing to GitHub Pages IPs
3. Configure custom domain in repository Settings → Pages
4. Wait for DNS propagation (can take up to 48 hours)

## Deployment Checklist

- [x] Created GitHub Actions workflow (`.github/workflows/deploy.yml`)
- [x] Added placeholder images (favicon.png, og-image.jpg)
- [ ] Enable GitHub Pages in repository settings (requires repository admin access)
- [ ] Verify deployment succeeds
- [ ] Test live site functionality
- [ ] (Optional) Configure custom domain

## Troubleshooting

### Deployment Fails

- Check GitHub Actions logs in the **Actions** tab
- Ensure GitHub Pages is enabled in repository settings
- Verify workflow file syntax

### 404 Errors

- Check that all file paths are correct and case-sensitive
- Verify all referenced assets exist
- Clear browser cache

### Changes Not Appearing

- Wait a few minutes for deployment to complete
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check GitHub Actions to ensure deployment succeeded

## Monitoring

Monitor deployment status:

- **Actions Tab**: View deployment history and logs
- **Environments**: Check deployment status and URL
- **Settings → Pages**: View current deployment status

## Security

The deployment workflow uses:

- Read-only content access
- Write access only for Pages deployment
- ID token for authentication
- Latest GitHub Actions (v4)

## Performance

The static site deployment provides:

- Fast loading times (no server-side processing)
- Global CDN distribution via GitHub Pages
- Automatic HTTPS
- High availability

## Support

For deployment issues:

- Check GitHub Actions logs
- Review GitHub Pages documentation
- Contact repository maintainer

---

**Last Updated**: November 10, 2024
**Deployment Status**: Ready for deployment to GitHub Pages
