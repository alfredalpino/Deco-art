# Cursor AI Prompt for Deco-Art Furniture Online Store

**Project Title:**
Deco-Art Furniture — Modern Online Store for a Renowned Lucknow-Based Offline Brand

***

## Context

Deco-Art Furniture is an established offline retailer in Jagrani, Lucknow, specializing in all types of quality wooden furniture, including tables, dining sets, couches, sofa sets, beds, almirahs, drawers, shoe racks, and wooden racks. Renowned for offering the best market prices and exceptional customer service, Deco-Art now aims to bring its offerings online with a world-class digital experience.

***

## Core Requirements

### 1. **Platform Vision**

- Design and develop a comprehensive online store for Deco-Art Furniture.
- Prioritize a **mobile-first** approach with responsive and ultra-polished UI/UX, rivaling Amazon’s platform in smoothness and reliability.
- Ensure every user interface element and function works flawlessly; there must be **no broken flows** or buggy interactions.


### 2. **Product \& Admin Functionality**

- **Full-scale product integration**: All furniture SKUs, with detailed descriptions, specs, prices, images, and stock info.
- **Admin panel** (accessible via secure login): Add, update, or remove listings. Manage inventory, adjust prices, upload images, view and manage user queries and contact forms.
- **Admin authentication:** Secure the admin panel with robust username and password flow (bcrypt or Argon2 hashing mandatory).


### 3. **Performance \& Aesthetics**

- Ultra-fast performance, both for catalog browsing and interaction flows (search, filter, add-to-cart, checkout, etc.).
- Visually modern, minimal-yet-luxurious aesthetics: smooth animations, crisp typography, clear CTAs, and high-res gallery for products.
- Loading skeletons, transitions, and state feedback (spinners, toasts, modal confirmations) for a polished feel.


### 4. **Technological Stack**

- Use only the **latest stable releases** of all frameworks, libraries, and packages—no outdated or deprecated solutions.
- Recommendations:
    - **Frontend:** Next.js (latest), React Server Components, Tailwind CSS (or Mantine, Radix UI for accessibility/design systems)
    - **Backend:** Node.js (latest LTS), Next.js API Routes, or Express (choose if justified)
    - **Database:** PostgreSQL (preferred), SQL-based (MySQL as alternative) — for all product, cart, wishlists, user, and query/contact data
    - **ORM:** Prisma ORM (latest), for type-safe SQL interaction
    - **State management:** React context, Zustand, or Jotai (latest stable)
    - **Authentication:** NextAuth.js or Clerk/third-party (if open-source and up to date)
    - **Mail service:** Resend, Mailgun, or Sendinblue — choose the most affordable and easy-to-integrate service; set up transactional mail for contact queries, order confirmations, admin notifications.


### 5. **Core Features**

- **Product catalog:** Categories, filters, search, sorting, high-quality images, price and discount display.
- **Cart:** Session-based and user-based cart storage (sync with SQL DB), cart quantity editing, removal, and total calculation.
- **Wishlist:** Logged-in users can add/remove items; wishlists are saved to DB.
- **User accounts:** Sign-up, login, forgotten password (email reset flow), and profile management.
- **Contact/queries:** Robust contact form with email integration, submissions saved to SQL.
- **Checkout flow:** Cash on Delivery (COD) as initial payment mode; later provisions for online payment gateway.
- **Responsive Design:** Flawless mobile-first experience, fully functional on all screen sizes, tested across major devices.
- **SEO-ready:** All pages optimized for discoverability, including schema.org furniture markup.
- **Security:** All user data encrypted in transit and at-rest, with industry best practices for authentication and session management.

***

## Implementation Instructions

1. **Start with mobile design breakpoints and test at every stage.**
2. Scaffold with Next.js ver. 16 (latest, App Router). Use TypeScript for all code.
3. Set up PostgreSQL DB using Prisma ORM; define schema for product listings, cart, wishlist, user, admin, queries.
4. Build the admin panel as a protected route, accessible after login only.
5. Integrate mail services — both admin and user receive transactional emails.
6. Use the best UI frameworks for accessibility and animation polish (Radix UI/Mantine/Tailwind, Framer Motion).
7. Deploy code modularly; focus on performance and code-splitting.
8. Rigorously QA for **zero UI glitches** and fast interaction cycles.
9. Implement rigorous input validation, form sanitation, and SQL injection protection throughout.
10. Write maintainable, extensible code, with comments and README for future devs.

***

## Extras / Deliverables

- Full documentation, including initial setup, feature guides, admin panel usage, and deployment instructions.
- Staging and production deployment pipeline; recommend affordable, reliable hosting (e.g., Vercel, Railway, DigitalOcean).
- Testing suite covering all critical flows (Jest, Playwright/Cypress preferred).
- Beautiful touch-friendly interface demonstrations for top products.

***

**This prompt should be copy-pasted directly into Cursor AI. Do NOT include any outdated tech or incomplete instructions. The result should deliver a premium, production-ready online store reflecting the trusted Deco-Art Furniture brand.**

