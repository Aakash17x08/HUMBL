# Go-Humbl: Technical Specification & Architecture Document

![Go-Humbl Website UI Preview](./public/ui-preview.png)

## 1. Executive Summary
**Go-Humbl** is a modern, responsive web application engineered to deliver premium, nutrient-dense vegetarian bowls and healthy diet plans. Designed with cutting-edge frontend architecture, it boasts a buttery-smooth user experience, seamless animations, and high performance. It operates natively as a Single Page Application (SPA), ensuring instantaneous navigation and state persistance.

---

## 2. Technology Stack
The platform is built using a modern decoupled front-end architecture:

- **Core Framework**: React (v19.x) - Provides component-based architecture and reactive UI binding.
- **Build Tooling**: Vite (v8.x) - Ensures lightning-fast HMR (Hot Module Replacement) and optimized production bundles.
- **Routing**: React Router DOM (v7.x) - Handles client-side routing, preserving the SPA experience.
- **Styling Pipeline**: Tailwind CSS (v4.x) - A utility-first CSS framework enabling rapid, responsive UI development.
- **Icons**: Lucide React - A robust, consistent icon library replacing traditional SVG sprite sheets.
- **State Management**: React Context API (`CartContext`) combined with localized React Hooks (`useState`, `useEffect`).

---

## 3. High-Level Architecture Design

### 3.1. System Overview
The application follows a strictly modular React architecture separating Concerns into clearly defined namespaces: Pages, Components, Data, and Contexts. It executes solely on the client-side (CSR), rendering views dynamically based on user interaction. 

### 3.2. Directory Structure (`/src` Layer)
```text
src/
├── assets/            # Static media (Images, Vector Logos)
├── components/        # Reusable, stateless, and complex stateful components
│   ├── AuthModal.jsx  # Modular Authentication overlay component
│   ├── BMICalculator.jsx # Floating interactive BMI calculating tool
│   ├── Footer.jsx     # Global Footer
│   ├── Navbar.jsx     # Global Navigation with scroll spying 
│   └── ScrollToHash.jsx # Utility for Anchor Link hash routing
├── context/           # Global State Management Contexts
│   └── CartContext.jsx  # Holds Cart Object, addToCart, and Quantity reducers
├── data/              # Static Mock JSON/Data layer (if applicable)
├── pages/             # Route-level components mapping to specific URLs
│   ├── Home.jsx             # Hero Section / Landing
│   ├── Products.jsx         # Product catalog with categorical filters
│   ├── Cart.jsx             # Active session checkout cart
│   ├── About.jsx            # Brand mission statement
│   ├── Contact.jsx          # User inquiries and location data
│   ├── Subscription.jsx     # Recurring meal plan details
│   ├── Blogs.jsx, BlogPost.jsx # Content marketing domain
│   ├── FAQ.jsx, Terms.jsx, Privacy.jsx # Legal and Support pages
├── App.jsx            # Main Shell assembling the router and global layouts
├── main.jsx           # Application entry point binding React DOM
└── index.css          # Tailwind directives and CSS variables
```

---

## 4. Key Functional Modules

### 4.1. Global Cart Context (`CartContext`)
Engineered to allow scalable cart operations across the entire session lifecycle. 
- **State**: Array of `products` infused with dynamic `quantity` integers.
- **Methods**: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
- **Integrations**: `Navbar.jsx` natively computes and watches the `cartCount` badge. `Products.jsx` pushes values to this store while simultaneously triggering toast notifications automatically.

### 4.2. Scroll-Spy Navigation UI
The `Navbar.jsx` incorporates an advanced event-listener hook that maps `window.scrollY` iteratively against component anchor depths (`offsetTop`). This achieves seamless visual tracking on the navigation pill indicating the current viewpoint within the Single Page framework. 

### 4.3. Floating BMI Engine
A specialized diagnostic `BMICalculator.jsx` module is pinned globally.
- **Features**: Performs real-time mathematical operations to compute Body Mass Index, mapping the integer to defined health zones (Underweight, Normal, Overweight, Obese) using dynamic color-coding.

### 4.4. Authentication Module (`AuthModal.jsx`)
Features a customized backdrop modal controlling local session intents. Utilizes complex focus trapping and graceful transitions between `Sign Up` and `Login` logic states utilizing an independent controlled state variable inside `Navbar`.

---

## 5. UI / UX & Design System Guidelines

- **Typography**: Employs bold, italicized, and geometric typeface stacks for headers, providing an energetic, sporting, and premium feel. 
- **Color Palette Variables**:
  - Primary Brand Green: `#4B664B` or similar dark emerald hues mapping brand freshness.
  - Secondary Accents: Vibrant Pinks/Beiges enabling sharp, modern contrast points.
- **Glassmorphism Edge**: Modals, drop-down menus, and cart elements leverage `backdrop-blur` techniques mixed with transparent white layers to construct optical depth.
- **Micro-interactions**: Hover effects scale primary entities (like product cards, floating buttons) utilizing `transition-all` alongside precise `ease-in-out` timing functions (typically ranging between `300ms` and `700ms`).

---

## 6. Performance & Operational Standards

1. **Rendering Overheads**: Core components minimize re-renders by centralizing logic efficiently.
2. **Responsive Fluidity**: Follows a "Mobile-First" progressive enhancement methodology. Utility classes `sm:`, `md:`, `lg:`, `xl:` natively break layouts shifting grids and flex directions synchronously with viewport dimensional changes.
3. **Data Immutability**: React Context heavily conforms to immutable state handling during cart alterations to prevent destructive overwriting behaviors.

---

## 7. Version Control & Expansion Vectors
For future expansions, the logical boundaries defined here empower the following growth vectors:
- Replacing the mocked logic in `AuthModal` with an Identity Provider (e.g., Firebase Auth, Auth0).
- Expanding `CartContext` into a localized storage persistence handler or plugging it directly into a headless Stripe / Shopify API endpoint. 
- Generating dynamically routed blogs mapping to headless CMS models (Contentful, Sanity).
