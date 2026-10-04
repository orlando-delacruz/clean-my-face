# Architecture

> Current-state architecture for the CleanMyFace website test.
> Source of truth for implementation: the repository itself (verified October 2026).
> Context: `docs/PROJECT.md` (project context), `docs/REQUIREMENTS.md` (what is required).
> This document describes **what exists now**, not a future or ideal system. Nothing below invents frameworks, services, or flows.

## System Overview

The repository is a **pre-implementation workspace**: documentation plus static image assets. There is no running application.

- **What exists:** `docs/` (project context + requirements + this file) and `images/` (90 committed raster assets). No source code, no build, no deployment.
- **Major components:**
  1. `docs/PROJECT.md` — brand, ranges, scope, business rules, open issues.
  2. `docs/REQUIREMENTS.md` — confirmed homepage requirements (FR-1–FR-6), constraints, and open questions (OQ-1–OQ-10).
  3. `images/` — client-supplied product, ingredient/step/purpose, hero, background, and system imagery.
  4. External ~23-page brand brief — content source of truth, **not** committed to the repo.
- **How components communicate:** they do not communicate at runtime. There are no network calls, no client–server interaction, no build pipeline. The relationship is editorial: future homepage implementation (not started) will source copy from the external brief and visuals from `images/`, guided by `docs/`.
- **Overall architecture pattern:** none. No monolith, no client–server split, no static-site generator, no CMS, no layered backend. The closest description is **docs + unmanaged static assets, versioned in Git**.

## Architecture Diagram

Only layers that actually exist are shown. There is no frontend, API, backend, Supabase, or database to diagram.

```mermaid
flowchart LR
    subgraph repo["Git repo (develop)"]
        D1["docs/PROJECT.md"]
        D2["docs/REQUIREMENTS.md"]
        D3["docs/ARCHITECTURE.md"]
        IMG["images/ (90 rasters)"]
    end
    BRIEF[("External brand brief\n~23 pages, not in repo")]
    DEV["Designer / Developer\n+ AI coding agent"]
    DEV -->|"reads"| D1
    DEV -->|"reads"| D2
    DEV -->|"reads"| BRIEF
    DEV -->|"uses"| IMG
    IMPL(["Future homepage\nNOT IMPLEMENTED")]
    DEV -.->|"will build (no framework chosen)"| IMPL
    IMG -.->|"future input only"| IMPL
    BRIEF -.->|"future input only"| IMPL
```

Explicitly absent (do not diagram as present): browser runtime, React/frontend, API/backend, Supabase, PostgreSQL, auth provider, CDN/hosting, analytics, payments.

## Application Layers

### Presentation

- **Status:** not implemented.
- No frontend framework, router, pages, components, styles, or static-site output exists. Verified: no `src/`, `app/`, `pages/`, `components/`, `package.json`, or build config in the repo or in `git ls-files`.
- Important paths for future work (inputs, not code): `images/hero.png`, `images/bg-mage-1.jpg`, `images/bg-image-2.png`, `images/bg-image-3.png`, `images/6 products system*.jpg`, `images/additional-img-*.{jpg,png}`, and the 11 per-product folders under `images/`.
- Boundary: `images/` is a content input. Presentation code, when created, must reference these assets without treating asset folder names as approved product copy (see Constraints).

### Application

- **Status:** not implemented.
- No business logic, form handling, state management, routing guards, server actions, or edge functions exist.
- Per `docs/REQUIREMENTS.md` FR-3/FR-5/FR-6, the confirmed experience is a static, unauthenticated homepage flow with a non-transactional CTA section. No application layer is required by current scope.
- Boundary: no application code means no place for hidden business rules. All rules live in `docs/PROJECT.md` (Business Rules) and `docs/REQUIREMENTS.md` (BR-1–BR-6). Do not duplicate them into future code as invented behavior; implement only confirmed requirements.

### Data

- **Status:** no database, no CMS, no API data layer.
- The only in-repo "data" is the file system:
  - `docs/` — Markdown context (versioned).
  - `images/` — binary rasters (versioned directly in Git, no LFS, no `.gitattributes`).
- No Supabase project, no `supabase/` directory, no migration files, no `.env` files, no schema, no seeds. Verified by absence in root listing and `git ls-files`.
- The external brand brief is the canonical content source but is outside version control; treat it as read-only input and `docs/REQUIREMENTS.md` as the repo-local interpretation of what is confirmed vs. open.
- Boundary: `images/` and the external brief are **content sources**, not queryable stores. There are no read/write paths, no caching layer, and no data-validation layer to enforce.

## Data Flow

There are no runtime data flows.

- **Frontend → API/backend:** none. No frontend or API exists.
- **Backend → Supabase/database:** none. No backend, Supabase, or database exists.
- **Form submission:** none. FR-5 requires a CTA section with no conversion workflow; no form, POST, or data capture is implemented or required.
- **CRUD operations:** none. No create/read/update/delete paths of any kind.
- **Important read/write flows:** the only flows are author-time, not runtime:
  1. Author reads external brief + `docs/` → drafts homepage copy (future).
  2. Author references `images/` files → homepage visuals (future).
  3. Git versions `docs/` + `images/` → shared with reviewers/client.

No flow above involves a running system. Documenting any API or database flow would be invention.

## Authentication Flow

There is no authentication.

- No login, signup, session handling, token issuance/validation, refresh, logout, or password reset exists in the codebase.
- No protected routes, middleware, or server-side session checks exist.
- No Supabase Auth (or any auth provider) is configured; no auth SDK, callback route, or secret is present.
- This matches requirements: `docs/REQUIREMENTS.md` FR-3 states the primary flow completes with no login; FR-6 excludes authentication from scope.

If authentication is ever requested, it would be a new architectural addition requiring explicit client confirmation (currently OQ-5), not an extension of existing code.

## Authorization

There is no authorization to document. Authentication and authorization are distinct, and **neither** is implemented.

- No roles (admin, customer, editor) exist. The only "roles" in `docs/PROJECT.md` are project participants (client, designer/developer) and the unauthenticated Site Visitor — none are enforced by code.
- No permissions, policies, protected resources, or route guards exist.
- No Supabase RLS policies exist (no Supabase, no Postgres tables).
- No backend authorization checks exist (no backend).
- No frontend access restrictions exist (no frontend).

Boundary: do not interpret content rules (BR-1–BR-6, e.g. "keep ranges differentiated") as authorization rules. They are editorial constraints on copy and layout, enforced by review, not by code.

## External Integrations

No external technical integrations are present.

| Service | Status |
|---|---|
| Supabase (Auth, Database, Storage, Edge Functions, Realtime) | Not present. No config, SDK, or reference in tracked files. |
| Hosting / CDN / deployment target | Not present. No config or deployment docs. |
| Email, analytics, payments, booking, CMS, third-party APIs | Not present. All are explicitly out of scope per FR-6. |

Non-integration inputs (for clarity, not to be treated as services):

- **External brand brief (~23 pages):** read-only content source, supplied outside the repo. Consumed manually by authors; no API, sync, or webhook.
- **Human coordination via John Frederick J. Dimas:** project liaison, not a system integration.
- **`images/` rasters:** committed files, not a storage service or CDN.

Each future integration, if ever confirmed, would be a new dependency — not an extension of something already wired up.

## Module Boundaries

There are no code modules. The repo has three documentation/asset areas with the following ownership and boundaries:

- **`docs/PROJECT.md` — project context owner.** Owns brand narrative, range tables, scope in/out, business rules, status, and known brief inconsistencies. Other docs summarize it; they must not contradict it.
- **`docs/REQUIREMENTS.md` — requirement owner.** Owns confirmed vs. open status (FR/NFR/BR/CR/UX, OQ-1–OQ-10) and test wording. It is the reference for what a future implementation must/must not do. In particular, FR-4 + OQ-1 own the Plump It Up Step 02 naming conflict: the Step 02 slot/number/`Cleanse` role are confirmed; the displayed name is withheld until OQ-1 resolves, and internal labels must never render publicly.
- **`docs/ARCHITECTURE.md` (this file) — current-state technical owner.** Owns the accurate description of what is (and is not) implemented. It must not introduce new requirements or design proposals.
- **`images/` — asset input owner.** Owns supplied visuals only. It does not own product names, claims, or copy authority. Known boundary risks: folder/file names (e.g. `GEL CLEANSER/`, `HEARTLEAF CLEANSING OI`, `dry spot rescue balm`, `bg-mage-1.jpg`, `ingredient-` vs `ingredients-`) are filesystem labels, **not** approved copy — see Constraints.

Cross-boundary rules that must not be violated:

1. Docs must not be mistaken for implementation (no runtime behavior can be inferred from them).
2. Asset filenames must not be promoted to product copy without brief confirmation.
3. Future code must not add backend/auth/ecommerce/CMS behavior without explicit scope change (FR-6, OQ-3–OQ-5).

## Architectural Decisions

Only decisions evident from the current repo state are listed. Reasons are stated only where directly supported; otherwise only the observable fact and its consequence are given.

- **Decision: docs-first, no framework or scaffolding committed.**
  - Context: repo contains only `docs/PROJECT.md` (+ later `docs/REQUIREMENTS.md`) and `images/` across both `main` and `develop`; no code commits exist.
  - Consequence: maximum technology freedom for the homepage test, but zero shared scaffolding — every structural choice (framework vs. plain HTML, hosting, asset pipeline) is still open.
- **Decision: binary image assets committed directly to Git without LFS or `.gitattributes`.**
  - Observable: 90 rasters tracked in `git ls-files`, including multi-MB files (`RICE BARRIER CREAM MASK.png` ~2.4 MB, `bg-image-2/3.png` ~2.2 MB each, `hero.png` ~1.5 MB).
  - Consequence: simple checkout, but growing clone size and no binary-diff/optimization pipeline.
- **Decision: canonical brief kept outside the repo.**
  - Observable: `docs/PROJECT.md` states the ~23-page brief is external and not committed.
  - Consequence: repo stays lightweight, but brief revisions are not versioned alongside requirements — drift between brief and `docs/` must be caught by review.
- **Decision (requirements-level, recorded here for architectural awareness): static unauthenticated homepage, no backend.**
  - Context: `docs/REQUIREMENTS.md` FR-3/FR-6 and `docs/PROJECT.md` Out of Scope exclude ecommerce, auth, CMS, and transactions.
  - Consequence: no need for API, database, secrets, or session infrastructure in the current scope; adding any would be a scope change, not an incremental extension.

No further architectural rationale (e.g. why a particular framework was avoided) can be determined from the codebase, so none is claimed.

## Constraints

Only constraints relevant to the current system and its confirmed next step (a static homepage) are listed.

- **No runtime, toolchain, or hosting selected.** No `package.json`, lockfile, framework, or deployment config exists. Any choice must still satisfy the no-backend/no-auth scope (FR-6) unless scope changes.
- **Asset weight and format.** All 90 assets are rasters (PNG/JPG); several exceed 1 MB. A future homepage must account for optimization/resizing; the repo currently provides no pipeline for it.
- **Asset naming is unreliable as copy.** Spaces, `%`, `+`, mixed casing, singular/plural variants (`ingredient-` vs `ingredients-`, `step-` vs `purpose-`), a typo (`bg-mage-1.jpg`), and a truncated folder (`HEARTLEAF CLEANSING OI`) require sanitized/encoded paths and forbid treating filenames as approved text.
- **Missing brand identity package.** No logo, font, or color assets are in the repo (per `docs/PROJECT.md` Current Status); none may be invented — see OQ-6 in requirements.
- **Content blockers.** OQ-1 (Plump It Up Step 02 name: `Milky Cushion Cleanser` vs `GEL CLEANSER`) and OQ-2 (Stay Clear Step 02 description duplication) constrain final copy: per BR-2/BR-3/CR-5/FR-4, the Step 02 slot/number/role are preserved while the disputed name is omitted from public UI until confirmed.
- **Database/auth constraints:** none apply beyond absence — there is no schema, migration story, RLS model, or secret management because there is no data plane.
- **Security posture:** there is no attack surface in the repo (no server, no form, no secrets). The future static page inherits only standard static-hosting concerns; no auth/session/data-access hardening is applicable now.

## Known Technical Debt

No code-level debt exists (there is no code). The items below are repo-hygiene and content risks that affect the next implementation step. None are fixed by this document.

- **Large binaries without Git LFS / `.gitattributes`.**
  - Impact: every clone fetches full PNG/JPG history; future asset revisions bloat history further. Affected area: `images/` wholesale, especially `bg-image-*.png`, `RICE BARRIER CREAM MASK.png`, `hero.png`.
- **Inconsistent asset naming and casing.**
  - Impact: fragile imports, URL-encoding bugs (`%`, `+`, spaces), and temptation to copy filenames into UI copy. Affected area: `images/` folder/file names listed in Constraints.
- **Asset coverage gap: `SOFT PEELING GEL/` has no product hero shot.**
  - Impact: the 6-step Plump It Up presentation and any featured-product section must work around a missing hero image or request one; do not substitute an unrelated image as the product. (Observed: folder contains only `ingredients-*.png` + `purpose-*.png`.)
- **`docs/REQUIREMENTS.md` is uncommitted (untracked `??` status at time of writing).**
  - Impact: requirements are not yet shared versioned history alongside `docs/PROJECT.md`; a future agent or reviewer on a fresh clone/branch may miss them until committed.
- **External brief not versioned in repo.**
  - Impact: brief updates can silently diverge from `docs/REQUIREMENTS.md` and from asset expectations (already evidenced by OQ-1/OQ-2). Mitigation today is manual review only.
- **No chosen stack means repeated onboarding cost.**
  - Impact: each new contributor/agent must re-derive build, preview, and hosting answers (currently OQ-7/OQ-10). This is accepted pre-implementation overhead, not a defect, but it should be resolved with one explicit stack decision when implementation begins.
