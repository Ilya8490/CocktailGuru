Cocktail Guru

Note: The polished GitHub/portfolio README now lives in `README.md`. This file is preserved as the original phase planning brief and project concept reference.

Cocktail Guru is a frontend-focused portfolio project built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Zustand.

The application provides an immersive dark luxury experience where users can discover, explore, build, and save cocktails through an interactive builder, searchable library, persistent favorites, and responsive premium UI.

The primary focus of the project is premium UI, UX, animation, and frontend architecture.

⸻

Goals

Build a memorable portfolio project that demonstrates:

* React + TypeScript architecture
* Component composition
* Responsive design
* Advanced UI/UX
* Framer Motion animations
* State management
* Clean code organization
* Accessibility and performance

This project is frontend-only in the MVP phase.

⸻

Tech Stack

Core:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Framer Motion

State:

* Zustand

Storage:

* LocalStorage

Future:

* Backend
* MongoDB
* Authentication
* AI recommendations

⸻

Phase 0 — Design System & Visual Direction

Goal:

Define the visual identity before implementation.

Design Style

* Dark Luxury
* Art Deco
* Premium cocktail bar atmosphere
* Glassmorphism
* Warm golden accents
* Cinematic lighting
* Smooth transitions
* Premium typography

Color Palette — Burgundy Velvet

Background:
#131112

Surface:
#1E181A

Primary Burgundy:
#5B1F2A

Wine Accent:
#8B2E3E

Gold Accent:
#D6A354

Primary Text:
#F5F0EA

Secondary Text:
#AAA39E

Visual Principles

* Large photography
* Elegant typography
* Generous whitespace
* Rounded corners (16–24px)
* Thin golden borders
* Soft shadows
* Premium animations
* Rich gradients
* Glassmorphism

Inspiration

Reference images are visual inspiration only.

Inspired by:

* Four Seasons Hotel cocktail pages
* Bar Leone visual identity
* Vintage cocktail books
* Luxury hotel bars
* Art Deco posters

Do NOT copy layouts literally.

Create original layouts while preserving the premium atmosphere and visual quality.

Design Constraints

Avoid:

* Generic dashboard appearance
* Material UI style
* Bright colors
* Sharp corners
* Overcrowded layouts
* Heavy shadows

Prefer:

* Elegant serif headings
* Thin uppercase labels
* Rich burgundy gradients
* Gold accents
* Large imagery
* Cinematic atmosphere
* Premium spacing
* Smooth animations

Deliverable:

Consistent design language used across the entire application.

⸻

Project Structure

src/

components/

layout/

* Header
* Footer
* Navigation

builder/

* IngredientPanel
* IngredientCard
* MixingGlass
* TasteProfile
* ResultCocktail

cocktails/

* CocktailCard
* CocktailGrid
* CocktailFilters
* CocktailDetail

ui/

* Button
* Badge
* Modal
* PageTransition

pages/

* Home
* Builder
* Library
* Detail
* Favorites

hooks/

* useCocktailBuilder
* useFavorites

types/

* cocktail
* ingredient

data/

* cocktails
* ingredients

utils/

constants/

assets/

⸻

Phase 1 — Foundation

Goal:

Set up architecture and visual identity.

Tasks:

* Create Vite project
* Configure TypeScript
* Install Tailwind
* Configure React Router
* Create layout components
* Create typography system
* Create color system
* Build Home page

Deliverable:

Working landing page.

⸻

Phase 2 — Data Layer

Goal:

Create local data structures.

Tasks:

* Define TypeScript types
* Create ingredient data
* Create 25 cocktails
* Create utility functions

Deliverable:

Complete local data source.

⸻

Phase 3 — Library

Goal:

Allow browsing cocktails.

Tasks:

* Cocktail cards
* Search
* Filters
* Grid layout
* Responsive design

Deliverable:

Working library page.

⸻

Phase 4 — Builder

Goal:

Create the signature experience.

Tasks:

* Ingredient panel
* Drag-and-drop interactions
* Builder state
* Mixing glass component
* Cocktail matching logic

Deliverable:

Interactive cocktail builder.

⸻

Phase 5 — UX & Animation

Goal:

Add premium interactions.

Tasks:

* Framer Motion transitions
* Page transitions
* Micro interactions
* Animated taste profile
* Hover effects
* Premium motion

Deliverable:

Polished experience.

⸻

Phase 6 — Favorites

Goal:

Persist user data.

Tasks:

* Dedicated Zustand favorites store
* Safe LocalStorage persistence with `cocktail-guru-favorites`
* Ordered favorite metadata stored as `{ id, addedAt }`
* Add, remove, toggle, duplicate prevention, and clear actions
* Corrupted LocalStorage recovery and unavailable-storage safety
* `useFavorites` hook resolving favorite IDs into full cocktail data
* Reusable accessible FavoriteButton across cards, detail, and builder result
* Dedicated `/favorites` route with sorting, count, empty state, and animated removal
* Navigation badge with live favorite count
* Store, hook, page, and interaction tests

Deliverable:

Complete persistent Favorites system.

⸻

Responsive hardening

Goal:

Remove global layout overlap and overflow issues.

Completed:

* Display headings use safer clamp sizing and line-height
* Sections use stable padding, max-widths, and responsive wrapping
* Cards and grids use resilient minmax/flex layouts
* Library, Builder, Detail, Favorites, Header, Footer, and home sections were tightened for mobile
* Decorative Art Deco elements stay within section boundaries
* Browser-verified at 1440, 1024, 768, 430, and 390px with no horizontal page overflow

Deliverable:

Responsive app shell and page layouts.

⸻

Phase 7 — Responsive & Accessibility

Goal:

Production quality UX.

Tasks:

* Mobile layouts for Home, Builder, Library, Detail, and Favorites
* Keyboard-accessible Header and mobile navigation
* Escape key support and focus restoration for the mobile menu
* Escape key support and safe focus handling for mobile filters
* Keyboard fallback for Builder ingredient selection and removal
* Visible gold focus styles across links, buttons, filters, cards, and builder controls
* Semantic buttons and links for interactive controls
* ARIA labels, expanded states, current-route states, and screen-reader helper text where useful
* Reduced-motion support for buttons, cards, builder results, hero imagery, and decorative motion
* Touch target hardening for mobile controls
* Browser-verified at 320, 390, 430, 768, 1024, and 1440px across key routes
* TypeScript, lint, test suite, and production build passing

Deliverable:

Production-quality responsive and accessible application.

⸻

Phase 8 — Polish

Goal:

Portfolio-ready application.

Tasks:

* Loading states
* Empty states
* Error states
* Screenshots
* Deployment
* README improvements

Deliverable:

Finished portfolio project.

⸻

Main User Flow

Home

↓

Start Mixing

↓

Choose ingredients

↓

Drag ingredients into the glass

↓

Animated mixing

↓

Taste profile updates

↓

Cocktail Guru suggestion

↓

View recipe

↓

Save to favorites

⸻

Coding Principles

* TypeScript strict mode
* Reusable components
* Mobile-first design
* Accessibility first
* Performance conscious
* Composition over duplication
* Shared constants
* Consistent naming
* Clean architecture

⸻

Non Goals

Do not implement during MVP:

* Authentication
* Backend
* Payments
* Admin dashboard
* External APIs

These belong to future versions.

⸻

Final Objective

Create a visually impressive portfolio project that demonstrates strong frontend engineering skills, premium UI design, polished UX, attention to detail, and memorable interactions.
