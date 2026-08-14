# Requirements Document

## Introduction

A production-ready marketing and booking website for a USA-based auto detailing business. The site combines lead generation, service information, and an automated booking flow. Bookings are forwarded to an n8n webhook for downstream automation. No database or payment processing is included in this MVP. The site is built with Next.js 14 (App Router, TypeScript), Tailwind CSS, shadcn/ui, Framer Motion, and Resend for transactional email.

## Glossary

- **Website**: The Next.js 14 application serving the auto detailing business marketing and booking pages
- **Booking_Form**: The multi-step form on the Book Now page that collects vehicle, service, scheduling, and contact information
- **Booking_API**: The Next.js API route at `/api/booking` that validates submissions and forwards data to the n8n webhook
- **N8N_Webhook**: The external automation endpoint (configured via `N8N_WEBHOOK_URL` env var) that receives booking JSON payloads
- **Email_Service**: The Resend-powered transactional email system (configured via `RESEND_API_KEY` env var) that sends booking confirmations
- **Gallery**: The before/after image grid with lightbox functionality
- **Contact_Form**: The form on the Contact page that sends inquiries via Resend
- **Navigation**: The responsive site header with links to all main pages and mobile menu
- **Service_Package**: A defined tier of detailing services (Basic Wash, Full Interior+Exterior, Ceramic Coating) with vehicle-size pricing
- **Add_On**: An optional supplementary service that can be combined with a Service_Package
- **Vehicle_Size**: A vehicle classification category (Sedan, SUV, Truck) used for pricing differentiation
- **Lightbox**: A full-screen overlay for viewing gallery images at larger scale
- **Scroll_Reveal**: A Framer Motion animation that fades and rises elements into view on scroll
- **Structured_Data**: JSON-LD markup embedded in pages for search engine rich results
- **CTA**: Call-to-action element directing users toward booking or contact

## Requirements

### Requirement 1: Site Navigation and Layout

**User Story:** As a visitor, I want consistent navigation across all pages, so that I can easily find information and access the booking page.

#### Acceptance Criteria

1. THE Website SHALL display a responsive navigation header on every page containing links in the following order: Home, Services, Gallery, Book Now, About, Reviews, FAQ, and Contact, with the current page link indicated by a visually distinct active state differentiable from inactive links
2. WHEN the viewport width is less than 768px, THE Navigation SHALL collapse into a hamburger menu button that, when activated, opens an animated slide-out panel within 300ms, and SHALL close the panel when the user taps the close button, taps outside the panel, or navigates to a new page
3. THE Navigation SHALL highlight the Book Now link with a CTA button style that is visually differentiable from all other navigation links by using a filled background color contrasting with the nav bar background
4. THE Website SHALL display a footer on every page containing business name, address placeholder, phone placeholder, WhatsApp placeholder, a minimum of 3 social media link placeholders, and links to Privacy Policy and Terms pages
5. WHEN a user presses Tab, THE Website SHALL display visible focus indicators on all interactive elements with a minimum contrast ratio of 3:1 against adjacent colors per WCAG 2.1 AA non-text contrast requirements

### Requirement 2: Home Page

**User Story:** As a visitor, I want an engaging home page that communicates the business value and guides me toward booking, so that I understand what services are offered and can take action.

#### Acceptance Criteria

1. THE Website SHALL display a hero section with a headline, subheadline, primary CTA button linking to Book Now, and a background image placeholder, positioned as the first content section below the navigation header
2. THE Website SHALL display a services overview section with one card per Service_Package (Basic Wash, Full Interior+Exterior, Ceramic Coating) each containing the package name, a brief description, and a CTA linking to the Services page
3. THE Website SHALL display a before/after gallery preview section showing a maximum of 3 before/after image pairs (6 individual images) with a "View Full Gallery" link to the Gallery page
4. THE Website SHALL display a testimonials section with a minimum of 3 customer review cards each containing the customer name or placeholder, star rating (1-5), and review excerpt
5. THE Website SHALL display a trust bar section with certification badges, years-in-business counter, and vehicles-served counter as placeholders
6. THE Website SHALL display a final CTA section with a booking prompt and button linking to Book Now
7. WHEN a section enters the viewport at 20% visibility, THE Website SHALL animate the section content with a fade-and-rise Scroll_Reveal effect (translateY 24px to 0, opacity 0 to 1, duration 500ms) using only transform and opacity properties, triggering once per element

### Requirement 3: Services and Pricing Page

**User Story:** As a potential customer, I want to see detailed service packages with pricing by vehicle size, so that I can understand what is offered and estimate costs before booking.

#### Acceptance Criteria

1. THE Website SHALL display Service_Package cards for Basic Wash, Full Interior+Exterior, and Ceramic Coating tiers, each card containing the package name, description, list of included services, and per-Vehicle_Size pricing
2. WHEN a Service_Package card is displayed, THE Website SHALL show pricing broken down by Vehicle_Size (Sedan, SUV, Truck) with all prices marked as "Starting at" followed by the price amount
3. THE Website SHALL display an Add_On list section with a minimum of 1 Add_On displayed, each showing name, description, and estimated price
4. THE Website SHALL include a disclaimer stating that final pricing is confirmed after vehicle inspection
5. WHEN a visitor clicks a Service_Package CTA, THE Website SHALL navigate the visitor to the Book Now page with the selected package identifier passed as a URL query parameter and pre-selected in the Booking_Form

### Requirement 4: Gallery Page

**User Story:** As a potential customer, I want to view before/after photos of completed work, so that I can evaluate the quality of detailing services.

#### Acceptance Criteria

1. THE Website SHALL display a responsive grid of before/after image pairs with a minimum of 6 pairs, using placeholder markers reading "REPLACE WITH CLIENT PHOTO", arranged in 1 column at viewports below 768px, 2 columns between 768px and 1023px, and 3 columns at 1024px and above
2. WHEN a visitor clicks an image, THE Gallery SHALL open a Lightbox overlay displaying the image at full resolution with next, previous, and close controls, and keyboard support for Escape to close and arrow keys to navigate
3. THE Gallery SHALL provide filter controls to display images by Service_Package category (Basic Wash, Full Interior+Exterior, Ceramic Coating) with an "All" option selected by default showing all image pairs
4. WHEN the grid enters the viewport, THE Website SHALL animate grid items with a staggered fade-in effect using a delay of 100ms between consecutive items, animating only transform and opacity properties
5. THE Gallery SHALL use next/image components with alt text describing the service type and before/after state for each image
6. IF the visitor navigates past the last image in the Lightbox, THEN THE Gallery SHALL loop navigation back to the first image, and vice versa for navigating before the first image

### Requirement 5: Booking Form Multi-Step Flow

**User Story:** As a customer, I want to book a detailing appointment through a guided multi-step form, so that I can provide all necessary information without feeling overwhelmed.

#### Acceptance Criteria

1. THE Booking_Form SHALL present a multi-step flow with the following sequential steps: Vehicle Type selection, Condition Photos upload, Service Selection, Preferred Date and Time, Contact Information, and Confirmation Review
2. THE Booking_Form SHALL display a progress indicator showing the current step number and total number of steps (6), and SHALL provide a Back button on steps 2 through 6 to return to the previous step while preserving all previously entered data
3. WHEN a visitor selects a Vehicle_Size in step 1, THE Booking_Form SHALL store the selection and advance to step 2
4. WHEN a visitor is on step 2, THE Booking_Form SHALL accept image files (JPEG, PNG, WebP) up to 5MB each with a maximum of 5 photos, and SHALL allow the visitor to skip this step without uploading any photos
5. IF a visitor attempts to upload a file in step 2 that is not JPEG, PNG, or WebP format or exceeds 5MB in size, THEN THE Booking_Form SHALL reject the file, display an inline error message indicating the reason for rejection, and retain any previously uploaded valid photos
6. WHEN a visitor selects a Service_Package and optional Add_Ons in step 3, THE Booking_Form SHALL display the estimated price total updated within 500 milliseconds of each selection change
7. WHEN a visitor selects a preferred date in step 4, THE Booking_Form SHALL only allow dates at least 24 hours in the future and no more than 90 days from the current date, and SHALL provide time slot selection for the chosen date
8. THE Booking_Form SHALL collect the following contact information in step 5: full name (required, 1 to 100 characters), email (required, valid email format), phone number (required, valid US phone format), and optional notes (maximum 500 characters)
9. WHEN a visitor reaches the confirmation step, THE Booking_Form SHALL display a summary of all selections including Vehicle_Size, uploaded photos count, Service_Package, Add_Ons, estimated price, preferred date and time, and contact information, with an Edit button for each step that navigates back to that step
10. WHEN a visitor attempts to proceed to the next step, THE Booking_Form SHALL validate all required fields for the current step client-side and block progression until all validations pass
11. IF a required field is empty or invalid when the visitor attempts to proceed, THEN THE Booking_Form SHALL display an inline error message adjacent to the field indicating the specific validation failure

### Requirement 6: Booking Submission and Automation

**User Story:** As a business owner, I want bookings automatically forwarded to my n8n workflow, so that I can process them without manual data entry.

#### Acceptance Criteria

1. WHEN a visitor submits the Booking_Form, THE Booking_API SHALL validate the payload server-side (vehicle type, service selection, contact info format) and POST a JSON body to the URL specified by the N8N_WEBHOOK_URL environment variable with a timeout of 10 seconds
2. WHEN the N8N_Webhook responds with an HTTP 2xx status, THE Booking_API SHALL trigger the Email_Service to send a confirmation email to the customer's provided email address
3. WHEN the Booking_API receives a successful response, THE Website SHALL display a success state with a confirmation message and estimated next-steps text stating that the business will review photos and confirm final pricing
4. IF the N8N_Webhook is unreachable, times out after 10 seconds, or returns an HTTP 4xx or 5xx status, THEN THE Booking_API SHALL return a graceful failure response and THE Website SHALL display a user-friendly error message with alternative contact instructions (phone number and email)
5. IF the Email_Service fails to send the confirmation email, THEN THE Booking_API SHALL still return a success response to the visitor but log the email failure server-side
6. THE Booking_API SHALL NOT store payment information or imply instant guaranteed pricing in any response
7. WHEN the Booking_Form is submitted, THE Booking_Form SHALL disable the submit button to prevent duplicate submissions until a response is received or the request times out

### Requirement 7: About Page

**User Story:** As a potential customer, I want to learn about the business owner and service area, so that I can build trust before booking.

#### Acceptance Criteria

1. THE Website SHALL display an About page containing an owner story section with photo placeholder (marked "REPLACE WITH OWNER PHOTO"), name placeholder, and narrative text placeholder
2. THE Website SHALL display a credentials section with a minimum of 2 certification/training placeholder items
3. THE Website SHALL display a service area section with an embedded Google Maps iframe placeholder showing a default US location, marked for replacement with actual coordinates
4. THE Website SHALL apply Scroll_Reveal animations to content sections as they enter the viewport at 20% visibility

### Requirement 8: Reviews and Testimonials Page

**User Story:** As a potential customer, I want to read detailed customer reviews, so that I can evaluate service quality from peer experiences.

#### Acceptance Criteria

1. THE Website SHALL display a dedicated Reviews page with customer testimonials showing the first 6 reviews on initial page load
2. WHEN a testimonial is displayed, THE Website SHALL show the customer name (or placeholder), star rating (1-5) as filled and unfilled star icons, service received, and review text up to 500 characters with a "Read More" toggle to reveal the full text if it exceeds that length
3. WHEN the review list exceeds 6 items, THE Website SHALL provide a "Show More" control that reveals the next 6 reviews per activation until all reviews are displayed
4. THE Website SHALL display an aggregate rating summary at the top of the page containing the average star rating (to one decimal place), the total number of reviews, and a visual distribution breakdown showing the count of reviews per star level (1 through 5)
5. THE Website SHALL display testimonials in reverse chronological order (most recent first)

### Requirement 9: FAQ Page

**User Story:** As a visitor, I want answers to common questions, so that I can make informed decisions without needing to contact the business.

#### Acceptance Criteria

1. THE Website SHALL display an FAQ page with an accordion interface grouping questions by category
2. THE Website SHALL include FAQ categories covering: pricing, service duration, service area, vehicle preparation instructions, and cancellation policy, with a minimum of 2 questions per category
3. WHEN a visitor clicks a question, THE Website SHALL expand the answer with a smooth animation (duration 300ms) and collapse any previously open answer within the same category
4. WHEN a visitor clicks a question in a different category, THE Website SHALL NOT collapse answers open in other categories
5. THE Website SHALL support keyboard navigation for accordion items (Enter/Space to toggle, arrow keys to move between items)
6. THE Website SHALL include a CTA at the bottom directing visitors to both the Contact page and the Book Now page

### Requirement 10: Contact Page

**User Story:** As a visitor, I want multiple ways to reach the business, so that I can ask questions or get support through my preferred channel.

#### Acceptance Criteria

1. THE Website SHALL display a Contact_Form with the following fields: name (required, 1-100 characters), email (required, valid email format), subject (required, 1-200 characters), and message (required, 1-2000 characters)
2. WHEN a visitor submits the Contact_Form with all fields valid, THE Website SHALL send the message via the Email_Service to the business email address configured via environment variable
3. WHEN the Contact_Form submission succeeds, THE Website SHALL display a success confirmation message and reset the form fields to empty
4. IF the Contact_Form submission fails, THEN THE Website SHALL display an error message with alternative contact methods (phone number and email address)
5. IF a required field is empty or fails format validation when the visitor attempts to submit, THEN THE Website SHALL display inline error messages adjacent to the invalid fields and prevent submission
6. THE Website SHALL display a WhatsApp click-to-chat button with a placeholder number and a visible marker "REPLACE WITH ACTUAL WHATSAPP NUMBER"
7. THE Website SHALL display an embedded Google Maps iframe placeholder showing the service area
8. THE Website SHALL display business hours in a structured table format with days and time ranges

### Requirement 11: Legal Pages

**User Story:** As a business owner, I want template-based legal pages, so that I have placeholder privacy and terms content ready for legal review.

#### Acceptance Criteria

1. THE Website SHALL display a Privacy Policy page with headed sections covering: data collection, data usage, third-party sharing, cookies, and user rights
2. THE Website SHALL display a Terms of Service page with headed sections covering: service disclaimers, booking policies, liability limitations, and dispute resolution
3. THE Website SHALL mark all legal content with a visible banner at the top of each page stating "DRAFT — REQUIRES LEGAL REVIEW BEFORE PUBLICATION"
4. THE Website SHALL include a last-updated date placeholder on each legal page marked for replacement

### Requirement 12: Animation and Motion Design

**User Story:** As a visitor, I want smooth, performant animations that enhance the browsing experience without hindering usability.

#### Acceptance Criteria

1. WHEN a section element crosses the viewport threshold of 20% visibility, THE Website SHALL animate the section content using Framer Motion Scroll_Reveal with a vertical translate of 24px fading from opacity 0 to 1 over a duration of 500ms, triggering once per element per page load
2. WHEN grid items (service cards, gallery images, testimonials) enter the viewport at 20% visibility, THE Website SHALL apply staggered animation timing with a delay of 100ms between consecutive items and a maximum total stagger of 600ms
3. WHILE the device supports hover (via the hover: hover media query), WHEN a user hovers over an interactive card or button, THE Website SHALL apply a scale transform of 1.03 and an elevated shadow within a transition duration of 200ms
4. IF the user's system preference is set to prefers-reduced-motion, THEN THE Website SHALL disable all animations and transitions and display all content in its final state immediately without motion
5. THE Website SHALL only animate CSS transform and opacity properties to maintain compositor-layer performance
6. THE Website SHALL use 100dvh units for full-height hero and CTA sections to account for mobile browser chrome

### Requirement 13: SEO and Structured Data

**User Story:** As a business owner, I want the site to rank well for local auto detailing searches, so that potential customers find me organically.

#### Acceptance Criteria

1. THE Website SHALL include unique meta title (maximum 60 characters), meta description (maximum 160 characters), Open Graph, and Twitter Card tags on every page following the pattern "[Service] + [City] | [Business Name]"
2. THE Website SHALL embed JSON-LD structured data of types LocalBusiness and AutoRepair on the Home page with placeholder address, phone, and geo-coordinates that passes Google Rich Results Test validation without errors or warnings
3. THE Website SHALL generate a sitemap.xml at build time containing all public page URLs and a reference to the sitemap SHALL be included in robots.txt
4. THE Website SHALL serve a robots.txt file allowing all crawlers access to public pages and disallowing access to /api/ routes
5. THE Website SHALL use semantic HTML elements (header, nav, main, section, article, footer) with a single h1 per page and heading levels that do not skip levels (e.g., h1 shall not be followed by h3 without an intervening h2)
6. THE Website SHALL provide alt text on all images that identifies the subject and context of the image, with a maximum length of 125 characters
7. IF the meta title or meta description for any page is empty or exceeds its maximum character limit, THEN THE Website build SHALL fail with an error message indicating which page has invalid metadata

### Requirement 14: Performance Optimization

**User Story:** As a visitor, I want fast page loads on any device and connection, so that I can browse and book without frustration.

#### Acceptance Criteria

1. THE Website SHALL use next/image for all raster images with responsive srcset, lazy loading, and placeholder blur-up
2. THE Website SHALL use next/font for font loading to eliminate render-blocking font requests
3. THE Website SHALL achieve a Lighthouse mobile performance score of 90 or higher on all pages when tested with simulated 4G throttling
4. THE Website SHALL render all pages with no layout content visible within 2.5 seconds of navigation on a simulated 4G connection, and maintain a Cumulative Layout Shift score of 0.1 or less
5. THE Website SHALL not require horizontal scrolling and SHALL render all content without overflow or overlap at viewport widths of 375px, 768px, 1024px, and 1440px
6. THE Website SHALL maintain WCAG AA color contrast ratios (4.5:1 for normal text, 3:1 for large text) across all color combinations
7. THE Website SHALL deliver a total blocking JavaScript bundle of no more than 200KB (gzipped) on initial page load for any page

### Requirement 15: Deployment and Configuration

**User Story:** As a developer, I want a clear deployment configuration, so that the site can be deployed to Vercel with minimal setup.

#### Acceptance Criteria

1. THE Website SHALL include a `.env.example` file listing all required environment variables (N8N_WEBHOOK_URL, RESEND_API_KEY, and NEXT_PUBLIC_BUSINESS_NAME), each with a brief description of its purpose and an example placeholder value indicating the expected format
2. THE Website SHALL include a `public/brand/` directory with a README listing each placeholder image by filename, its recommended minimum dimensions, and the page or component where it is displayed
3. THE Website SHALL produce a successful build via `next build` when all required environment variables are set, requiring no Vercel-specific configuration file beyond the default Next.js framework detection and environment variables
4. THE Website SHALL include a `next.config.js` configured with an images.remotePatterns entry for any external image domains referenced in the site content
5. IF any required environment variable (N8N_WEBHOOK_URL, RESEND_API_KEY, NEXT_PUBLIC_BUSINESS_NAME) is missing or empty at build time, THEN THE Website SHALL fail the build with an error message indicating which variable is missing

### Requirement 16: Responsive Mobile Experience

**User Story:** As a mobile user, I want a fully functional experience on my phone, so that I can browse services and book appointments on the go.

#### Acceptance Criteria

1. WHEN the viewport width is 375px or less, THE Website SHALL display all content in a single-column layout with touch-friendly tap targets of at least 44x44px
2. WHEN the viewport width is between 376px and 767px, THE Website SHALL maintain a single-column layout with tap targets of at least 44x44px and a minimum body font size of 16px
3. WHEN the viewport width is between 768px and 1023px, THE Website SHALL adapt Service_Package cards, Gallery grid items, and testimonial cards to a 2-column grid layout while keeping the Booking_Form and text-heavy content in a single column
4. THE Booking_Form SHALL be operable via touch input with form controls (inputs, selects, buttons) having a minimum height of 44px, step navigation buttons having a minimum tap area of 44x44px, and the current step number and total step count visible at all times
5. THE Website SHALL not require horizontal scrolling at any viewport width from 320px to 1440px, with no content overflowing the viewport bounds
