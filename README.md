# cloudflareweb

Dev web project for Cloudflare training deployment.

## SecureTech Solutions

Static business website for a fictional cybersecurity and cloud consulting company.

## Project Files

- `index.html` - Page structure and website content
- `style.css` - Responsive layout and visual styling
- `script.js` - Mobile navigation, form validation, and canvas animation
- `src/index.js` - Cloudflare Worker dynamic API for Workers Static Assets
- `wrangler.jsonc` - Cloudflare Workers deployment configuration
- `.assetsignore` - Prevents server/config files from being published as public assets
- `functions/api/status.js` - Dynamic Cloudflare Pages health-check API
- `functions/api/contact.js` - Dynamic Cloudflare Pages contact form API

## Run Locally

Open `index.html` directly in a browser to preview the static page. The dynamic API routes run after deployment to Cloudflare Workers or Cloudflare Pages.

Dynamic routes:

- `GET /api/status`
- `POST /api/contact`
- `POST /api/ai`

The OpenAI demo route uses a Cloudflare secret. The preferred secret name is:

- `OPENAI_API_KEY`

For compatibility with the current Cloudflare dashboard setup, the Worker also checks:

- `OpenAI API`

## Cloudflare Pages Notes

This project is suitable for Cloudflare Pages testing:

- DNS
- SSL/TLS
- WAF
- Caching
- Performance optimization

For Cloudflare Pages, connect the GitHub repository and use:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`

Cloudflare Pages will detect the `functions/` directory and deploy the API routes as Pages Functions.

## Cloudflare Workers Notes

This repository also supports Cloudflare Workers Static Assets. The Worker configuration in `wrangler.jsonc` runs `src/index.js` for `/api/*` routes and serves the root website files as static assets.

Use this URL pattern after deployment:

- `https://your-worker-subdomain.workers.dev/api/status`
