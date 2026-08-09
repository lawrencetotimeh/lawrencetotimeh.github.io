# lawrencetotimeh.com

Personal site. One page, no build step, no dependencies. Just `index.html`.

## Deploy on GitHub Pages

1. Create a new **public** repo named `lawrencetotimeh.github.io` (swap in your actual GitHub username).
   Using that exact name means the site lives at the root, not in a subfolder.
2. Upload `index.html` to the repo. Drag and drop on github.com works fine.
3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
4. Wait about a minute. The site is live at `https://YOURNAME.github.io`.

## Point your domain at it

1. Repo → Settings → Pages → **Custom domain** → enter `lawrencetotimeh.com` → Save.
   This creates a `CNAME` file in the repo. Leave it alone.
2. At your registrar, add these DNS records:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | YOURNAME.github.io |

3. Back in Settings → Pages, check **Enforce HTTPS** once it becomes available.
   DNS can take a few hours to propagate. That is normal.
4. For `lawrencetotimehjr.com`, set a domain forward at the registrar pointing to
   `lawrencetotimeh.com`. Do not add it as a second custom domain in GitHub.

## The contact form

GitHub Pages serves static files only. It cannot process a form submission.

Free fix:

1. Sign up at formspree.io.
2. Create a form. Copy the endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `FORM_ID` and replace it with your form ID.
4. Submit the form once yourself to confirm the email address.

## Before you launch

- [ ] Swap the three `.frame` placeholder blocks for real photos
- [ ] Add a headshot on the About section
- [ ] Replace `FORM_ID` in the form action
- [ ] Confirm the Liberia Forward link in the footer resolves
- [ ] Check it on your phone

## Photos

Drop images in an `/img` folder and replace a placeholder like this:

```html
<div class="frame"><span>Replace with...</span></div>
```

with:

```html
<img src="img/your-photo.jpg" alt="Describe what is in the photo" style="width:100%;display:block">
```

Keep files under about 400 KB each so the page stays fast.
