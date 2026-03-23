# 🥗 HUMBL | Premium Vegetarian Cloud Kitchen Platform

![HUMBL Banner](https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1200)

## 📋 Table of Contents
1. [Introduction](#-introduction)
2. [Key Features](#-key-features)
3. [Technical Stack](#-technical-stack)
4. [Project Architecture](#-project-architecture)
5. [Directory Structure](#-directory-structure)
6. [Design System](#-design-system)
7. [Navigation & Routing](#-navigation--routing)
8. [Installation & Setup](#-installation--setup)

---

## 🚀 Introduction
**HUMBL** is a state-of-the-art web application designed for a premium vegetarian cloud kitchen. The platform offers a seamless user experience, allowing customers to explore menu categories, read high-impact blog posts, and subscribe to recurring meal plans. The project prioritizes high-end aesthetics, micro-animations, and smooth navigation.

---

## ✨ Key Features
- **Dynamic Hero Section**: Interactive product carousel with real-time nutritional macro data.
- **Advanced Menu Filtering**: Sidebar-driven product categorization for Açaí Bowls, Salads, and Smoothies.
- **Subscription Engine**: 3-tier pricing model (Day, Week, Month) with highlighted "Most Popular" options.
- **Smart Hash Navigation**: Custom-built smooth scroll synchronization that updates the URL in real-time.
- **Content-Rich Blogs**: Dedicated blog parsing and viewer for "Health & Wellness" articles.
- **Responsive Legal Pages**: Fully stylized FAQ, Terms & Conditions, and Privacy Policy.
- **Professional Contact System**: Modern, input-validated contact form with direct cloud kitchen location details.

---

## 🛠 Technical Stack
- **Frontend Framework**: [React.js](https://reactjs.org/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/) (Fast HMR)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern utility-first architecture)
- **Icons**: [Lucide React](https://lucide.dev/) (Lightweight, vectoricons)
- **Routing**: [React Router Dom v6](https://reactrouter.com/) (Declarative navigation)
- **Typography**: [Google Fonts](https://fonts.google.com/) (Outfit & Lexend)

---

## 🏗 Project Architecture

### Component-Based Design
The project follows an atomic design pattern where common UI elements are decoupled from page-level logic. This promotes reusability and scalability.

### State Management
- **Local State**: `useState` is used for category filtering, menu toggling, and slider indices.
- **Side Effects**: `useEffect` handles scroll events, hash monitoring, and dynamic styling (e.g., sticky navbar).

---

## 📂 Directory Structure
```text
HUMBL/
├── src/
│   ├── assets/             # Brand logos and static images
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Sticky navigation with hash-link logic
│   │   ├── Footer.jsx      # Comprehensive sitemap and contacts
│   │   └── ScrollToHash.jsx # Smooth scroll sync utility
│   ├── data/               # Static datasets (blog posts, etc.)
│   ├── pages/              # Main route-level components
│   │   ├── Home.jsx        # Landing page & Hero section
│   │   ├── Products.jsx    # Categorized menu grid
│   │   ├── About.jsx       # Branding & Story collage
│   │   ├── Subscription.jsx # Pricing & Plans table
│   │   ├── Blogs.jsx       # Blog index
│   │   ├── BlogPost.jsx    # Individual article viewer
│   │   └── Contact.jsx     # Interaction form
│   ├── App.jsx             # Root router configuration
│   └── index.css           # Tailwind theme & Global animations
├── public/                 # Static assets (fonts, icons)
└── package.json            # Configuration & Dependencies
```

---

## 🎨 Design System
The design is built on a custom color palette defined in the `index.css` `@theme` block:

| Color | CSS Variable | Hex | Usage |
|---|---|---|---|
| **Pink** | `--color-brand-pink` | `#f9a8b3` | Primary CTA, Highlights |
| **Green** | `--color-brand-green` | `#37533b` | Navbar, Footer, Bold Text |
| **Beige** | `--color-brand-beige` | `#fee5e7` | Light Backgrounds, Cards |
| **Dark** | `--color-brand-dark` | `#1e2e21` | Body Text, Secondary Buttons |

### Typography
- **Headlines**: `Outfit` (Bold, Modern, Geometric)
- **Body**: `Lexend` (Enhanced Readability, Professional)

---

## 🧭 Navigation & Routing
HUMBL utilizes a hybrid navigation model:
1. **Route-Based**: Traditional URL paths for separate pages (`/faq`, `/blog/:id`, `/privacy`).
2. **Hash-Based**: Deep-link navigation for the Home page sections (`/#products`, `/#subscription`).

### Navigation Helper (`ScrollToHash.jsx`)
A custom component listens to location changes and automatically triggers a smooth scroll to the correct ID. It includes a `window.history.pushState` trigger in the `Navbar` to ensure that clicking links while already on the home page correctly updates the URL without page reloads.

---

## 💻 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

### 👤 Contact Information
For technical queries or collaboration, contact the HUMBL development team:
- **Email**: hello@humblfoods.com
- **Website**: [www.humblfoods.com](https://www.humblfoods.com)
- **Phone**: +91 123 456 789

---
*Generated by the HUMBL IT Documentation Team.*
