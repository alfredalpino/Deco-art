# Deco-Art Furniture - Online Store

A modern, full-featured e-commerce platform for Deco-Art Furniture, a renowned furniture retailer in Lucknow, India.

## 🚀 Features

- **Product Catalog**: Browse furniture by categories with filtering and search
- **Shopping Cart**: Session-based and user-based cart management
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure sign-up, login, and profile management
- **Admin Panel**: Complete product and order management system
- **Order Management**: Cash on Delivery (COD) checkout flow
- **Contact System**: Contact form with email notifications
- **Responsive Design**: Mobile-first, polished UI/UX
- **SEO Optimized**: Schema.org markup and meta tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Framer Motion
- **State Management**: Zustand
- **Email**: Resend
- **Validation**: Zod

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- PostgreSQL database
- Resend API key (for email functionality)

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/alfredalpino/Deco-art.git
cd Deco-art
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/deco_art?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:8080"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key-here"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:8080"
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 4. Set up the database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Or push schema directly (development)
npm run db:push
```

### 5. Create an admin user (optional)

You can create an admin user via Prisma Studio or by creating a script:

```bash
npm run db:studio
```

Or create a seed script to add an admin user.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## 📁 Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin panel
│   ├── products/          # Product pages
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions and configurations
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth configuration
│   └── utils.ts          # Helper functions
├── prisma/                # Prisma schema and migrations
│   └── schema.prisma     # Database schema
└── public/                # Static assets
```

## 🗄️ Database Schema

The database includes the following main models:

- **User**: Customer accounts
- **Admin**: Admin accounts
- **Category**: Product categories
- **Product**: Furniture items
- **Cart** & **CartItem**: Shopping cart
- **Wishlist** & **WishlistItem**: User wishlists
- **Order** & **OrderItem**: Order management
- **ContactQuery**: Contact form submissions

## 🔐 Authentication

- **User Authentication**: Email/password with NextAuth.js
- **Admin Authentication**: Username/password with secure bcrypt hashing
- **Session Management**: JWT-based sessions

## 📧 Email Integration

The app uses Resend for transactional emails:
- Order confirmations
- Contact form notifications
- Admin notifications

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Custom CSS variables for theming
- Responsive breakpoints (mobile-first)
- Smooth animations with Framer Motion

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Railway

1. Connect your GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio

## 🔒 Security Features

- Password hashing with bcrypt
- SQL injection protection (Prisma ORM)
- Input validation with Zod
- CSRF protection (NextAuth)
- Secure session management
- Environment variable protection

## 📱 Mobile-First Design

The entire application is designed mobile-first, ensuring excellent user experience on all devices:
- Touch-friendly interfaces
- Responsive navigation
- Optimized images
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👥 Support

For support, email info@decoartfurniture.com or visit the contact page.

---

Built with ❤️ for Deco-Art Furniture
