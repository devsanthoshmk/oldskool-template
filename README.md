# Oldskool e-commerce website template: Eleventy static site generator and Django storefront

Oldskool is an open source e-commerce frontend template that provides store layouts for Eleventy static site generation and Django web applications.

This e-commerce website template provides a complete frontend foundation for online retail shops, catalog sites, and digital storefronts. The repository contains two implementations: an Eleventy v3 static site generator workflow and a Django 5.1 server-rendered application. Both implementations share identical Bootstrap responsive layouts, Remixicon icons, and modular page templates.

The template provides 10 page layouts for the retail purchase journey: a homepage with a Swiper hero carousel, product catalog, individual product detail pages, shopping cart, multi-step checkout with shipping and payment forms, customer login, user registration, and password recovery.

## Architecture

The repository contains two distinct application directories alongside shared design assets:

- `eleventy/`: Static site generator implementation powered by Eleventy v3 and Nunjucks templates. It reads product data from JSON files and compiles HTML pages into the `dist/` directory.
- `templ-django/`: Server-rendered implementation powered by Django 5.1. It includes a `products` application that routes and renders storefront views via Django templates.

The storefront architecture consists of five core components:

- Modular templates: The base layout in `templates/base.html` defines the document head, navigation bar, and footer. Child templates extend `base.html` and fill the main content block.
- Static product detail pages: In Eleventy, `templates/product.html` uses Nunjucks pagination over `templates/data/product_details.json` to generate static product pages at `product/:id/index.html`.
- Client-side router: The script `static/assets/js/route.js` intercepts page navigation, fetches destination HTML via the fetch API, and updates the `#content` container without full page reloads.
- Dynamic catalog scripts: The script `static/assets/js/index.js` renders product cards from JSON data, displays price and availability badges, and manages catalog pagination.
- Asset bundle: CSS bundles `libs.bundle.css` and `theme.bundle.css`, JavaScript bundles `theme.bundle.js` and `vendor.bundle.js`, Remixicon fonts, and SVG payment icons live in `static/assets/`.

## Setup

### Eleventy setup

Eleventy requires Node.js 18 or higher. Install dependencies with npm:

```bash
cd eleventy
npm install
```

### Django setup

Django requires Python 3.10 or higher. Create a virtual environment, install requirements, and apply database migrations:

```bash
cd templ-django
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python templete/manage.py migrate
```

## Usage

### Run the Eleventy development server

Start the Eleventy local development server with hot reload:

```bash
cd eleventy
npm run serve
```

The site is available at `http://localhost:8080`.

### Build Eleventy static output

Compile all templates and copy static assets to the output directory:

```bash
cd eleventy
npm run build
```

Eleventy outputs static HTML and assets into the `eleventy/dist/` directory.

### Run the Django development server

Start the Django development server:

```bash
cd templ-django
source venv/bin/activate
python templete/manage.py runserver
```

The Django application is available at `http://127.0.0.1:8000/`.

### Available routes

Both implementations provide the following URL routes:

- `/`: Storefront homepage with hero slider and product grid
- `/product`: Product details view
- `/cart`: Shopping cart summary
- `/checkout`: Customer details and billing address form
- `/checkout-shipping`: Shipping method selection form
- `/checkout-payment`: Payment method selection form
- `/login`: User authentication login page
- `/register`: New customer registration page
- `/forgotten-password`: Password reset request page

## Configuration

### Eleventy configuration

The Eleventy build configuration lives in `eleventy/.eleventy.js`.

- Input directory: `templates`
- Includes directory: `includes`
- Output directory: `dist`
- Data directory: `data`
- Template engine: Nunjucks (`njk`)
- Passthrough copies: Copies CSS files, JavaScript bundles, fonts, images, SVGs, and `products.json` into `dist/`.
- Custom shortcodes:
  - `static`: Resolves static file paths and prepends `/static/`.
  - `comment`: Strips commented markup blocks during template rendering.

### Product data configuration

Product datasets reside in `eleventy/templates/data/`:

- `products.json`: Array of product objects containing title, brand, price, offer price, image URL, and status flags.
- `product_details.json`: Array of extended product records used by Eleventy pagination to generate individual product pages.
- `makeProducts.py`: Python generator script that reads `products.json` and creates `product_details.json`. Run this script to refresh product detail data:

```bash
cd eleventy/templates/data
python3 makeProducts.py
```

### Django configuration

The Django settings file lives in `templ-django/templete/templete/settings.py`.

- Application registry: `INSTALLED_APPS` includes `products` alongside standard Django modules.
- Database: `DATABASES` connects to SQLite at `BASE_DIR / 'db.sqlite3'`.
- Static files: `STATIC_URL` routes static asset requests to `products/static/`.
- URL routing: `templete/urls.py` mounts the `products` application at the root path.
