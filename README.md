# Sater Advisory — Website Deployment

Rental industry M&A advisory website. Static HTML/CSS, deployed via Netlify, served at sateradvisory.com.

## Stack

- **Static HTML/CSS** (no JS framework, no build step required)
- **Google Fonts** (Fraunces + Manrope, loaded via CDN)
- **Netlify** for hosting and form handling
- **GitHub** for version control and auto-deploy trigger
- **Calendly** embedded on /contact for scheduling

## File structure

```
sater-advisory/
├── index.html          Home page
├── about.html          About / get to know me
├── valuation.html      Confidential valuation request form (QR code destination)
├── contact.html        Calendly embed + direct contact alternatives
├── thank-you.html      Post-submission confirmation
├── styles.css          Single stylesheet for all pages
├── _redirects          Netlify URL routing rules
├── netlify.toml        Netlify build config + cache headers
├── images/             All site images
│   ├── sater-logo.svg          Logo (black, for white bgs)
│   ├── sater-logo-white.svg    Logo (white, for navy bgs)
│   ├── chris-headshot.jpg      Portrait
│   ├── lifts-orange.jpg        Hero image
│   ├── encore-rally.jpg        Encore Event Rentals aerial
│   └── ...other industry photos
└── README.md           This file
```

## Pages

| URL | File | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage |
| `/about` | `about.html` | Founder story, credentials |
| `/valuation` | `valuation.html` | **QR code destination** — confidential valuation form |
| `/contact` | `contact.html` | Calendly embed + phone/email |
| `/thank-you` | `thank-you.html` | Form submission confirmation |

## Deployment steps

### 1. Push to GitHub

Create a new private repo on GitHub (e.g. `sater-advisory-site`). From your local machine:

```bash
cd path/to/sater-advisory
git init
git add .
git commit -m "Initial commit: Sater Advisory site"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/sater-advisory-site.git
git push -u origin main
```

### 2. Connect to Netlify

1. Log in to Netlify
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub** and authorize Netlify
4. Pick the `sater-advisory-site` repo
5. Build settings: leave defaults (publish directory `.`, no build command needed)
6. Click **Deploy**

Netlify will deploy and give you a temporary URL like `https://random-name.netlify.app`. Verify the site works there first.

### 3. Configure custom domain (sateradvisory.com)

In Netlify:
1. Go to **Domain management** → **Add a domain**
2. Enter `sateradvisory.com`
3. Netlify will give you DNS records to add. Two options:

**Option A: Netlify DNS (recommended, easier)**
- Update GoDaddy to use Netlify nameservers (Netlify provides them)
- This delegates all DNS to Netlify

**Option B: Keep GoDaddy DNS**
- Add an A record pointing to Netlify's load balancer IP
- Add a CNAME for `www` pointing to your `*.netlify.app` URL

**Option A is simpler. Both work.** DNS propagation takes 24-48 hours but usually much less.

### 4. Enable Netlify Forms

Netlify auto-detects the valuation form (it has `data-netlify="true"` already). After first deploy:

1. Go to **Forms** in Netlify dashboard
2. You should see the `valuation` form listed
3. Click into it → **Settings & usage** → **Form notifications**
4. Add **Email notification** → enter `chris@sateradvisory.com`

Every form submission will now email you with all fields filled in.

### 5. Set up form spam protection

Already configured via honeypot field (invisible to humans, traps bots). For additional protection, you can also enable Netlify's reCAPTCHA in Forms settings — optional.

### 6. SSL certificate

Netlify provisions free SSL automatically. Once DNS resolves to Netlify, certificate is issued within minutes. Site will be HTTPS only.

## Making changes

To update content:

1. Edit the HTML files locally
2. Commit and push to GitHub
3. Netlify auto-deploys within ~30 seconds

For copy changes, look for the text inside `<p>`, `<h1>`, `<h2>`, etc. tags.

## Brand assets

Color palette (defined in `styles.css` at top):
- Navy primary: `#1F4E78`
- Navy deep: `#0F2A44` and `#112A42`
- Cream: `#FAF8F3`
- Accent gold: `#C9A36B`

Typography:
- Display: Fraunces (Google Fonts, variable weight + softness axes)
- Body: Manrope (Google Fonts)

## QR code compatibility

The 125 letters mailed Monday 5/18 have QR codes pointing to `https://sateradvisory.com/valuation`. The `_redirects` file handles `/valuation.html → /valuation` and trailing slash variants, so any version of the URL resolves correctly.

## Contact for questions

Chris Sater · 318.525.7349 · chris@sateradvisory.com
