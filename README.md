# Ezhilventhan Kulandaivel | Portfolio

A static portfolio site (plain HTML, CSS, and JavaScript). No build step and no dependencies.

## Files

```
index.html
assets/
  css/style.css
  js/main.js
  resume/
    Ezhilventhan_Kulandaivel_Data_Analyst_Resume.pdf
    Ezhilventhan_Kulandaivel_Data_Scientist_Resume.pdf
```

## Put it on GitHub Pages (replace the old site)

1. Open your portfolio repository on github.com (the one behind `ezhil-14.github.io/ezhilventhan_portfolio`).
2. Delete the old files (open each file, click the trash icon, commit). Do this for the old `index.html`, any old CSS or JS, and the old `resume.pdf`.
3. Click **Add file > Upload files**. Drag in the **contents** of this folder (`index.html` and the `assets` folder), not the folder itself. Commit.
4. Go to **Settings > Pages**. Under "Build and deployment", choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
5. Wait one or two minutes, then open `https://ezhil-14.github.io/ezhilventhan_portfolio/`. If you still see the old page, hard refresh (Ctrl+Shift+R).

All links are relative, so the site works at that address with no changes.

## Updating things later

- **Resume:** replace the two PDFs in `assets/resume/` and keep the same file names.
- **Project text:** edit the `<article class="project">` blocks in `index.html`.
- **Project links:** to add a GitHub link to a project, add this line inside its `<article>`:
  `<p><a href="https://github.com/YOUR-NAME/YOUR-REPO" target="_blank" rel="noopener noreferrer">View code</a></p>`
- **Colors:** change the values at the top of `assets/css/style.css`.
- **Contact form:** it opens the visitor's email app with the message filled in. GitHub Pages cannot send email by itself.
