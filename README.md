# 🌬️ SafeGuard Air - Smart Air Quality E-Commerce Platform

**Project Title:** SafeGuard Air - Smart Air Quality Solutions Platform  
**Description:** A comprehensive e-commerce platform specializing in air purifiers, air quality monitors, and indoor air safety products with advanced landing page and product management features.

---

## 🎯 Objective

**SafeGuard Air** is a full-scale air quality e-commerce platform designed to deliver clean air solutions and a seamless modern shopping experience. The platform combines a beautiful landing page with robust e-commerce functionality, supporting dual user roles and specialized air quality product management.

### Key Features:

- 🏠 **Landing Page:** Interactive showcase with GSAP animations
- 🛒 **E-Commerce Platform:** Complete shopping experience
- 🌬️ **Air Quality Focus:** Specialized for air purifiers, monitors, and safety devices
- 📱 **Responsive Design:** Mobile-first approach with modern UI/UX
- 🔐 **Multiple Authentication:** Google OAuth, Email/Password, JWT

---

## 👥 User Roles & Functionalities

### 🧾 Seller (Client) Portal

#### Core Features

- ✅ Secure registration and authentication (Email/Password + Google OAuth)
- ✅ Add, edit, delete air quality product listings
- ✅ Upload multiple product images via **Cloudinary**
- ✅ Product categorization: air purifiers, monitors, filters, accessories
- ✅ Inventory management with stock tracking
- ✅ Order management and status tracking
- ✅ Advanced sales dashboard with:
  - Tabular product management
  - Advanced filters & sorting
  - Interactive charts and analytics
  - Performance insights

---

### 🛍️ Buyer (User) Portal

#### Core Features

- ✅ Multiple authentication options:
  - **Email/Password:** Traditional registration
  - **Google OAuth:** One-click social login
  - **JWT Tokens:** Secure session management
- ✅ Browse air quality products with advanced filtering
- ✅ Product filtering by: category, price range, brand, ratings
- ✅ Detailed product pages with specifications
- ✅ Wishlist and shopping cart functionality
- ✅ Secure checkout with **Razorpay** payment integration
- ✅ Order history and tracking
- ✅ User profile management with Google account integration

---

### 🎨 Landing Page Features

#### Interactive Components

- ✅ **Hero Section:** Dynamic banners with GSAP animations
- ✅ **Product Showcase:** Interactive product swiper
- ✅ **Scroll Effects:** Advanced scroll-triggered animations
- ✅ **BentoGrid Layout:** Modern grid-based content display
- ✅ **Certifications:** Trust badges and certifications
- ✅ **Newsletter:** Email subscription integration
- ✅ **Contact Form:** Telegram bot integration for inquiries

---

## 🧑‍💻 Tech Stack

| Layer          | Technology & Version                       |
| -------------- | ------------------------------------------ |
| **Frontend**   | React ^18.3.1, TypeScript ^5.6.2           |
| **Build Tool** | Vite ^5.4.10                               |
| **Styling**    | TailwindCSS ^3.4.14                        |
| **UI Library** | ShadCN/UI Components                       |
| **Animations** | GSAP ^3.12.8, Framer Motion                |
| **Backend**    | Node.js ^20.0.0, Express ^4.19.2           |
| **Database**   | MongoDB ^6.0                               |
| **Auth**       | JWT, Google OAuth 2.0, Passport.js         |
| **Storage**    | Cloudinary (Image & Video Upload)          |
| **Payment**    | Razorpay Integration                       |
| **Forms**      | React Hook Form, React International Phone |
| **Routing**    | React Router DOM ^6.28.0                   |
| **State**      | Redux Toolkit, React Query                 |
| **SEO**        | React Helmet ^6.1.0                        |

---

## 📦 Key Dependencies

### Frontend Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "^5.6.2",
  "vite": "^5.4.10",
  "tailwindcss": "^3.4.14",
  "@gsap/react": "^2.1.1",
  "gsap": "^3.12.8",
  "@reduxjs/toolkit": "^2.3.0",
  "@tanstack/react-query": "^5.59.16",
  "react-router-dom": "^6.28.0",
  "react-hook-form": "^7.53.1",
  "react-international-phone": "^4.3.0",
  "react-helmet": "^6.1.0",
  "lucide-react": "^0.454.0",
  "@google-cloud/local-auth": "^3.0.0",
  "google-auth-library": "^9.0.0"
}
```

### Backend Dependencies

```json
{
  "node": "^20.0.0",
  "express": "^4.19.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "cloudinary": "^2.0.0",
  "razorpay": "^2.9.0",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "express-session": "^1.17.3"
}
```

---

## 🔐 Authentication Features

### Multiple Authentication Methods

#### 1. **Google OAuth 2.0**

- ✅ One-click social login
- ✅ Secure Google account integration
- ✅ Auto-profile creation from Google data
- ✅ Seamless user experience

#### 2. **Email/Password Authentication**

- ✅ Traditional registration and login
- ✅ Password hashing with bcryptjs
- ✅ Email verification (optional)

#### 3. **JWT Token Management**

- ✅ Secure token-based sessions
- ✅ Automatic token refresh
- ✅ Role-based access control
- ✅ Session persistence

### Authentication Endpoints

```http
# Traditional Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

# Google OAuth
GET /api/auth/google
```

---

## 📁 Project Structure

```
Air_Quality/
├── components.json          # ShadCN UI components config
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML template
├── package.json            # Frontend dependencies
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.ts      # TailwindCSS configuration
├── tsconfig.app.json       # TypeScript app config
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript Node config
├── vite.config.ts          # Vite build configuration
├── backend/                # Backend API server
│   ├── package.json        # Backend dependencies
│   ├── README.md           # Backend documentation
│   ├── server.js           # Express server entry point
│   ├── agent/              # AI/Chatbot agent
│   │   ├── agent.json      # Agent configuration
│   │   ├── entities/       # NLP entities
│   │   └── intents/        # NLP intents
│   ├── config/             # Configuration files
│   │   └── razorpay.js     # Payment gateway config
│   ├── controllers/        # Route controllers
│   │   ├── authController.js       # Authentication logic
│   │   ├── cartController.js       # Shopping cart logic
│   │   ├── orderController.js      # Order management
│   │   ├── productController.js    # Product management
│   │   └── wishlistController.js   # Wishlist functionality
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/             # MongoDB models
│   │   ├── Cart.js         # Shopping cart schema
│   │   ├── Order.js        # Order schema
│   │   ├── Product.js      # Product schema
│   │   ├── User.js         # User schema
│   │   └── Wishlist.js     # Wishlist schema
│   └── routes/             # API routes
│       ├── auth.js         # Authentication routes
│       ├── cart.js         # Shopping cart routes
│       ├── orders.js       # Order management routes
│       ├── products.js     # Product routes
│       ├── webhookRoutes.js # Webhook handlers
│       └── wishlist.js     # Wishlist routes
├── public/                 # Static assets
│   ├── _redirects          # Netlify redirects
│   ├── favicon.png         # Site favicon
│   ├── placeholder.svg     # Placeholder images
│   ├── robots.txt          # SEO robots file
│   ├── sitemap.xml         # SEO sitemap
│   └── vite.svg            # Vite logo
└── src/                    # Frontend source code
    ├── App.css             # Global app styles
    ├── App.tsx             # Main App component
    ├── index.css           # Global CSS styles
    ├── main.tsx            # React entry point
    ├── vite-env.d.ts       # Vite type definitions
    ├── assets/             # Static assets (images, logos)
    │   ├── Bannerlarge.avif        # Hero banners
    │   ├── Bannermedium.avif
    │   ├── Bannersmall.avif
    │   ├── darkPrimaryLogo.avif    # Brand logos
    │   ├── HdarkLogo.avif
    │   ├── HlightLogo.avif
    │   ├── productImg.avif         # Product images
    │   ├── productImg2.avif
    │   ├── productImg3.avif
    │   └── ... (more assets)
    ├── components/         # Reusable UI components
    │   ├── AppSidebar.tsx          # Application sidebar
    │   ├── Authmodal.tsx           # Authentication modal
    │   ├── DashboardLayout.tsx     # Admin dashboard layout
    │   ├── Header.tsx              # Site header
    │   ├── OrderManagement.tsx     # Order management UI
    │   ├── ProductCard.tsx         # Product card component
    │   ├── ProductManagement.tsx   # Product management UI
    │   ├── Home/                   # Landing page components
    │   └── ui/                     # ShadCN UI components
    ├── contexts/           # React contexts
    │   └── AuthContext.tsx         # Authentication context
    ├── data/               # Static data files
    │   └── features.ts             # Feature configurations
    ├── hooks/              # Custom React hooks
    │   ├── use-mobile.tsx          # Mobile detection hook
    │   ├── use-toast.ts            # Toast notifications hook
    │   ├── useAppDispatch.ts       # Redux dispatch hook
    │   └── useAppSelector.ts       # Redux selector hook
    ├── lib/                # Utility libraries
    │   ├── api.ts                  # API client configuration
    │   ├── ScrollToTop.tsx         # Scroll to top utility
    │   └── utils.ts                # General utilities
    ├── pages/              # Page components
    │   ├── AboutUs.tsx             # About page
    │   ├── AddProduct.tsx          # Add product page
    │   ├── Admin.tsx               # Admin dashboard
    │   └── ... (more pages)
    ├── store/              # Redux store configuration
    ├── types/              # TypeScript type definitions
    └── ... (additional directories)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v20.0.0 or higher
- **npm:** v10.0.0 or higher
- **MongoDB:** v6.0 or higher
- **Git:** Latest version
- **Google Cloud Console Account:** For OAuth setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/safeguard-air.git
cd safeguard-air
```

### 2. Install Dependencies

**Frontend:**

```bash
npm install
```

**Backend (if separate):**

```bash
cd server
npm install
```

### 3. Google OAuth Setup

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API

#### Step 2: Create OAuth Credentials

1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
2. Set **Application type** to **Web application**
3. Add **Authorized JavaScript origins:**
   - `http://localhost:8080` (development)
   - `https://yourdomain.com` (production)
4. Add **Authorized redirect URIs:**
   - `http://localhost:8080/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback`

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
VITE_MONGODB_URI=your_mongodb_connection_string

# Authentication
VITE_JWT_SECRET=your_jwt_secret_key
VITE_SESSION_SECRET=your_session_secret

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary (Image Upload)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateway
VITE_RAZORPAY_API_KEY=your_razorpay_key
VITE_RAZORPAY_API_SECRET=your_razorpay_secret

# Telegram Bot (Contact Form)
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id

# URLs
CLIENT_URL=http://localhost:8080
SERVER_URL=http://localhost:5000
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

---

## 🛠️ Build & Deployment

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Build Optimization Features

- ✅ **Gzip Compression:** Reduces bundle size by ~70%
- ✅ **Code Splitting:** Automatic route-based splitting
- ✅ **Tree Shaking:** Removes unused code
- ✅ **Asset Optimization:** Image and font optimization
- ✅ **PWA Ready:** Service worker support

---

## 📱 Responsive Design

| Device Type | Breakpoint | Features                               |
| ----------- | ---------- | -------------------------------------- |
| **Mobile**  | < 768px    | Mobile-first design, touch-optimized   |
| **Tablet**  | 768-1024px | Adapted layouts, touch & mouse support |
| **Desktop** | > 1024px   | Full feature set, hover effects        |
| **Large**   | > 1440px   | Enhanced spacing and typography        |

---

## 🎨 Design System

### Color Palette

- **Primary:** `#07080e` (Dark Blue)
- **Secondary:** `#6b7280` (Gray)
- **Accent:** `#3b82f6` (Blue)
- **Success:** `#10b981` (Green)
- **Warning:** `#f59e0b` (Orange)
- **Error:** `#ef4444` (Red)

### Typography

- **Primary Font:** Exo 2
- **Secondary Font:** Poppins
- **Fallback:** System fonts

---

## 🔒 Security Features

- ✅ **Multiple Authentication Methods:**
  - JWT token-based authentication
  - Google OAuth 2.0 integration
  - Session-based authentication
- ✅ **Input Validation:** Client and server-side validation
- ✅ **SQL Injection Protection:** Parameterized queries
- ✅ **XSS Protection:** Content Security Policy
- ✅ **HTTPS Ready:** SSL/TLS support
- ✅ **Environment Variables:** Sensitive data protection
- ✅ **CORS Configuration:** Cross-origin request security
- ✅ **Rate Limiting:** API endpoint protection

---

## 📊 Performance Metrics

### Lighthouse Scores (Target)

- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 95+
- **SEO:** 100

### Bundle Analysis

- **Initial Bundle:** < 200KB gzipped
- **Lazy Loading:** Route-based code splitting
- **Image Optimization:** WebP format with fallbacks
- **Font Loading:** Optimized web fonts

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write unit tests for new features
- Update documentation for API changes
- Test authentication flows thoroughly

---

## 📝 API Documentation

### Base URL

```
Production: https://safeguard-air.com/api
Development: http://localhost:8080/api
```

### Authentication Endpoints

```http
# Traditional Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
DELETE /api/auth/logout

# Google OAuth
GET /api/auth/google
GET /api/auth/google/callback

# User Management
GET /api/auth/me
PUT /api/auth/profile
```

### Product Endpoints

```http
GET /api/products
GET /api/products/:id
POST /api/products (Auth required)
PUT /api/products/:id (Auth required)
DELETE /api/products/:id (Auth required)
```

---

## 🐛 Troubleshooting

### Common Issues

**1. GSAP Animations Not Working**

```bash
npm install gsap @gsap/react
```

**2. Tailwind Classes Not Applied**

```bash
npm run build
# Clear browser cache
```

**3. Environment Variables Not Loading**

- Ensure `.env` file is in root directory
- Restart development server
- Check variable names start with `VITE_`

**4. Google OAuth Not Working**

- Verify Google Cloud Console setup
- Check redirect URIs match exactly
- Ensure Google+ API is enabled
- Confirm CLIENT_ID and CLIENT_SECRET are correct

**5. Authentication Issues**

- Clear browser storage and cookies
- Check JWT token expiration
- Verify session configuration
- Test with different browsers

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google OAuth:** For seamless social authentication
- **GSAP:** For amazing animations
- **ShadCN:** For beautiful UI components
- **Tailwind CSS:** For efficient styling
- **Vite:** For blazing fast development
- **Cloudinary:** For image management
- **Razorpay:** For payment processing

---

**Made with ❤️ by SafeGuard Air Team**

For support, email us at: **support@safeguardair.com**

---
