import { IMG } from "./images";

/* ================================ SEO (see note below) ================================
   This project runs as a client-only React artifact, so there's no Next.js
   <Head> / generateMetadata to hook into here. The block below is written so
   you can paste it directly into a Next.js app/layout.tsx (App Router):

   export const metadata = {
     title: "SmileCare Dental Clinic — Healthy Smiles Start Here",
     description: "Professional family & cosmetic dental care. Same-day emergency visits, insurance accepted, 10+ years of experience.",
     openGraph: {
       title: "SmileCare Dental Clinic",
       description: "Healthy Smiles Start Here — book your appointment today.",
       url: "https://www.smilecaredental.com",
       siteName: "SmileCare Dental Clinic",
       images: ["/og-image.jpg"],
       type: "website",
     },
     twitter: { card: "summary_large_image", title: "SmileCare Dental Clinic", description: "Healthy Smiles Start Here." },
     alternates: { canonical: "https://www.smilecaredental.com" },
   };

   robots.txt:
     User-agent: *
     Allow: /
     Sitemap: https://www.smilecaredental.com/sitemap.xml

   The JSON-LD below IS wired up for real — it's injected into <head> at
   runtime so this preview also carries valid Dentist/LocalBusiness schema. */
export const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "SmileCare Dental Clinic",
  image: IMG.hero,
  telephone: "+1-555-123-4567",
  email: "hello@smilecaredental.com",
  address: { "@type": "PostalAddress", streetAddress: "128 Willow Grove Ave", addressLocality: "Springfield", addressRegion: "IL", postalCode: "62704", addressCountry: "US" },
  openingHours: "Mo-Sa 08:00-19:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1200" },
  priceRange: "$$",
};
