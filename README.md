# The Art of Moving

Personal website for Chloe Wang, with a Sanity Studio CMS setup for editing content without touching code.

## Public Website Hosting

This website is designed to be published with **GitHub Pages**.

Recommended public URL format:

```text
https://YOUR_GITHUB_USERNAME.github.io/the-art-of-moving/
```

If you later buy or connect a custom domain, it can become something like:

```text
https://chloewang.com
```

## Local Preview

You can still open the local file directly:

```text
file:///Users/chloe/Documents/website/index.html
```

For CMS testing, use a local server instead:

```bash
cd /Users/chloe/Documents/website
npm run start:site
```

Then open:

```text
http://127.0.0.1:4173
```

Once the site is deployed to GitHub Pages, Sanity CMS changes can appear automatically after publishing because the frontend reads published Sanity content in the browser. Until then, local `file://` previews may not reliably load CMS data because browser/CORS rules can block remote API requests.

## What Sanity CMS Will Let You Edit

The Sanity Studio admin dashboard includes:

- Home Page: hero title, signature name/logo text, subtitle, intro text, hero image
- About Me: biography, profile photos, interests, quotes
- Career Journey: company, role, time period, description, photos, display order
- Photo Wall Item: photo, caption, date, location, category, display order, featured toggle
- Travel Journal: title, cover image, gallery, location, date, short description, full text, display order
- Art and Inspiration: image, artist, title, note, category, display order
- Shanghai Life: daily-life text, main photo, coffee/citywalk/work notes, daily photos
- Motherhood: pregnancy/motherhood intro text, photo, topics
- Journal Note: short notes or essays
- Contact and Social Links: email, Instagram, LinkedIn, other links

## One-Time Setup

You need Node.js and npm installed.

This workspace currently has Node available, but npm was not available in my local tool environment. On your Mac, install Node from [nodejs.org](https://nodejs.org/) or use Homebrew:

```bash
brew install node
```

Then install project dependencies:

```bash
cd /Users/chloe/Documents/website
npm install
```

## Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/).
2. Create an account or log in.
3. Create a new project.
4. Use dataset name:

```text
production
```

5. Copy your Sanity `projectId`.
6. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

7. Edit `.env`:

```text
SANITY_STUDIO_PROJECT_ID=your_real_project_id
SANITY_STUDIO_DATASET=production
```

8. Edit `cms-config.js` and replace:

```text
YOUR_SANITY_PROJECT_ID
```

with the same real project ID.

## Open the CMS Dashboard

Run:

```bash
cd /Users/chloe/Documents/website
npm run dev
```

Then open:

```text
http://127.0.0.1:3333
```

This is your Sanity Studio admin dashboard.

## How to Log In

When Sanity Studio opens, it will ask you to log in with your Sanity account.

Only users added to your Sanity project can edit and publish content. You can manage users from the Sanity project dashboard.

## How to Upload or Replace an Image

1. Open the CMS dashboard.
2. Choose a section, for example `Photo Wall Item`, `Travel Journal`, `Home Page`, or `Shanghai Life`.
3. Click the image field.
4. Upload a new image from your computer.
5. Use the crop/hotspot tool if needed.
6. Add alt text or a caption.
7. Click `Publish`.

## How to Edit Text

1. Open the section you want to edit.
2. Change the text field, title, biography, description, note, or full text.
3. Click `Publish`.

The website keeps the current static text until Sanity has a published value for that section.

## How to Add a New Travel Note

1. Open `Travel Journal`.
2. Click `Create new`.
3. Fill in title, cover image, location, date, short description, and full text.
4. Add gallery images if useful.
5. Set `Display Order`.
6. Click `Publish`.

Lower display order numbers appear first.

## How to Add a Photo Wall Item

1. Open `Photo Wall Item`.
2. Click `Create new`.
3. Upload the photo.
4. Add caption, date, location, and category.
5. Turn on `Featured Photo` if you want it to appear larger.
6. Set `Display Order`.
7. Click `Publish`.

## How to Reorder Content

Most repeatable content has a `Display Order` field.

- `1` appears before `10`
- `10` appears before `20`
- Leave gaps between numbers so you can insert future items easily

Recommended pattern:

```text
10, 20, 30, 40
```

## How to Publish Changes

Sanity saves drafts first. Changes appear on the live website only after you click:

```text
Publish
```

If your website is deployed and connected correctly, published CMS changes should appear automatically after refresh. If the site uses Sanity CDN caching, changes may take a short moment to appear.

## How to Preview the Website Locally

Use a local server:

```bash
cd /Users/chloe/Documents/website
npm run start:site
```

Then open:

```text
http://127.0.0.1:4173
```

The direct `file://` URL is fine for static design previews, but the CMS API may work more reliably through `http://127.0.0.1:4173`.

## Allow the Website URL in Sanity

In Sanity project settings, add CORS origins for:

```text
http://127.0.0.1:4173
http://localhost:4173
```

After deployment, also add your public website URL, for example:

```text
https://chloewang.com
https://www.chloewang.com
```

## Deploying the CMS Dashboard

To deploy Sanity Studio as a hosted admin dashboard:

```bash
npm run deploy:studio
```

Sanity will give you a Studio URL. It can look like:

```text
https://the-art-of-moving.sanity.studio
```

If you want a custom admin domain such as:

```text
studio.chloewang.com
```

you can connect that later through your domain/DNS provider and Sanity hosting settings.

## Deploying the Website with GitHub Pages

The current website is static HTML/CSS/JS, so GitHub Pages can host it directly from the repository root.

### 1. Create a GitHub Repository

On GitHub, create a new repository named:

```text
the-art-of-moving
```

Recommended settings:

- Visibility: Public
- Do not add a README from GitHub, because this project already has one
- Do not add `.gitignore` from GitHub, because this project already has one

### 2. Push the Website Files

After creating the repository, GitHub will show commands similar to:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/the-art-of-moving.git
git branch -M main
git push -u origin main
```

Run those commands from:

```bash
cd /Users/chloe/Documents/website
```

### 3. Enable GitHub Pages

In GitHub:

1. Open the repository.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Click `Save`.

GitHub will generate a public URL like:

```text
https://YOUR_GITHUB_USERNAME.github.io/the-art-of-moving/
```

### 4. Verify the Online Website

After GitHub Pages finishes publishing, open the public URL and check:

- Navigation links scroll to the correct sections
- Images load correctly
- Google Fonts load correctly
- Mobile menu works
- Mobile layout has no horizontal scrolling
- Sanity fallback content still appears before CMS is configured

### 5. Keep Sanity Connected

After the website is public, add the GitHub Pages URL to Sanity CORS settings:

```text
https://YOUR_GITHUB_USERNAME.github.io
https://YOUR_GITHUB_USERNAME.github.io/the-art-of-moving
```

Then make sure `cms-config.js` contains your real Sanity project ID.

## Safe Future Code Updates

Before changing code:

1. Keep a backup of the project folder.
2. Do not edit generated `node_modules`.
3. Make content edits in Sanity whenever possible.
4. Use code only for layout, styling, new sections, or CMS schema changes.
5. After schema changes, run the Studio locally and check that the dashboard still opens.
6. Test the website locally before deploying.

## Important Notes

- Sanity content is stored in Sanity, not inside `index.html`.
- Uploaded images are stored in Sanity's asset system.
- The website has fallback static content, so it will still look beautiful even before Sanity is configured.
- CMS changes appear automatically only after the site is deployed or opened through a local server with Sanity CORS configured.
