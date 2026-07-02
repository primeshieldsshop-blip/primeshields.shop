/**
 * Prime Shields — Product Catalog
 * All images loaded from assets/images/
 * Update image paths here when real photos are added.
 */

export const PLACEHOLDER_IMAGE = 'assets/images/placeholder.svg';

export const products = [
  {
    id: 'acrylic-shields',
    category: 'Acrylic Shields',
    title: 'Acrylic Shields',
    description: 'Premium crystal-clear acrylic shields with laser engraving. Perfect for corporate recognition, academic excellence, and institutional awards. Available in multiple sizes and custom shapes.',
    image: 'assets/images/acrylic-shields.png',
    tags: ['acrylic', 'shields', 'corporate', 'custom'],
    featured: true,
  },
  {
    id: 'crystal-awards',
    category: 'Crystal Awards',
    title: 'Crystal Awards',
    description: 'Elegant optical crystal awards that capture light beautifully. Ideal for executive recognition, lifetime achievement, and premium corporate events.',
    image: 'assets/images/crystal-awards.png',
    tags: ['crystal', 'awards', 'executive', 'premium'],
    featured: true,
  },
  {
    id: 'wooden-shields',
    category: 'Wooden Shields',
    title: 'Wooden Shields',
    description: 'Classic wooden shields with premium finish and engraved plaques. A timeless choice for sports clubs, schools, and traditional recognition ceremonies.',
    image: 'assets/images/wooden-shields.png',
    tags: ['wooden', 'shields', 'sports', 'schools'],
    featured: true,
  },
  {
    id: 'corporate-awards',
    category: 'Corporate Awards',
    title: 'Corporate Awards',
    description: 'Sophisticated corporate awards designed for banks, multinationals, and government organizations. Custom branding and bulk order options available.',
    image: 'assets/images/corporate-awards.png',
    tags: ['corporate', 'awards', 'business', 'bulk'],
    featured: true,
  },
  {
    id: 'glass-awards',
    category: 'Glass Awards',
    title: 'Glass Awards',
    description: 'Refined glass awards with deep etching and color accents. Perfect for employee of the month, sales achievements, and team recognition.',
    image: 'assets/images/glass-awards.png',
    tags: ['glass', 'awards', 'employee', 'recognition'],
    featured: true,
  },
  {
    id: 'medals',
    category: 'Medals',
    title: 'Medals',
    description: 'High-quality medals in gold, silver, and bronze finishes. Custom ribbons and engraving for sports events, competitions, and academic achievements.',
    image: 'assets/images/medals.png',
    tags: ['medals', 'sports', 'competition', 'gold'],
    featured: false,
  },
  {
    id: 'trophies',
    category: 'Trophies',
    title: 'Trophies',
    description: 'Premium trophies for sports championships, academic competitions, and corporate events. Available in various heights and custom designs.',
    image: 'assets/images/trophies.png',
    tags: ['trophies', 'sports', 'championship', 'events'],
    featured: false,
  },
  {
    id: 'souvenirs',
    category: 'Souvenirs',
    title: 'Souvenirs',
    description: 'Custom souvenirs and mementos for conferences, exhibitions, and special events. Branded keepsakes that leave a lasting impression.',
    image: 'assets/images/souvenirs.png',
    tags: ['souvenirs', 'events', 'gifts', 'custom'],
    featured: false,
  },
  {
    id: 'corporate-boxes',
    category: 'Corporate Boxes',
    title: 'Corporate Gift Boxes',
    description: 'Luxury corporate gift boxes containing premium awards and executive gifts. Perfect for client appreciation and employee milestones.',
    image: 'assets/images/corporate-gift-boxes.png',
    tags: ['corporate', 'gifts', 'boxes', 'executive'],
    featured: false,
  },
  {
    id: 'frames',
    category: 'Frames',
    title: 'Frames',
    description: 'Elegant certificate and award frames in premium materials. Protect and display achievements with style and sophistication.',
    image: 'assets/images/frames.png',
    tags: ['frames', 'certificates', 'display', 'premium'],
    featured: false,
  },
  {
    id: 'executive-shields',
    category: 'Executive Shields',
    title: 'Executive Shields',
    description: 'Prestigious executive shields for board members, CEOs, and senior leadership. Crafted with the finest materials and meticulous attention to detail.',
    image: 'assets/images/executive-shields.png',
    tags: ['executive', 'shields', 'leadership', 'premium'],
    featured: false,
  },
  {
    id: 'custom-awards',
    category: 'Custom Awards',
    title: 'Custom Awards',
    description: 'Fully bespoke awards designed to your specifications. From concept to delivery, we bring your vision to life with precision craftsmanship.',
    image: 'assets/images/table-tennis-award-trophy.png',
    tags: ['custom', 'bespoke', 'design', 'unique'],
    featured: false,
  },
  {
    id: 'hajj-umrah-shields',
    category: 'Hajj & Umrah Shields',
    title: 'Hajj & Umrah Shields',
    description: 'Beautifully crafted shields commemorating Hajj and Umrah pilgrimages. A meaningful gift for returning pilgrims and religious institutions.',
    image: 'assets/images/hajj-umrah-shields.png',
    tags: ['hajj', 'umrah', 'religious', 'shields'],
    featured: false,
  },
];

export const categories = ['All', ...new Set(products.map((p) => p.category))];

export const heroSlides = products.filter((p) => p.featured).slice(0, 5);

export const galleryItems = [
  ...products,
  ...products.slice(0, 5).map((p, i) => ({
    ...p,
    id: `${p.id}-gallery-${i}`,
    title: `${p.title} — Showcase ${i + 1}`,
  })),
];
