# 🛍️ ShopHub - E-Commerce Platform

**Project Title:** ShopHub E-Commerce Platform  
**Tech Stack:** React, Vite, TailwindCSS, ShadCN, Node.js, Express, MongoDB, Cloudinary, TypeScript

---


---

## 🎯 Objective

**ShopHub** is a full-scale fashion e-commerce platform designed to deliver a seamless and modern shopping experience. It supports dual user roles:

- 👩‍💼 **Sellers (Clients):** Register and manage product listings
- 🛒 **Buyers (Users):** Browse, filter, wishlist, and purchase products

---

## 👥 User Roles & Functionalities

### 🧾 Seller (Client) Portal

#### Core Features
- Secure registration and login
- Add, edit, delete product listings
- Upload multiple product images via **Cloudinary**
- Product categorization: category, size, pricing, stock
- Access and manage customer orders
- Track order status
- Sales dashboard with:
  - Tabular product management
  - Filters & sorting
  - Charts and graphs for product performance insights

---

### 🛍️ Buyer (User) Portal

#### Core Features
- Email login support
- Browse all products
- Advanced filtering (category, size, price, latest)
- Product pages with sizes, images
- Wishlist and cart functionalities
- Secure checkout with payment integration 
- Order history & tracking

---

## 🧑‍💻 Tech Stack

| Layer        | Technology                             |
|--------------|-----------------------------------------|
| Frontend     | React, Vite, TailwindCSS, ShadCN, TypeScript |
| Backend      | Node.js, Express                        |
| Database     | MongoDB                                 |
| Auth         | JWT                             |
| Image Upload | Cloudinary                                |
| Styling UI   | TailwindCSS + ShadCN                    |
| Payment      | Razorpay           |

---

## 📁 Project Structure

```
shophub/
├── client/         # React + Vite frontend
├── server/         # Node.js + Express backend
├── public/         # Static assets
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DivyaP1063/shophub.git
cd shophub
```

### 2. Install Dependencies

**Frontend (client):**
```bash
cd client
npm install
```

**Backend (server):**
```bash
cd ../server
npm install
```

### 3. Start Development Servers

**Frontend:**
```bash
npm run dev
```

**Backend:**
```bash
npm run dev
```

> Make sure MongoDB is running and `.env` is correctly configured.

---

## 🔐 Environment Server Variables

Create a `.env` file in the server directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_API_KEY=your_api_key
RAZORPAY_API_SECRET=your_api_secret
```
## 🔐 Environment Client Variables

Create a `.env` file in the client directory with the following variables:

```env
VIYE_RAZORPAY_API_KEY=your_api_key
---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---