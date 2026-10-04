# Tech Stack — CleanMyFace

> Centralized technology decision record and source of truth before adding or changing project dependencies.

> Context: premium skincare / dermocosmetics paid-test website, currently homepage-focused. See `docs/PROJECT.md` and `docs/REQUIREMENTS.md`.

> Principle: **simple architecture + strong design system + excellent execution.** Keep the stack small, maintainable, and understandable by another developer or AI coding agent.

## Frontend

| Technology        | Status   | Purpose                                                                   |
| ----------------- | -------- | ------------------------------------------------------------------------- |
| React             | Required | Core UI framework and component architecture                              |
| TypeScript        | Required | Type safety and clearer component/data contracts                          |
| Vite              | Required | Frontend build tool and development environment                           |
| Styled Components | Required | Component-scoped styling with full control over the premium visual design |

Use Styled Components as the project's styling solution.

Do not introduce Tailwind CSS or another styling system unless explicitly approved.

## Backend

| Technology | Status      | Purpose                                                                         |
| ---------- | ----------- | ------------------------------------------------------------------------------- |
| Node.js    | Conditional | Server-side runtime only if a confirmed requirement needs backend functionality |
| Express    | Conditional | API/server framework only if a confirmed backend requirement needs it           |

**Current status: backend is not required for the paid-test homepage.**

Do not create an Express server or backend architecture unless the project requirements explicitly require it.

## Database

| Technology              | Status      | Purpose                                                           |
| ----------------------- | ----------- | ----------------------------------------------------------------- |
| PostgreSQL via Supabase | Conditional | Persistent application data when a confirmed requirement needs it |

**Current status: database is not required for the paid-test homepage.**

Do not introduce a database merely because it is available in the general technology stack.

## Authentication

| Technology    | Status      | Purpose                                                  |
| ------------- | ----------- | -------------------------------------------------------- |
| Supabase Auth | Conditional | Authentication for confirmed authenticated functionality |

**Current status: authentication is not required.**

Do not add authentication to the public marketing website unless explicitly required.

## Hosting

| Technology | Status                 | Purpose                |
| ---------- | ---------------------- | ---------------------- |
| Vercel     | Required compatibility | Deployment and hosting |

The application should remain compatible with Vercel deployment.

## Email

| Technology | Status      | Purpose                                                                  |
| ---------- | ----------- | ------------------------------------------------------------------------ |
| EmailJS    | Conditional | Client-side email submission for a confirmed contact/inquiry requirement |

Use EmailJS only if the final project requires a simple client-side inquiry/contact form.

Do not introduce an email service until the requirement is confirmed.

## Package Manager

**npm — Required**

Use npm consistently.

Do not introduce pnpm, yarn, Bun, or another package manager.

## Important Libraries

| Library           | Purpose     | Status                          | Reason                                                            |
| ----------------- | ----------- | ------------------------------- | ----------------------------------------------------------------- |
| React             | UI          | Required                        | Core frontend framework                                           |
| TypeScript        | Type safety | Required                        | Safer and clearer component/data contracts                        |
| Vite              | Build tool  | Required                        | Fast and simple React development/build environment               |
| Styled Components | Styling     | Required                        | Strong control over the premium visual system                     |
| GSAP              | Animation   | Optional — add only when needed | Advanced animation control when CSS/browser APIs are insufficient |
| Zod               | Validation  | Optional — add only when needed | Runtime validation for structured user input                      |

Do not install optional libraries simply because they are listed here.

The actual project requirement must justify the dependency.

### Current Dependency Policy

GSAP and Zod should **not** be added to `package.json` until a concrete requirement justifies them.

Likewise, do not add backend, database, authentication, or email dependencies unless the relevant functionality is actually required.

## Animation / Interaction Direction

CleanMyFace is a premium cosmetic brand, so the interface should support refined and purposeful motion:

* Subtle entrance animations
* Product reveal animations
* Scroll-based transitions where appropriate
* Smooth hover interactions
* Image/product transitions
* Elegant micro-interactions
* Refined page transitions where useful

Prefer **CSS transitions, CSS animations, and native browser APIs** for simple motion.

Use **GSAP only when advanced animation control provides meaningful value**.

Do not turn the website into an animation showcase.

Animation should support:

* Visual hierarchy
* Storytelling
* Product presentation
* Perceived quality
* Usability

Avoid:

* Excessive animation
* Unnecessary parallax
* Distracting effects
* Animation on every element
* Motion that harms performance
* Motion that negatively affects accessibility

If smooth scrolling is later required, evaluate whether **Lenis** provides enough value before adding it. Do not install it now.

## UI / UX Principles

The technology stack must support the following visual direction:

* Modern
* Premium
* Minimal
* Editorial
* Clean
* Sophisticated
* Cosmetic / skincare appropriate
* Strong typography
* High-quality product presentation
* Generous whitespace
* Clear visual hierarchy
* Refined motion
* Responsive design
* Mobile-first usability

Avoid:

* Generic SaaS styling
* Generic dashboard components
* Template-like layouts
* Excessive rounded cards
* Excessive gradients
* Excessive shadows
* Excessive glassmorphism
* Overuse of animations
* Unnecessary component libraries
* Tailwind CSS unless explicitly approved
* Large UI frameworks such as Material UI unless explicitly approved
* Duplicate styling systems
* Unnecessary dependencies

The premium appearance should come primarily from **design quality, typography, spacing, composition, imagery, color, hierarchy, and interaction design**, not from adding more libraries.

## Dependency Rules

Before adding any new npm dependency:

1. Check whether the requirement can be solved with existing dependencies.
2. Check whether native browser functionality is sufficient.
3. Determine whether the dependency provides meaningful value.
4. Prefer small, focused libraries over large frameworks.
5. Avoid duplicate libraries with overlapping functionality.
6. Do not install a library simply because it is popular or convenient.
7. Keep the dependency count intentionally small.
8. Update this document when an important new project dependency is approved.

Never silently install a new library because:

> "Let's install another library."

A dependency must have a clear technical reason.

## Before Implementing Features

Before implementing a feature:

1. Inspect the existing project structure.
2. Read `docs/TECH_STACK.md`.
3. Check the existing dependencies.
4. Determine whether the requirement can be implemented with the current stack.
5. Only introduce a new dependency when it provides clear value.

If a new dependency appears necessary:

* Investigate first.
* Explain why the existing stack is insufficient.
* Choose the smallest reasonable solution.
* Avoid introducing an entire framework when a focused library is sufficient.
* Update `docs/TECH_STACK.md` when the dependency becomes an approved project technology.

## Architecture Principle

Prefer:

> **Simple architecture + strong design system + excellent execution**

over:

> **Large architecture + many dependencies + unnecessary abstraction.**

The goal is a premium website, not a technically over-engineered application.

The stack should remain easy for another developer or AI coding agent to understand, modify, and maintain.

## Design-First Technology Principle

Technology must support the design, not dictate it.

For the CleanMyFace paid test, prioritize:

1. Visual quality
2. UX quality
3. Content hierarchy
4. Responsive behavior
5. Performance
6. Maintainability

Do not introduce a technology, library, animation, or architectural pattern merely because it is technically impressive.

The design should be able to stand on its own without relying on excessive effects or dependencies.

When choosing between two technically valid solutions, prefer the simpler solution unless the more complex option provides a meaningful improvement to the user experience or implementation quality.
