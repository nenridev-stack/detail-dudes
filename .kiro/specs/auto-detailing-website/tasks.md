# Implementation Plan: Auto Detailing Website

## Overview

A production-ready, motion-rich marketing and booking website for a USA-based auto detailing business. Built with Next.js 14 (App Router, TypeScript), Tailwind CSS, shadcn/ui, Framer Motion, Resend, and n8n webhook integration. The build order prioritizes foundational design system, shared layout, then pages in order of business importance (booking flow first), followed by SEO and mobile QA passes.

## Tasks

- [x] 1. Project setup and design system foundation
  - [x] 1.1 Initialize Next.js 14 project with App Router, TypeScript, Tailwind CSS, and install dependencies (shadcn/ui, framer-motion, zod, resend, vitest, fast-check, @testing-library/react)
    - Create `next.config.js` with images.remotePatterns config
    - Create `.env.example` with N8N_WEBHOOK_URL, RESEND_API_KEY, NEXT_PUBLIC_BUSINESS_NAME
    - Configure `tailwind.config.ts` with custom colors, fonts, and animation utilities
    - Set up `src/styles/globals.css` with Tailwind directives and CSS custom properties
    - Configure Vitest in `vitest.config.ts` with jsdom environment and path aliases
    - _Requirements: 15.1, 15.3, 15.4_

  - [x] 1.2 Create TypeScript types, constants, and data layer
    - Create `src/types/index.ts` with all interfaces (VehicleSize, ServicePackage, AddOn, Review, GalleryItem, FAQCategory, ContactFormData, BookingPayload, BookingResponse)
    - Create `src/lib/constants.ts` with service packages, pricing, add-ons, and vehicle data
    - Create `src/data/services.ts`, `src/data/reviews.ts`, `src/data/gallery.ts`, `src/data/faq.ts` with placeholder data
    - _Requirements: 3.1, 3.2, 3.3, 8.1, 8.4, 4.1, 9.2_

  - [x] 1.3 Create validation schemas and utility modules
    - Create `src/lib/validation.ts` with Zod schemas (bookingSchema, contactFormSchema, vehicleSizeSchema, contactSchema)
    - Create `src/lib/pricing.ts` with `calculateEstimate()` function
    - Create `src/lib/env.ts` with environment variable validation (fail build on missing vars)
    - Create `src/lib/email.ts` with Resend email wrapper
    - Create `src/lib/webhook.ts` with n8n webhook client (10s timeout, AbortController)
    - _Requirements: 5.8, 5.10, 5.11, 6.1, 10.1, 10.5, 15.5_

  - [x] 1.4 Create motion design system and shared animation components
    - Create `src/lib/motion-config.ts` with spring configs, animation variants, and hover effects
    - Create `src/components/motion/ScrollReveal.tsx` (IntersectionObserver + Framer wrapper, 20% threshold, once)
    - Create `src/components/motion/StaggeredGrid.tsx` (orchestrated stagger container, 100ms delay)
    - Create `src/components/motion/ParallaxLayer.tsx` (useScroll + useTransform)
    - Create `src/components/motion/MagneticButton.tsx` (mouse-tracking magnetic effect)
    - Create `src/components/motion/CountUp.tsx` (animated number counter on scroll)
    - Create `src/components/motion/TiltCard.tsx` (3D perspective tilt on mouse move)
    - Create `src/components/motion/TextReveal.tsx` (character-by-character animation)
    - Create `src/components/motion/SlideIn.tsx` (directional slide entrance)
    - Create `src/components/motion/GestureCarousel.tsx` (drag/swipe carousel with momentum)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [x] 1.5 Create accessibility hooks
    - Create `src/hooks/useReducedMotion.ts` (prefers-reduced-motion detector)
    - Create `src/hooks/useInView.ts` (IntersectionObserver hook)
    - Create `src/hooks/useMediaQuery.ts` (responsive breakpoint hook)
    - _Requirements: 12.4, 16.3_

  - [ ]* 1.6 Write property tests for validation and pricing modules
    - **Property 5: Price Calculation Correctness** — verify `calculateEstimate(vehicleSize, package, addOns)` equals `package.pricing[vehicleSize] + sum(addOn prices)` for arbitrary inputs
    - **Property 6: Date Range Validation** — verify date validator accepts dates 24h–90d in future and rejects others
    - **Property 7: Booking Schema Validation** — verify bookingSchema accepts valid payloads and rejects invalid ones with field-specific errors
    - **Property 8: Contact Form Validation** — verify contactFormSchema accepts valid data and rejects invalid data with inline error details
    - **Property 13: Environment Variable Validation** — verify env validation throws with missing variable name in error
    - **Validates: Requirements 5.6, 5.7, 5.8, 5.10, 5.11, 6.1, 10.1, 10.5, 15.5**

- [x] 2. Shared layout (Navigation and Footer)
  - [x] 2.1 Implement Navigation component with glassmorphism header
    - Create `src/components/layout/Navigation.tsx` with all nav links in specified order
    - Implement CTA-styled "Book Now" link with filled background
    - Implement active link indicator with Framer Motion layoutId animated underline
    - Apply backdrop-blur-lg glassmorphism styling
    - Implement visible focus indicators (3:1 contrast ratio) for keyboard navigation
    - _Requirements: 1.1, 1.3, 1.5_

  - [x] 2.2 Implement MobileMenu with spring-animated slide-out panel
    - Create `src/components/layout/MobileMenu.tsx` with hamburger toggle
    - Implement AnimatePresence spring-physics slide-out panel (< 300ms)
    - Close on: close button tap, outside tap, or navigation to new page
    - Ensure 44x44px minimum tap targets
    - _Requirements: 1.2, 16.1, 16.4_

  - [x] 2.3 Implement Footer component
    - Create `src/components/layout/Footer.tsx` with business name, address placeholder, phone placeholder, WhatsApp placeholder, 3+ social media link placeholders, Privacy and Terms links
    - _Requirements: 1.4_

  - [x] 2.4 Implement root layout with PageTransition wrapper
    - Create `src/components/layout/PageTransition.tsx` with AnimatePresence mode="wait" page transitions
    - Wire `src/app/layout.tsx` with Navigation, Footer, PageTransition, and next/font configuration
    - _Requirements: 1.1, 1.4, 14.2_

  - [ ]* 2.5 Write unit tests for Navigation and Footer
    - Test all nav links render in correct order
    - Test "Book Now" has CTA styling
    - Test mobile menu toggle and close behavior
    - Test footer content elements
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 3. Home page
  - [x] 3.1 Implement HeroSection with parallax background
    - Create `src/components/home/HeroSection.tsx` with headline, subheadline, primary CTA to /book, and background image placeholder
    - Apply ParallaxLayer to background
    - Use 100dvh for full-height hero
    - _Requirements: 2.1, 12.6_

  - [x] 3.2 Implement ServicesOverview, GalleryPreview, TestimonialsSection, TrustBar, and CTASection
    - Create `src/components/home/ServicesOverview.tsx` with one card per Service_Package (name, description, CTA to /services)
    - Create `src/components/home/GalleryPreview.tsx` with max 3 before/after pairs + "View Full Gallery" link
    - Create `src/components/home/TestimonialsSection.tsx` with min 3 review cards (name, stars, excerpt) with gesture swipe carousel
    - Create `src/components/home/TrustBar.tsx` with CountUp counters for certifications, years, vehicles served
    - Create `src/components/home/CTASection.tsx` with booking prompt and CTA button to /book
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 3.3 Assemble Home page with ScrollReveal animations
    - Wire all home sections into `src/app/page.tsx`
    - Wrap sections with ScrollReveal (20% threshold, fadeUp variant, once)
    - Apply StaggeredGrid to card sections (100ms stagger)
    - _Requirements: 2.7, 12.1, 12.2_

- [x] 4. Services page
  - [x] 4.1 Implement PackageCard, VehicleShowcase, and AddOnList components
    - Create `src/components/services/PackageCard.tsx` with 3D tilt hover, package name, description, included services list, per-VehicleSize pricing ("Starting at $X")
    - Create `src/components/services/VehicleShowcase.tsx` with animated vehicle images per size
    - Create `src/components/services/AddOnList.tsx` with spring-toggle checkboxes, name, description, price
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 4.2 Assemble Services page
    - Wire into `src/app/services/page.tsx`
    - Include pricing disclaimer ("final pricing confirmed after vehicle inspection")
    - Add CTA per package linking to `/book?package={id}` with query parameter
    - Apply ScrollReveal and StaggeredGrid animations
    - _Requirements: 3.4, 3.5, 12.1, 12.2_

  - [ ]* 4.3 Write property test for service data rendering completeness
    - **Property 1: Service Data Rendering Completeness** — verify all data fields appear in rendered output for arbitrary ServicePackage and AddOn objects
    - **Validates: Requirements 3.1, 3.2, 3.3**

- [x] 5. Checkpoint - Core pages verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Booking flow (multi-step form)
  - [x] 6.1 Implement BookingForm orchestrator and StepIndicator
    - Create `src/components/booking/BookingForm.tsx` with useReducer state machine (BookingFormState, BookingFormAction)
    - Implement AnimatePresence step transitions (directional slide: forward=right, backward=left)
    - Create `src/components/booking/StepIndicator.tsx` with morphing progress dots (layoutId), current/total step display
    - Handle URL query parameter `?package=` for pre-selection from Services page
    - _Requirements: 5.1, 5.2, 3.5_

  - [x] 6.2 Implement VehicleStep with image-based vehicle selector cards
    - Create `src/components/booking/VehicleStep.tsx` with large visual cards (sedan.png, suv.png, truck.png)
    - Implement selection interaction: TiltCard 3D hover, spring scale-up on select (1.05), glow ring border, checkmark morph
    - Unselected cards: scale down (0.97), opacity 0.6
    - Price badge with CountUp animation from 0 to starting price
    - Auto-advance to step 2 on selection
    - _Requirements: 5.3_

  - [x] 6.3 Implement PhotosStep with drag-and-drop upload
    - Create `src/components/booking/PhotosStep.tsx` with drag-and-drop zone
    - Accept JPEG, PNG, WebP up to 5MB each, max 5 photos
    - Show preview grid with Object URLs
    - Allow skip (no photos required)
    - Reject invalid files with inline error (specific reason: wrong type or size exceeded)
    - Retain valid photos on invalid rejection
    - _Requirements: 5.4, 5.5_

  - [x] 6.4 Implement ServiceStep with visual package selector and price animation
    - Create `src/components/booking/ServiceStep.tsx` displaying packages for selected vehicle size
    - Show vehicle-specific detailing images per package
    - Animated checklist of included services (stagger in)
    - CountUp price animation on selection change (within 500ms)
    - Add-on toggle chips with spring animation
    - Running total in fixed bottom bar with animated price counter
    - _Requirements: 5.6_

  - [x] 6.5 Implement DateTimeStep with date/time selection
    - Create `src/components/booking/DateTimeStep.tsx` with calendar UI
    - Enforce: dates at least 24h in future, max 90 days out
    - Provide time slot selection for chosen date
    - _Requirements: 5.7_

  - [x] 6.6 Implement ContactStep with floating label inputs
    - Create `src/components/booking/ContactStep.tsx` with floating label inputs
    - Collect: full name (1-100 chars), email (valid format), phone (US format), optional notes (max 500 chars)
    - Inline validation with shake animation on error
    - _Requirements: 5.8, 5.11_

  - [x] 6.7 Implement ConfirmationStep with summary and edit-in-place
    - Create `src/components/booking/ConfirmationStep.tsx` with full summary display
    - Show: vehicle, photos count, package, add-ons, estimated price, date/time, contact info
    - Edit button per section that navigates back to corresponding step
    - Disable submit button during submission to prevent duplicates
    - _Requirements: 5.9, 5.10, 6.7_

  - [x] 6.8 Implement Booking API route
    - Create `src/app/api/booking/route.ts` with server-side Zod validation
    - POST to N8N_WEBHOOK_URL with 10s AbortController timeout
    - On webhook success: send confirmation email via Resend, return 200
    - On webhook failure/timeout: return 503 with fallback contact info
    - On email failure: still return success, log error server-side
    - Never store payment info or imply instant pricing
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 6.9 Wire BookingForm submission and success/error states
    - Connect form submission to /api/booking
    - Display success state with confirmation message and next-steps text
    - Display error state with fallback phone/email contact info
    - Handle network errors gracefully
    - _Requirements: 6.3, 6.4_

  - [ ]* 6.10 Write property tests for booking flow logic
    - **Property 4: Photo Upload Validation** — verify file acceptance/rejection based on MIME type, size, and count constraints
    - **Property 5: Price Calculation Correctness** — verify price equals package.pricing[vehicleSize] + sum(addOn prices)
    - **Property 6: Date Range Validation** — verify 24h-90d acceptance window
    - **Validates: Requirements 5.4, 5.5, 5.6, 5.7**

  - [ ]* 6.11 Write unit tests for Booking API route
    - Test valid payload returns 200
    - Test invalid payload returns 400 with field errors
    - Test webhook timeout returns 503 with fallback contact
    - Test email failure still returns success
    - Test duplicate submission prevention
    - _Requirements: 6.1, 6.2, 6.4, 6.5, 6.7_

- [x] 7. Checkpoint - Booking flow verified
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Gallery page
  - [x] 8.1 Implement GalleryGrid, GalleryFilter, and Lightbox components
    - Create `src/components/gallery/GalleryGrid.tsx` with masonry layout (1col <768, 2col 768-1023, 3col 1024+), staggered reveal animation
    - Create `src/components/gallery/GalleryFilter.tsx` with animated tab pills (All, Basic Wash, Full Detail, Ceramic Coating), layout transition on filter change
    - Create `src/components/gallery/Lightbox.tsx` with gesture controls (swipe left/right, pinch zoom, drag-to-dismiss), keyboard support (Escape, arrows), circular navigation (wrap at ends)
    - Use next/image with descriptive alt text (max 125 chars)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 8.2 Assemble Gallery page
    - Wire into `src/app/gallery/page.tsx`
    - Load placeholder gallery data with "REPLACE WITH CLIENT PHOTO" markers
    - _Requirements: 4.1_

  - [ ]* 8.3 Write property tests for gallery logic
    - **Property 2: Gallery Category Filter Correctness** — verify filtered results match selected category, "All" returns everything
    - **Property 3: Lightbox Circular Navigation** — verify wrap-around at boundaries for arbitrary N and index
    - **Property 12: Image Alt Text Constraints** — verify non-empty, max 125 chars
    - **Validates: Requirements 4.3, 4.5, 4.6**

- [x] 9. About page
  - [x] 9.1 Implement About page
    - Create `src/app/about/page.tsx` with owner story section (photo placeholder "REPLACE WITH OWNER PHOTO", name placeholder, narrative text placeholder)
    - Add credentials section with min 2 certification/training placeholders
    - Add service area section with Google Maps iframe placeholder (default US location, marked for replacement)
    - Apply ScrollReveal animations at 20% viewport threshold
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 10. Reviews page
  - [x] 10.1 Implement ReviewCard, RatingSummary, and StarRating components
    - Create `src/components/reviews/ReviewCard.tsx` with stagger-in animation, name, stars (filled/unfilled icons), service received, text (500 char truncation + "Read More" toggle)
    - Create `src/components/reviews/RatingSummary.tsx` with animated bar chart distribution (average, total, per-star breakdown)
    - Create `src/components/reviews/StarRating.tsx` with fill animation
    - _Requirements: 8.2, 8.4_

  - [ ] 10.2 Assemble Reviews page with pagination
    - Wire into `src/app/reviews/page.tsx`
    - Display first 6 reviews, "Show More" reveals next 6 per click
    - Sort reviews reverse chronologically (most recent first)
    - Place RatingSummary at top of page
    - _Requirements: 8.1, 8.3, 8.5_

  - [ ]* 10.3 Write property tests for reviews logic
    - **Property 9: Review Pagination Correctness** — verify initial display min(6, N), each "Show More" adds min(6, remaining), never exceeds N
    - **Property 10: Rating Summary Calculation** — verify average, totalReviews, and distribution sum correctly for arbitrary review sets
    - **Property 11: Review Chronological Ordering** — verify reverse chronological order for arbitrary date sets
    - **Validates: Requirements 8.3, 8.4, 8.5**

- [x] 11. FAQ page
  - [x] 11.1 Implement FAQ Accordion and page
    - Create `src/components/faq/Accordion.tsx` with spring-animated expand/collapse (300ms)
    - Group by category (pricing, duration, service area, vehicle prep, cancellation), min 2 questions per category
    - Collapse same-category answers on open, preserve other-category open state
    - Support keyboard: Enter/Space toggle, arrow keys move between items
    - Create `src/app/faq/page.tsx` with CTA at bottom linking to Contact and Book Now
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 12. Contact page
  - [x] 12.1 Implement ContactForm with floating labels and Contact page
    - Create `src/components/contact/ContactForm.tsx` with floating label inputs, MagneticButton submit, validation shake on error
    - Fields: name (1-100), email (valid format), subject (1-200), message (1-2000)
    - Inline validation errors on submit attempt
    - _Requirements: 10.1, 10.5_

  - [ ] 12.2 Implement Contact API route and wire contact page
    - Create `src/app/api/contact/route.ts` with Zod validation, send via Resend to business email
    - Create `src/app/contact/page.tsx` with ContactForm, WhatsApp button (placeholder "REPLACE WITH ACTUAL WHATSAPP NUMBER"), Google Maps iframe placeholder, business hours table
    - Success: show confirmation, reset form
    - Failure: show error with alternative contact methods
    - _Requirements: 10.2, 10.3, 10.4, 10.6, 10.7, 10.8_

- [ ] 13. Legal pages
  - [x] 13.1 Implement Privacy Policy and Terms of Service pages
    - Create `src/app/privacy/page.tsx` with sections: data collection, data usage, third-party sharing, cookies, user rights
    - Create `src/app/terms/page.tsx` with sections: service disclaimers, booking policies, liability limitations, dispute resolution
    - Add "DRAFT — REQUIRES LEGAL REVIEW BEFORE PUBLICATION" banner at top of each
    - Add last-updated date placeholder marked for replacement
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 14. Checkpoint - All pages implemented
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. SEO pass
  - [ ] 15.1 Add per-page metadata and structured data
    - Add unique meta title (max 60 chars), description (max 160 chars), Open Graph, and Twitter Card tags to every page following "[Service] + [City] | [Business Name]" pattern
    - Embed JSON-LD LocalBusiness + AutoRepair on Home page with placeholder address, phone, geo-coordinates
    - Verify heading hierarchy (single h1 per page, no skipped levels)
    - Use semantic HTML (header, nav, main, section, article, footer)
    - _Requirements: 13.1, 13.2, 13.5_

  - [ ] 15.2 Implement sitemap.xml and robots.txt generation
    - Create `src/app/sitemap.ts` generating sitemap.xml with all public page URLs
    - Create `src/app/robots.ts` allowing all crawlers, disallowing /api/ routes, referencing sitemap
    - _Requirements: 13.3, 13.4_

  - [ ] 15.3 Create brand asset directory with README manifest
    - Create `public/brand/` directory structure (vehicles/, hero/, gallery/, team/, icons/)
    - Create `public/brand/README.md` listing each placeholder image by filename, minimum dimensions, and component usage
    - _Requirements: 15.2_

- [ ] 16. Mobile QA pass
  - [ ] 16.1 Responsive layout verification and fixes
    - Verify single-column layout at 375px and below with 44x44px tap targets
    - Verify single-column at 376-767px with 16px minimum body font
    - Verify 2-column grids at 768-1023px (packages, gallery, testimonials), single-column for booking form and text
    - Verify no horizontal scroll at 320px, 375px, 768px, 1024px, 1440px viewports
    - Verify 100dvh hero/CTA sections account for mobile browser chrome
    - Fix any overflow, overlap, or tap target issues found
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 14.5_

  - [ ] 16.2 Verify booking form mobile experience
    - Ensure form controls have 44px minimum height
    - Ensure step navigation buttons have 44x44px tap area
    - Ensure current step/total visible at all times on mobile
    - Test touch input operability for all form interactions
    - _Requirements: 16.4_

  - [ ] 16.3 Verify prefers-reduced-motion behavior
    - Confirm all animations disabled when prefers-reduced-motion is set
    - Confirm content displays in final state immediately without motion
    - _Requirements: 12.4_

- [ ] 17. Final review and build verification
  - [ ] 17.1 Performance and accessibility verification
    - Verify next/image used for all raster images with responsive srcset, lazy loading, blur-up placeholders
    - Verify next/font eliminates render-blocking font requests
    - Verify WCAG AA contrast ratios (4.5:1 normal text, 3:1 large text)
    - Verify focus indicators on all interactive elements
    - Verify alt text on all images (non-empty, max 125 chars)
    - _Requirements: 14.1, 14.2, 14.4, 14.6, 13.6, 1.5_

  - [ ] 17.2 Build validation and final checks
    - Run `next build` and verify successful build
    - Verify build fails when required env vars are missing
    - Verify sitemap.xml includes all pages
    - Verify robots.txt disallows /api/
    - Verify no payment info stored or instant pricing implied anywhere
    - _Requirements: 15.3, 15.5, 13.3, 13.4, 6.6_

- [ ] 18. Final checkpoint - All tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The booking flow (tasks 6.x) is the highest-priority implementation — take extra care with state management, validation, and error handling
- All placeholder content should use clear markers (e.g., "REPLACE WITH CLIENT PHOTO") for easy identification during content population
- Tech stack: Next.js 14 (App Router, TypeScript), Tailwind CSS, shadcn/ui, Framer Motion, Resend, n8n webhook, Zod, Vitest, fast-check

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.5"] },
    { "id": 2, "tasks": ["1.3", "1.4"] },
    { "id": 3, "tasks": ["1.6", "2.1", "2.3"] },
    { "id": 4, "tasks": ["2.2", "2.4"] },
    { "id": 5, "tasks": ["2.5", "3.1", "4.1"] },
    { "id": 6, "tasks": ["3.2", "4.2"] },
    { "id": 7, "tasks": ["3.3", "4.3"] },
    { "id": 8, "tasks": ["6.1"] },
    { "id": 9, "tasks": ["6.2", "6.3", "6.5", "6.6"] },
    { "id": 10, "tasks": ["6.4", "6.7"] },
    { "id": 11, "tasks": ["6.8"] },
    { "id": 12, "tasks": ["6.9", "6.10", "6.11"] },
    { "id": 13, "tasks": ["8.1", "9.1", "10.1", "11.1", "12.1", "13.1"] },
    { "id": 14, "tasks": ["8.2", "10.2", "12.2"] },
    { "id": 15, "tasks": ["8.3", "10.3"] },
    { "id": 16, "tasks": ["15.1", "15.2", "15.3"] },
    { "id": 17, "tasks": ["16.1", "16.2", "16.3"] },
    { "id": 18, "tasks": ["17.1", "17.2"] }
  ]
}
```
