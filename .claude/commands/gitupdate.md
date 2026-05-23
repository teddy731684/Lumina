Perform a full GitHub update for this project. Work through each step in order and report what you did at the end.

## 1. Secrets scan

Before touching git, scan the working tree for secrets. Check every non-binary file (exclude `.git/`) for:
- Hardcoded passwords or tokens (patterns: `password\s*=`, `token\s*=`, `secret\s*=`, `api_key\s*=`, `Authorization:`, `Bearer `)
- Private keys (`-----BEGIN`)
- Hardcoded email addresses that aren't the public contact email `teddy01190@gmail.com`
- Any `.env` file or file ending in `.key`, `.pem`, `.p12`, `.pfx`

If you find anything suspicious, stop and report it to the user before continuing. Do not commit or push until the user confirms it is safe.

## 2. README

Check whether `README.md` exists and is up to date with the current feature set. The README must follow this structure (matching the ai-cms reference style):

1. **Title** — `# Project Name`
2. **Badge row** — shields.io badges for each technology + a Live Demo badge
3. **One-line tagline** — plain sentence below badges
4. **Live demo link** — `🌐 **Live demo:** [url](url)`
5. **About** — 2–3 paragraph executive summary of what the site does and its engineering highlights
6. **Features** — `## Features` with `### Subsection` headers and bullet lists using **bold** keywords
7. **Tech Stack** — `## Tech Stack` table with columns `Layer | Technology`
8. **Architecture** — `## Architecture` ASCII box diagram showing how the three files relate
9. **Development** — `## Development` with the `npx serve .` command and explanation
10. **License** — `## License` footer

If the README is already correct and current, leave it unchanged. If it needs updating, rewrite only the sections that are stale — do not change sections that are accurate. Use the Edit tool for targeted updates or Write for a full rewrite only if most sections are wrong.

## 3. GitHub Actions — Pages deployment

Check that `.github/workflows/deploy.yml` exists and deploys the site to GitHub Pages on every push to `main`. The workflow must:
- Trigger on `push` to `main` and `workflow_dispatch`
- Use `peaceiris/actions-gh-pages@v4` with `publish_dir: .`
- Exclude `.github` and `CLAUDE.md` from the published output via `exclude_assets`
- Never hard-code secrets — use `${{ secrets.GITHUB_TOKEN }}` only

If the file is already correct, leave it unchanged.

## 4. Commit and push

Stage only tracked/relevant files — never use `git add -A` blindly. Explicitly add:
- `index.html`, `style.css`, `script.js`
- `README.md`
- `.github/workflows/deploy.yml`
- Any other source files the user has changed

Do NOT stage:
- `.env` files
- Files containing secrets found in step 1
- `CLAUDE.md` (internal tooling, not public)
- Image files unless the user explicitly included them
- `Q1. Interior Design .png`, `Q2. Form Filler.png` (scratch files)

Write a concise conventional commit message: `feat:`, `fix:`, `docs:`, or `chore:` prefix as appropriate.

Push to `origin main`.

## 5. Update repo About

After a successful push, run:

```
gh repo edit --description "<one-sentence description>" --homepage "https://teddy731684.github.io/Lumina/" --add-topic "html" --add-topic "css" --add-topic "javascript" --add-topic "landing-page" --add-topic "portfolio"
```

Derive the description from the README tagline. If `gh` is not authenticated or the command fails, report the error and the command the user can run manually — do not abort the whole workflow.

## 6. Final report

Print a short summary:
- Secrets found: yes / no
- README: updated / unchanged
- Workflow: updated / unchanged
- Commit SHA pushed
- Repo About: updated / skipped (with reason)
- Live site URL
