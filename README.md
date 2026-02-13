# Gauge

**A study in high-fidelity engineering and "Digital Craftsmanship".**

Gauge is a modern e-commerce application built to bridge the gap between premium design aesthetics and robust software engineering. This project demonstrates a production-ready approach to building performant, type-safe, and interactive web applications using the latest React ecosystem tools.

---

## 🛠 Tech Stack

Built on a foundation of modern web standards, focusing on performance, scalability, and developer experience.

- **Core Framework**: [Next.js 15 (App Router)](https://nextjs.org/) - Leveraged for server-side rendering, SEO optimization, and file-system based routing.
- **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/) - Utilized for a utility-first, maintenance-friendly design system with the latest v4 engine.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Chosen for its minimalistic API and un-opinionated state management, avoiding context-provider hell.
- **Animation**: [Framer Motion](https://www.framer.com/motion/) - Implements complex, physics-based micro-interactions to enhance user feedback loops.
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) & [Zod](https://zod.dev/) - Ensuring end-to-end type safety and runtime schema validation.

---

## 🧩 Engineering Highlights

### Persistent State Management

The shopping cart state is managed via **Zustand** with middleware implementation.

- **Persist Middleware**: Automatically synchronizes the cart state with `localStorage`, ensuring user data persists across sessions and page reloads without hydration quantization errors.
- **Atomic Updates**: State logic is decoupled from UI components, allowing for clean, testable actions like `addItem`, `removeItem`, and `updateQuantity`.

### Dynamic Routing Architecture

Product navigation is handled through Next.js **Dynamic Routes** (`[slug]`).

- Generates unique, SEO-friendly URLs for individual product pages.
- Optimized data fetching patterns ensure product details are rendered efficiently on the server where possible.

### Type-Safe Validation

Form handling and data integrity are enforced using **Zod**.

- Schemas define the strict shape of expected data (typically for checkout flows or product entry).
- Eliminates entire classes of runtime errors by validating input at the boundary.

---

## ✨ Features

- **Persistent Cart System**: A fully functional cart that retains state seamlessly.
- **Micro-Interactions**: Subtle, purposeful animations (hover states, cart flyouts, button presses) that provide tactile feedback.
- **Responsive Layouts**: Pixel-perfect implementation across mobile, tablet, and desktop viewports.
- **Optimized Performance**: leveraging Next.js image optimization and code-splitting.

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone https://github.com/yourusername/gauge.git
    cd gauge
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Digital Craftsmanship

This project prioritizes **Digital Craftsmanship**—the intersection of engineering precision and visual design.

- **Intentional Whitespace**: Layouts are calculated to reduce cognitive load.
- **Physics-Based Motion**: Animations use spring physics rather than linear easing for a more natural feel.
- **Semantic HTML**: Accessible structure ensuring the application is usable by everyone.
