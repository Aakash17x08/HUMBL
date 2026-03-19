# Frontend Setup and Architecture Documentation

This document summarizes the steps taken to implement the new navigation system and establish a clear, maintainable file structure for the **Humbl** application.

## 1. Goal
The primary objective was to set up client-side routing and implement a responsive, modern Navigation bar (`Navbar`) to seamlessly switch between different pages without reloading the application. Additionally, we transitioned away from the default Vite boilerplate into a structured, scalable application directory blueprint.

## 2. Dependencies Installed
To achieve this, we added the following packages:
- **`react-router-dom`**: Used for client-side routing structure (`BrowserRouter`, `Routes`, `Route`, `NavLink`).
- **`lucide-react`**: Used for lightweight, scaleable SVG icons (e.g., Hamburger Menu `Menu` and Close `X` icons for mobile responsiveness).

## 3. Directory Structure
We established a standard, modular React directory structure. Instead of having all files clumped in `src/`, logic is separated by concern:

```bash
src/
├── assets/                  # Static files (images, SVGs)
├── components/              # Reusable UI components
│   └── Navbar/              
│       ├── Navbar.jsx       # Main navigation bar component
│       └── Navbar.css       # Styles scoped specifically to the Navbar
├── pages/                   # Top-level page components representing valid routes
│   ├── Home.jsx             # Home page (/)
│   ├── About.jsx            # About page (/about)
│   ├── Blogs.jsx            # Blogs page (/blogs)
│   ├── Contact.jsx          # Contact page (/contact)
│   ├── Products.jsx         # Products page (/products)
│   └── Subscription.jsx     # Subscription page (/subscription)
├── App.jsx                  # The main application layout where all Routes are defined
├── App.css                  # Global layout constraints and page container styling
├── index.css                # Global CSS reset, typography, and variable definitions (Inter font)
└── main.jsx                 # The application entry point
```

### Why this structure?
- **Separation of Concerns**: UI elements that will be reused across different views go into `/components`. Entire screens go into `/pages`.
- **Maintainability**: If styling for the Navbar needs to be changed, you instantly know to check `components/Navbar/Navbar.css` instead of digging through a highly cluttered `index.css`.

## 4. Implementation Details

### `App.jsx`
- We wrapped the entire application inside a `<Router>` component.
- The `<Navbar />` is placed *outside* of the `<Routes>` block so it renders persistently across every page.
- The `<Routes>` definition maps specific URL paths to their corresponding `Page` components.

### `Navbar.jsx`
- Designed adhering to **Glassmorphism** styling for a clean, premium modern aesthetic.
- The active link logic is achieved using `<NavLink>` from `react-router-dom`. When a user clicks a nav item, it dynamically highlights it to indicate the active page.
- **Mobile Responsiveness**: Uses a local component state (`isOpen`, `setIsOpen`) to toggle a full-screen blurred menu overlay on screens under `960px`.

### `index.css` & `App.css`
- Reset the standard CSS, integrated the `Inter` font family from Google Fonts.
- Set up a standard `.page-container` CSS class that applies a consistent maximum width, padding, and subtle fade-in animation to all new pages.

## 5. How to Add a New Page
If you ever want to add a new page (e.g., a "FAQ" page):
1. **Create the file**: Create `FAQ.jsx` inside the `src/pages/` folder.
2. **Export a React component**: Use the default boilerplate and wrap the content in `<div className="page-container">`. 
3. **Add the Route**: Open `src/App.jsx`, import your new `FAQ.jsx` file, and add `<Route path="/faq" element={<FAQ />} />` to the `<Routes>` section.
4. **Update the Navbar**: Open `src/components/Navbar/Navbar.jsx` and add a new `<NavLink to="/faq">FAQ</NavLink>` in the `<ul className="nav-menu">`.

## 6. How to Run
Ensure you have the dependencies installed:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
