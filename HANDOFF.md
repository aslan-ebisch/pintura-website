# Pintura Co. Website - Project Handoff

## Project Overview
A cutting-edge, dark-themed landing page for **Pintura Co.**, an exterior painting company in Northwest Arkansas. Built with Next.js 16, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework**: Next.js 16.1.0 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript

## Color Scheme
- **Background**: Black (`#000000`)
- **Text**: White (`#ffffff`)
- **Accent**: Arkansas Razorback Red (`#9D2235`)
- CSS variables defined in `app/globals.css`

## File Structure
```
pintura-website/
├── app/
│   ├── page.tsx        # Main landing page with all sections
│   ├── layout.tsx      # Root layout with metadata
│   └── globals.css     # Global styles and CSS variables
├── public/
│   └── hero-video.mp4  # VIDEO PLACEHOLDER - user needs to add this
└── package.json
```

## Page Sections (in order)
All sections are in `app/page.tsx`:

1. **Navigation** - Sticky header, changes opacity on scroll
2. **Hero** - Full-screen with VIDEO BACKGROUND (needs `public/hero-video.mp4`)
3. **Stats** - 4 KPI tiles (placeholder numbers)
4. **About** - Founder story section (placeholder text)
5. **Services** - 4 service cards with hover effects
6. **Process** - 5-step timeline
7. **Gallery** - 6 project placeholders
8. **Testimonials** - 3 customer review placeholders
9. **Contact** - Form with phone/email/location info
10. **Footer** - Logo, copyright, social links

## Placeholder Content That Needs Replacement
The user needs to provide:

### Hero Section
- **Video file**: Save as `public/hero-video.mp4` (10 second loop of painting work)

### Stats Section (line ~180)
- `150+` Homes Painted - UPDATE WITH REAL NUMBER
- `5` Years Experience - UPDATE WITH REAL NUMBER
- `100%` Satisfaction Rate
- `24hr` Quote Response

### About Section (line ~252-260)
- Origin story paragraphs (currently placeholder text in brackets)
- Photo of founder (currently shows `[Your Photo Here]`)

### Gallery Section (line ~402)
- 6 project photos (currently placeholders)

### Testimonials Section (line ~449)
- 3 real customer testimonials with names and cities

### Contact Section (line ~558)
- Phone: `(417) 849-0332` - verify this is correct
- Email: `hello@pinturaco.com` - verify this is correct

## Running Locally
```bash
cd pintura-website
npm install
npm run dev
```
Opens at http://localhost:3000 (or specify port with `npm run dev -- -p 3001`)

## Key Features Implemented
- Scroll-triggered animations on all sections
- Parallax effect on hero video background
- Smooth scroll navigation
- Mobile responsive design
- Custom scrollbar styling
- Hover effects on cards and buttons

## Pending Work
1. Add hero video file (`public/hero-video.mp4`)
2. Replace all placeholder content with real copy
3. Add real photos to Gallery section
4. Connect contact form to backend (currently just logs to console)
5. Deploy to Vercel and connect to pinturaco.com domain

## Form Submission
The contact form in `app/page.tsx` (line ~519) currently just `console.log`s the data. Needs backend integration - options:
- Formspree
- Netlify Forms
- Custom API route with email service (SendGrid, Resend, etc.)

## Domain
User owns: **pinturaco.com**

## Notes for Next Session
- The user likes the current design - called it "STRAIGHT HEAT"
- Video background was specifically requested
- Keep the dark, premium, Palantir-inspired aesthetic
- User runs a painting company in NWA (Northwest Arkansas)
