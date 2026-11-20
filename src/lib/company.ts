/**
 * Company information — sourced verbatim from https://aroved.com (Nov 2026).
 * Do not add certifications, statistics or claims that are not published by Aroved.
 */
export const company = {
  legalName: "Aroved Healthcare Pvt Ltd",
  brand: "AROSAFE",
  tagline: "A Healthcare Enterprise",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aroved.com",
  intro:
    "Aroved Healthcare Pvt Ltd partners with leading manufacturers and importers to provide a comprehensive range of infection control products under our brand “AROSAFE.”",
  about:
    "Aroved Healthcare Pvt Ltd partners with leading manufacturers and importers to provide a comprehensive range of Infection Control Products under our brand “AROSAFE”. Our offerings include Medical Examination Gloves, Sterile Surgical Gloves, Sterile EVA Gloves, Body Wipes, Sterilization Reels, Sterile Surgeon Gowns, Major and Minor Drape Kits along with various customized Surgical Drape Kits.",
  aboutCare:
    "These products are essential for pre-operative and post-operative patient care, from outpatient departments to critical care environments. At Aroved, we are dedicated to ensuring the timely delivery of these Quality products, thereby enhancing service quality for hospitals, customers, and patients.",
  address: {
    line1: "No. 90/51, 1st Floor, 2nd Main Road",
    line2: "Rajajinagar Industrial Town",
    city: "Bangalore",
    postalCode: "560044",
    region: "Karnataka",
    country: "IN",
  },
  phones: ["6366939345", "6366939346"],
  email: "sales@aroved.com",
  accountsEmail: "accounts@aroved.com",
  hours: "Monday to Saturday, 9:30 AM to 6 PM",
  mapQuery: "No. 90/51, 2nd Main Road, Rajajinagar Industrial Town, Bangalore 560044",
} as const;

/** Published figures from aroved.com (home and About pages). */
export const stats = [
  { value: 20, suffix: "", label: "Years Experience" },
  { value: 250, suffix: "+", label: "Hospitals" },
  { value: 500, suffix: "+", label: "Distributors" },
] as const;

export const vision = {
  title: "Customer First",
  caption: "Our Motto",
  points: [
    "To offer a wide range of Healthcare solutions nationwide, focusing on excellence in healthcare services.",
    "To collaborate with top Manufacturers of Healthcare products who utilize state-of-the-art technology and adhere to the highest certified standards.",
    "To partner with leading Hospitals and Healthcare providers to drive industry growth and meet their evolving needs.",
    "To enhance accessibility to high-quality Infection Control and Surgical Products & Consumables.",
    "To invest in backward integration to ensure stringent quality control and fulfil customized customer requirements.",
  ],
};

export const mission = {
  title: "To Achieve The Most Preferred",
  caption: "Status",
  points: [
    "To attain the status of the “Most Preferred Brand” with all our clients and become the go-to choice for Hygiene Related products & supplies.",
    "To maintain the highest standards of honesty and ethics in our business practices.",
    "To ensure exceptional customer satisfaction, fostering long-term relationships and repeat business.",
  ],
};

export const quality = {
  title: "Committed to Quality",
  intro:
    "At Aroved Healthcare Pvt Ltd, we are committed to becoming leaders in the Healthcare Industry by adhering to the highest standards of quality. Our approach includes:",
  points: [
    "Adopting the Highest Quality standards in our products and services.",
    "Delivering superior Products to meet and exceed customer expectations.",
    "Continuously improving the quality of Products & Services through Innovation and Efficiency to enhance Customer Experience.",
    "Regularly training of our workforce to ensure timely fulfilment of customer requirements.",
    "Staying abreast of Industry and Technological advancements to enhance our offerings.",
  ],
};

export const team = [
  {
    name: "Sham.K. Rao",
    role: "Managing Director & CEO",
    image: "/images/team/team-1.jpg",
    bio: "Engineering Graduate with Post Graduation in Business Administration, with 30+ years of work experience having worked with reputed organizations like Xerox, TVSICS and Sintex.",
  },
  {
    name: "Sridharan Iyengar",
    role: "Director",
    image: "/images/team/team-2.jpg",
    bio: "Senior Professional with 35+ years of work experience.",
  },
  {
    name: "Prasad Kogganur",
    role: "Director",
    image: "/images/team/team-4.jpg",
    bio: "Senior Professional with over 35 years of experience.",
  },
] as const;

export const teamQuote =
  "We are committed to our Customers in terms of Providing Best in the Industry Services and become the Leaders in the Health Care Services Industry.";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Why Aroved", href: "/#why-aroved" },
  { label: "Contact", href: "/contact" },
] as const;
