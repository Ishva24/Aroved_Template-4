/**
 * AROSAFE product catalogue — names, descriptions and specifications are taken
 * from the product pages on https://aroved.com. Where the existing site lists
 * no specifications, none are invented; `specs` is left empty and the UI
 * invites an enquiry instead.
 */

export type CategoryId = "hygiene" | "gloves" | "drapes" | "cssd";

export interface ProductGalleryItem {
  src: string;
  alt: string;
  label: string;
}

export type ModelSpec =
  | { kind: "glove"; finish: "blue-nitrile" | "black-nitrile" | "white-latex" | "surgical" | "eva" }
  | { kind: "gown" }
  | { kind: "drape-kit"; tone: "blue" | "green" }
  | { kind: "wipes" }
  | { kind: "underpad" }
  | { kind: "cap" }
  | { kind: "shoe-cover" }
  | { kind: "mask" }
  | { kind: "reel" }
  | { kind: "wrap-sheet" }
  | { kind: "indicator" }
  | { kind: "label" }
  | { kind: "diaper"; variant?: "tape" | "pants" | "baby" };

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  features?: string[];
  specs: { label: string; value: string }[];
  applications?: string[];
  image?: string;
  gallery?: ProductGalleryItem[];
  model: ModelSpec;
}

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  summary: string;
  accent: string;
}

export const categories: Category[] = [
  {
    id: "hygiene",
    name: "AROSAFE Hygiene Care",
    short: "Hygiene Care",
    summary: "Adult premium tape & pant diapers, baby smart pants, wet wipes, under pads, caps, shoe covers and face masks.",
    accent: "#49a409",
  },
  {
    id: "gloves",
    name: "AROSAFE Gloves",
    short: "Gloves",
    summary: "Examination, sterile surgical and EVA gloves in nitrile, latex and EVA.",
    accent: "#024089",
  },
  {
    id: "drapes",
    name: "AROSAFE Surgical Drapes & Kits",
    short: "Drapes & Kits",
    summary: "Major and minor drape kits, LSCS kits, customised surgical drape kits and sterile surgeon gowns.",
    accent: "#0284c7",
  },
  {
    id: "cssd",
    name: "AROSAFE CSSD Products",
    short: "CSSD",
    summary: "Sterilization reels, wrapping sheets, indicators, tapes and labels.",
    accent: "#e96d0a",
  },
];

const store = { label: "Storage", value: "Store in a cool & dry place" };

export const products: Product[] = [
  /* ---------------------------- Hygiene ---------------------------- */
  {
    slug: "adult-diapers",
    name: "AROCARE Adult Diapers - Tape Type",
    category: "hygiene",
    tagline: "Care, Comfort and Dignity",
    description:
      "AROCARE Adult Diapers are designed for elderly individuals and patients who need regular assistance or continuous care. AROCARE helps manage incontinence while making everyday care more comfortable and convenient for both users and caregivers.",
    features: [
      "Reliable Absorption: Multi-layer Super Absorbent Polymer (SAP) gel core for rapid moisture lock",
      "Gentle Comfort: Skin-friendly breathable non-woven top sheet prevents friction and bedsores",
      "Care Made Easier: Double refastenable adhesive tapes for effortless adjustment and inspection",
      "Leak Protection: Hydrophobic standing leak guards prevent side leakage in all sleeping positions",
      "Dignity & Peace of Mind: Odour-control system continuously neutralises unpleasant odours for 12+ hours",
    ],
    specs: [
      { label: "Brand", value: "AROCARE (by Aroved)" },
      { label: "Style", value: "Tape Type (Refastenable double side tapes)" },
      { label: "Sizes Available", value: "Medium (M), Large (L), Extra Large (XL)" },
      { label: "Pack Type", value: "Mini Premium (10 Diapers / Pack)" },
      { label: "MRP", value: "M: ₹499 | L: ₹549 | XL: ₹599" },
      { label: "Absorbency", value: "Heavy to Maximum Overnight (Up to 12 Hours)" },
      { label: "Core Technology", value: "Gel Lock SAP Core with Quick-Dry Channels" },
      { label: "Applications", value: "Elderly Care, Incontinence Management, Post-Surgery, Palliative Care" },
      store,
    ],
    applications: ["Hospitals", "Senior Care Centres", "Post-Surgery Recovery", "Palliative Care", "Home Care"],
    image: "/images/products/diaper_adult_tape_hero.webp",
    gallery: [
      { src: "/images/products/diaper_adult_tape_hero.webp", alt: "AROCARE Adult Premium Tape Diaper 3D Product Overview", label: "Product Overview (Tape Style)" },
      { src: "/images/products/aroved_hygiene_family_range.webp", alt: "Aroved Complete Hygiene Range Showcase", label: "Aroved Care Range Lineup" },
      { src: "/images/products/diaper_arocare_poster_l.webp", alt: "AROCARE Adult Premium Tape Diapers Size L Official Pack Poster", label: "Size L Official Presentation" },
      { src: "/images/products/diaper_arocare_poster_m.webp", alt: "AROCARE Adult Premium Tape Diapers Size M Official Pack Poster", label: "Size M Official Presentation" },
      { src: "/images/products/diaper_arocare_poster_xl.webp", alt: "AROCARE Adult Premium Tape Diapers Size XL Official Pack Poster", label: "Size XL Official Presentation" },
    ],
    model: { kind: "diaper", variant: "tape" },
  },
  {
    slug: "adult-diaper-pants",
    name: "AROFIT Adult Diapers - Pant Type",
    category: "hygiene",
    tagline: "Comfort • Confidence • Mobility",
    description:
      "AROFIT Adult Diapers empower seniors and active individuals to enjoy daily routines, travel and social activities with confidence. Designed with a comfortable fit and soft, breathable materials, they ensure quick absorption and reliable leak protection. Live actively and enjoy every age with AROFIT.",
    features: [
      "Freedom of Movement: 360° flexible stretch waistband wears just like regular underwear",
      "Quick Absorption: High-capacity core draws moisture away in seconds keeping skin dry",
      "Breathable Comfort: Soft air-permeable fabric prevents heat and moisture build-up",
      "Reliable Leak Protection: Dual barrier leg cuffs prevent overflow during activity and sleep",
      "Confidence & Independence: Easy pull-up design with tear-away side seams for swift disposal",
    ],
    specs: [
      { label: "Brand", value: "AROFIT (by Aroved)" },
      { label: "Style", value: "Pant Type (Easy pull-up underwear design)" },
      { label: "Sizes Available", value: "Medium (M), Large (L), Extra Large (XL)" },
      { label: "Pack Type", value: "Mini Premium (10 Pants / Pack)" },
      { label: "MRP", value: "M: ₹499 | L: ₹549 | XL: ₹599" },
      { label: "Waist Fit", value: "360° Stretch Elastic Soft Waistband" },
      { label: "Applications", value: "Active Seniors, Travel, Day & Night Mobility, Post-Partum Care" },
      store,
    ],
    applications: ["Active Seniors", "Post-Partum Recovery", "Hospitals & Nursing Homes", "Assisted Living", "Day & Travel Use"],
    image: "/images/products/diaper_adult_pants_hero.webp",
    gallery: [
      { src: "/images/products/diaper_adult_pants_hero.webp", alt: "AROFIT Adult Premium Pant Diapers 3D Product Overview", label: "Product Overview (Pull-Up Pants)" },
      { src: "/images/products/aroved_hygiene_family_range.webp", alt: "Aroved Complete Hygiene Range Showcase", label: "Aroved Care Range Lineup" },
      { src: "/images/products/diaper_arofit_poster_l.webp", alt: "AROFIT Adult Premium Pant Diapers Size L Official Panel", label: "Size L Official Presentation" },
      { src: "/images/products/diaper_arofit_poster_xl.webp", alt: "AROFIT Adult Premium Pant Diapers Size XL Official Panel", label: "Size XL Official Presentation" },
    ],
    model: { kind: "diaper", variant: "pants" },
  },
  {
    slug: "baby-diaper-pants",
    name: "AROSAFE Baby Pant Diapers",
    category: "hygiene",
    tagline: "Your Baby's Lasting Comfort, Happy Moves - Our Priority",
    description:
      "Designed for growing, active babies, AROSAFE Pant-Style Baby Diapers offer a soft, comfortable fit that moves with your little one. AROSAFE helps protect your baby's delicate skin while allowing greater freedom to crawl, play and explore.",
    features: [
      "Easy Pull-Up Design: Convenient underwear style for effortless changes",
      "Snug, Flexible Fit: Adapts seamlessly to baby's natural crawling and movement",
      "Super Absorbent Core: Locks in moisture for up to 12 hours of uninterrupted dryness",
      "Leakage Protection: Deep hydrophobic barrier leg cuffs prevent side leakage",
      "Soft & Breathable: Micro-porous air channels keep skin cool, dry, and rash-free",
      "Everyday Skin Comfort: Ultra-gentle materials designed for sensitive baby skin",
    ],
    specs: [
      { label: "Brand", value: "AROSAFE (Baby Care)" },
      { label: "Style", value: "Pant Type (Pull-Up)" },
      { label: "Sizes & Pack Types", value: "Small (1's, 10's, 38's) | Medium (1's, 9's, 35's) | Large (8's, 32's)" },
      { label: "Pack Options", value: "Singles (1's) | Mini (8/9/10's) | Jumbo (32/35/38's)" },
      { label: "MRP Range", value: "Singles: ₹10–₹12 | Mini: ₹99 | Jumbo: ₹399" },
      { label: "Dryness Duration", value: "Up to 12 Hours Continuous Dryness" },
      store,
    ],
    applications: ["Growing Babies", "Toddlers", "Paediatric Wards", "Creches & Daycare", "Home Care"],
    image: "/images/products/diaper_baby_pants_hero.webp",
    gallery: [
      { src: "/images/products/diaper_baby_pants_hero.webp", alt: "AROSAFE Baby Pant Diapers 3D Product View", label: "Product Overview (Pant Diapers)" },
      { src: "/images/products/aroved_hygiene_family_range.webp", alt: "Aroved Complete Hygiene Range Showcase", label: "Aroved Care Range Lineup" },
      { src: "/images/products/diaper_baby_smartpants_m.webp", alt: "AROSAFE Smart Pants Size M Pack (35 Pants)", label: "Size M Jumbo Pack Presentation" },
      { src: "/images/products/diaper_baby_smartpants_l.webp", alt: "AROSAFE Smart Pants Size L Pack (32 Pants)", label: "Size L Jumbo Pack Presentation" },
    ],
    model: { kind: "diaper", variant: "baby" },
  },
  {
    slug: "baby-tape-diapers",
    name: "AROSAFE Baby Tape Diapers (New Born)",
    category: "hygiene",
    tagline: "Your Baby's Comfort, Our Priority",
    description:
      "AROSAFE Baby Diapers offers a perfect blend of softness, reliable absorption, and all-day comfort. Designed to keep your baby feeling dry, happy, and free to move. AROSAFE combines skin-friendly materials, a comfortable fit, dependable leak protection and easily fixable adhesive tape to make every moment worry-free for parents.",
    features: [
      "Soft & Gentle: Cloud-soft non-woven fabric tailored for newborn tender skin",
      "Quick Absorption: Rapid-wicking layer keeps moisture away immediately",
      "Leak Protection: Double elastic barriers prevent leaks from any angle",
      "Comfortable Fit: Gentle navel care notch and anatomical newborn contouring",
      "Everyday Value: Premium hospital-grade newborn protection at accessible pricing",
    ],
    specs: [
      { label: "Brand", value: "AROSAFE (Baby Care)" },
      { label: "Style", value: "Tape Type (Easily fixable adhesive side tapes)" },
      { label: "Size", value: "New Born (NB)" },
      { label: "Packs Available", value: "Mini 10's Pack (MRP ₹99) | Mini 12's Pack (MRP ₹199)" },
      { label: "Navel Care", value: "U-shaped umbilical cord comfort cut" },
      store,
    ],
    applications: ["Maternity Hospitals", "Neonatal & Paediatric Care", "Newborn Home Care"],
    image: "/images/products/diaper_baby_newborn.webp",
    gallery: [
      { src: "/images/products/diaper_baby_newborn.webp", alt: "AROSAFE Newborn Baby Tape Diapers 10 Pieces Official Pack", label: "Newborn 10's Pack Presentation" },
      { src: "/images/products/aroved_hygiene_family_range.webp", alt: "Aroved Complete Hygiene Range Showcase", label: "Aroved Care Range Lineup" },
    ],
    model: { kind: "diaper", variant: "baby" },
  },
  {
    slug: "wet-wipes",
    name: "AROWIPES Bed Bath Towels",
    category: "hygiene",
    tagline: "Antiseptic cleansing wet wipes — 32 cm × 32 cm",
    description:
      "AROWIPES Bed Bath Towels are non-alcoholic antiseptic wipes enriched with Chlorhexidine Gluconate 2%, cleansing and moisturising the skin gently while delivering rapid, long-lasting anti-bacterial action. Microwaveable for patient comfort.",
    features: [
      "2% Chlorhexidine Gluconate: Rapid broad-spectrum anti-microbial barrier",
      "Microwaveable: Warmable for comfortable clinical patient bed baths",
      "Enriched Moisturiser: Contains Glycerin and Allantoin for gentle skin conditioning",
      "pH Balanced & Alcohol-Free: Non-irritating for sensitive or geriatric skin",
      "Heavy-Duty Size: Generous 32 cm × 32 cm usable wet towels",
    ],
    specs: [
      { label: "Brand", value: "AROWIPES (by Aroved)" },
      { label: "Pack", value: "10 usable wet towels – 32 cm × 32 cm (MRP ₹450)" },
      { label: "Composition", value: "RO treated Aqua with Chlorhexidine Gluconate 2%, Glycerin 0.50%, Menthol 0.01%, Allantoin 0.02% & Fragrance 0.02%" },
      { label: "Properties", value: "Microwaveable, Anti-Bacterial, pH Balanced, Extra Soft, Alcohol Free" },
      store,
    ],
    applications: ["Hospitals", "ICUs & OTs", "Old Age Homes", "Palliative Care", "Home Patient Care"],
    image: "/images/products/hygiene_wipes_hero.webp",
    gallery: [
      { src: "/images/products/hygiene_wipes_hero.webp", alt: "AROSAFE Non-Alcoholic Antiseptic Wet Wipes", label: "Pack Presentation" },
      { src: "/images/products/hygiene_wipes_pack_official.webp", alt: "AroWipes Bed Bath Towels Official Hospital Packaging (10 Towels)", label: "AroWipes Official Pack (10 Wipes)" },
      { src: "/images/products/aroved_hygiene_family_range.webp", alt: "Aroved Complete Hygiene Range Showcase", label: "Aroved Care Range Lineup" },
    ],
    model: { kind: "wipes" },
  },
  {
    slug: "under-pads",
    name: "AROSAFE Under Pads",
    category: "hygiene",
    tagline: "Disposable classic under pads",
    description:
      "Disposable Classic Under Pads with Gel Lock Technology, enabling rapid absorption and quick drying — providing comfort to patients.",
    specs: [
      { label: "Size", value: "60 cm × 90 cm" },
      { label: "Packs", value: "Available in 10’s and 1’s" },
      { label: "Colour", value: "Blue" },
      store,
    ],
    applications: ["Hospitals", "Senior Care Centres", "Home Care"],
    image: "/images/products/hygiene_underpads_hero.webp",
    gallery: [
      { src: "/images/products/hygiene_underpads_hero.webp", alt: "AROSAFE Classic Under Pads Product Overview", label: "Product Overview" },
      { src: "/images/products/hygiene_underpads_core_arosafe.webp", alt: "AROSAFE Under Pads Gel Lock Absorbent Core", label: "Absorbent Core Detail" },
    ],
    model: { kind: "underpad" },
  },
  {
    slug: "bouffant-surgical-caps",
    name: "AROSAFE Bouffant & Surgical Caps",
    category: "hygiene",
    tagline: "Single-use, non-sterile",
    description:
      "Non-sterile bouffant caps intended to be worn by healthcare personnel during various procedures to protect patient/materials and the operating personnel from transfer of microorganisms, particulates, etc. Single-use and disposable.",
    features: [
      "Adjustable soft thread elastic for comfort fittings",
      "Sonic sealing",
      "Avoids escape of hair, dandruff and micro organisms during surgical process",
    ],
    specs: [
      { label: "Fabric", value: "Non-woven / PP" },
      { label: "Colours", value: "White, Blue" },
    ],
    image: "/images/products/hygiene_caps_dispenser_arosafe.webp",
    gallery: [
      { src: "/images/products/hygiene_caps_dispenser_arosafe.webp", alt: "AROSAFE Bouffant & Surgical Caps Dispenser Box", label: "Dispenser Box" },
      { src: "/images/products/hygiene_caps_macro_arosafe.webp", alt: "AROSAFE Bouffant Caps Elastic & Sonic Sealing Detail", label: "Fabric & Elastic Detail" },
    ],
    model: { kind: "cap" },
  },
  {
    slug: "shoe-covers",
    name: "AROSAFE Disposable Shoe Covers",
    category: "hygiene",
    tagline: "Slip resistant, elastic top",
    description:
      "Shoe covers, also called boot covers or overshoes, are designed to protect your flooring or your shoes from getting dirty.",
    features: ["Slip resistant"],
    specs: [
      { label: "Size", value: "Universal" },
      { label: "Height", value: "6 in" },
      { label: "Closure", value: "Elastic top" },
      { label: "Material", value: "Polypropylene" },
      { label: "Thickness", value: "5.5 mil" },
      { label: "Seam style", value: "Serged" },
    ],
    image: "/images/products/hygiene_shoecover_box_arosafe.webp",
    gallery: [
      { src: "/images/products/hygiene_shoecover_box_arosafe.webp", alt: "AROSAFE Disposable Shoe Covers Dispenser Box", label: "Dispenser Box" },
      { src: "/images/products/hygiene_shoecover_tread_arosafe.webp", alt: "AROSAFE Shoe Covers Non-Skid Tread Pattern", label: "Slip-Resistant Tread Detail" },
    ],
    model: { kind: "shoe-cover" },
  },
  {
    slug: "face-masks",
    name: "AROSAFE 3-Ply Face Masks",
    category: "hygiene",
    tagline: "3-ply, ear loop or tie",
    description:
      "Face masks provide protection from microbial inhalation and exhalation. Medical face masks are made of non-woven fabric with an in-built filter in the layers (melt-blown filter).",
    specs: [
      { label: "Variants", value: "3-Ply masks with ear loop; 3-Ply masks with tie (widely used by doctors and paramedical staff in OTs)" },
      { label: "Construction", value: "Non-woven fabric with melt-blown filter layer" },
    ],
    image: "/images/products/hygiene_facemask_box_arosafe.webp",
    gallery: [
      { src: "/images/products/hygiene_facemask_box_arosafe.webp", alt: "AROSAFE 3-Ply Face Masks Dispenser Box", label: "Dispenser Box" },
      { src: "/images/products/hygiene_facemask_filter_arosafe.webp", alt: "AROSAFE Face Masks Melt-Blown Filter Layer", label: "Melt-Blown Filter Detail" },
    ],
    model: { kind: "mask" },
  },

  /* ---------------------------- Gloves ---------------------------- */
  {
    slug: "nitrile-examination-gloves",
    name: "AROSAFE Nitrile Examination Gloves (Powder Free)",
    category: "gloves",
    tagline: "Blue nitrile, powder free",
    description:
      "AROSAFE Nitrile examination Gloves, manufactured in India under a state-of-the-art manufacturing process, are used as a good biological and chemical barrier.",
    specs: [
      { label: "Sizes", value: "Small / Medium / Large" },
      { label: "Colour", value: "Blue" },
      store,
    ],
    applications: ["Medical", "Dental", "Pharma", "Food"],
    image: "/images/products/glove_blue_front.webp",
    gallery: [
      { src: "/images/products/glove_blue_front.webp", alt: "AROSAFE Blue Nitrile Gloves Front View", label: "Front View" },
      { src: "/images/products/glove_blue_box_arosafe.webp", alt: "AROSAFE Blue Nitrile Examination Gloves Official Dispenser Box (100 Count)", label: "Dispenser Box (100 Count)" },
      { src: "/images/products/glove_blue_box_side_arosafe.webp", alt: "AROSAFE Blue Nitrile Gloves Box Specifications & Sizing Guide", label: "Box Specifications & Standards" },
      { src: "/images/products/glove_blue_45.webp", alt: "AROSAFE Blue Nitrile Gloves 45° Angle", label: "Isometric Angle" },
      { src: "/images/products/glove_blue_profile.webp", alt: "AROSAFE Blue Nitrile Gloves Profile View", label: "Profile View" },
      { src: "/images/products/glove_blue_angle1.webp", alt: "AROSAFE Blue Nitrile Gloves Detail View", label: "Tactile Grip Detail" },
    ],
    model: { kind: "glove", finish: "blue-nitrile" },
  },
  {
    slug: "black-nitrile-gloves",
    name: "AROSAFE Black Nitrile Gloves",
    category: "gloves",
    tagline: "Now available across India",
    description:
      "The latest innovation in our professional hygiene portfolio — AROSAFE Black Nitrile Gloves. Designed for demanding environments, these gloves combine durability, comfort, and style.",
    features: [
      "Superior Resistance: Exceptional protection against chemicals and punctures",
      "Comfort First: Latex-free and powder-free for reduced skin irritation",
      "Precision Grip: Enhanced tactile sensitivity and grip control",
      "Premium Aesthetic: Sleek matte black finish for a professional look",
    ],
    specs: [
      { label: "Colour", value: "Matte black" },
      { label: "Type", value: "Latex-free, powder-free" },
    ],
    applications: ["Healthcare", "Food Processing", "Industrial Operations", "Facility Management", "Hygiene-Critical Workspaces"],
    image: "/images/products/glove_black_hero.webp",
    gallery: [
      { src: "/images/products/glove_black_hero.webp", alt: "AROSAFE Black Nitrile Gloves Hero", label: "Product Hero" },
      { src: "/images/products/glove_black_box_official.webp", alt: "AROSAFE Black Nitrile Gloves Official Dispenser Box (100 Count)", label: "Dispenser Box (100 Count)" },
      { src: "/images/products/glove_black_box_back_official.webp", alt: "AROSAFE Black Nitrile Gloves Box Reverse & Specifications", label: "Box Specifications & AQL 1.5" },
      { src: "/images/products/glove_black_clinical_arosafe.webp", alt: "AROSAFE Black Nitrile Gloves Clinical In-Use", label: "Clinical In-Use" },
    ],
    model: { kind: "glove", finish: "black-nitrile" },
  },
  {
    slug: "latex-examination-gloves",
    name: "AROSAFE Latex Examination Gloves",
    category: "gloves",
    tagline: "Natural latex examination gloves",
    description:
      "AROSAFE Latex examination Gloves, manufactured in India under a state-of-the-art manufacturing process, provide optimal protection to hands and avoid cross contamination.",
    specs: [
      { label: "Sizes", value: "Extra Small / Small / Medium / Large" },
      { label: "Colour", value: "White" },
      store,
    ],
    applications: ["Medical", "Dental", "Pharma", "Food"],
    image: "/images/products/glove_latex_hero.webp",
    gallery: [
      { src: "/images/products/glove_latex_hero.webp", alt: "AROSAFE Latex Examination Gloves Hero", label: "Product Hero" },
      { src: "/images/products/glove_latex_box_official.webp", alt: "AROSAFE Latex Examination Gloves Official Dispenser Box (100 Count)", label: "Dispenser Box (100 Count)" },
      { src: "/images/products/glove_latex_box_back_official.webp", alt: "AROSAFE Latex Examination Gloves Box Reverse & Specifications", label: "Box Specifications & Standards" },
      { src: "/images/products/glove_latex_clinical_arosafe.webp", alt: "AROSAFE Latex Examination Gloves Clinical Setting", label: "Clinical Setting" },
    ],
    model: { kind: "glove", finish: "white-latex" },
  },
  {
    slug: "sterile-surgical-gloves",
    name: "AROSAFE Sterile Surgical Gloves",
    category: "gloves",
    tagline: "Powdered & powder free",
    description:
      "AROSAFE Latex Sterile Surgical Gloves, manufactured in India under a state-of-the-art manufacturing process. Available powdered and powder free.",
    specs: [
      { label: "Sizes", value: "6, 6.5, 7, 7.5 & 8" },
      { label: "Variants", value: "Powdered & Powder free" },
      { label: "Colour", value: "White" },
      store,
    ],
    applications: ["Hospitals", "Healthcare Centres"],
    image: "/images/products/glove_surgical_sterile_arosafe.webp",
    gallery: [
      { src: "/images/products/glove_surgical_sterile_arosafe.webp", alt: "AROSAFE Sterile Surgical Gloves Sterile Pair", label: "Sterile Presentation" },
      { src: "/images/products/glove_surgical_box_official.webp", alt: "AROSAFE Sterile Surgical Gloves Polymer Coated Powder Free Dispenser Box (50 Pairs)", label: "Dispenser Box (50 Pairs)" },
      { src: "/images/products/glove_surgical_box_side_official.webp", alt: "AROSAFE Sterile Surgical Gloves Box Manufacturer & Quality Standards", label: "Box Standards & Manufacturer" },
      { src: "/images/products/glove_surgical_pouch_arosafe.webp", alt: "AROSAFE Sterile Surgical Gloves Peel Pouch", label: "Sterile Peel Pouch" },
      { src: "/images/products/glove_surgical_or_arosafe.webp", alt: "AROSAFE Sterile Surgical Gloves Operating Theatre", label: "Operating Theatre" },
    ],
    model: { kind: "glove", finish: "surgical" },
  },
  {
    slug: "eva-sterile-gloves",
    name: "AROSAFE EVA Sterile Gloves",
    category: "gloves",
    tagline: "Transparent, ambidextrous",
    description:
      "AROSAFE EVA Gloves are widely used in healthcare centres as an alternative to Latex Sterile Gloves during the performance of short-term procedures. EVA Gloves are transparent.",
    features: ["Better Sensitivity", "No Allergic Effect", "Powder Free & Odourless", "Ambidextrous", "Easy to Wear", "Super Strength"],
    specs: [
      { label: "Sizes", value: "Small (6 – 6.5) / Medium (7 – 7.5)" },
      { label: "Packing", value: "50 pairs per box" },
      { label: "Colour", value: "Transparent" },
    ],
    applications: ["Healthcare Centres"],
    image: "/images/products/glove_eva_sterile_arosafe.webp",
    gallery: [
      { src: "/images/products/glove_eva_sterile_arosafe.webp", alt: "AROSAFE EVA Sterile Gloves Sterile Presentation", label: "Sterile Presentation" },
      { src: "/images/products/glove_eva_pouch_arosafe.webp", alt: "AROSAFE EVA Sterile Gloves Peel Pouch", label: "Sterile Pouch" },
      { src: "/images/products/glove_eva_tray_arosafe.webp", alt: "AROSAFE EVA Sterile Gloves Procedure Tray", label: "Procedure Tray" },
    ],
    model: { kind: "glove", finish: "eva" },
  },

  /* ---------------------------- Drapes ---------------------------- */
  {
    slug: "sterile-surgeon-gowns",
    name: "AROSAFE Sterile Surgeon Gowns",
    category: "drapes",
    tagline: "AROSAFE Gowns",
    description:
      "AROSAFE Sterile Surgeon Gowns for operating theatre use, part of our range of products essential for pre-operative and post-operative patient care.",
    specs: [],
    image: "/images/products/gown_surgeon_hero.webp",
    gallery: [
      { src: "/images/products/gown_surgeon_hero.webp", alt: "AROSAFE Sterile Surgeon Gown Hero View", label: "Front Hero View" },
      { src: "/images/products/gown_surgeon_pack_official.webp", alt: "AROSAFE Sterile Surgeon Gown Sealed Medical ETO Pack", label: "Official ETO Sterile Pack" },
      { src: "/images/products/gown_patient_pack_official.webp", alt: "AROSAFE Patient Gown & Cap Sealed Hospital Pack", label: "Patient Gown Pack" },
      { src: "/images/products/gown_surgeon_angle.webp", alt: "AROSAFE Sterile Surgeon Gown Angled View", label: "Angled OT View" },
    ],
    model: { kind: "gown" },
  },
  {
    slug: "major-drape-kit",
    name: "AROSAFE Major Drape Kit",
    category: "drapes",
    tagline: "AROSAFE Sterile Surgical Drapes",
    description: "AROSAFE Major Drape Kit — available along with various customised surgical drape kits in various sizes.",
    specs: [],
    image: "/images/products/drape_major_hero.webp",
    gallery: [
      { src: "/images/products/drape_major_hero.webp", alt: "AROSAFE Major Drape Kit Overview", label: "Kit Overview" },
      { src: "/images/products/drape_major_packaging_arosafe.webp", alt: "AROSAFE Major Drape Kit Sterile Packaging", label: "Sterile Packaging" },
      { src: "/images/products/drape_major_or_arosafe.webp", alt: "AROSAFE Major Drape Kit Operating Theatre Setup", label: "Operating Theatre Setup" },
    ],
    model: { kind: "drape-kit", tone: "blue" },
  },
  {
    slug: "minor-drape-kit",
    name: "AROSAFE Minor Drape Kit",
    category: "drapes",
    tagline: "Minor OT drape kit",
    description: "AROSAFE Minor Drape Kit — available along with various customised surgical drape kits in various sizes.",
    specs: [],
    image: "/images/products/drape_minor_pack_arosafe.webp",
    gallery: [
      { src: "/images/products/drape_minor_pack_arosafe.webp", alt: "AROSAFE Minor OT Drape Kit Sterile Pack", label: "Sterile Kit Pack" },
      { src: "/images/products/drape_minor_kit_official.webp", alt: "AROSAFE Minor OT Drape Kit Official Sealed Sterile Pack", label: "Official Sealed Sterile Pack" },
      { src: "/images/products/drape_minor_or_arosafe.webp", alt: "AROSAFE Minor Drape Kit Procedure Setup", label: "Operating Theatre Setup" },
    ],
    model: { kind: "drape-kit", tone: "green" },
  },
  {
    slug: "lscs-kit",
    name: "AROSAFE LSCS Kit",
    category: "drapes",
    tagline: "Surgical drape kit",
    description: "AROSAFE LSCS Kit, part of the AROSAFE Surgical Drapes & Kits range.",
    specs: [],
    image: "/images/products/drape_lscs_hero_arosafe.webp",
    gallery: [
      { src: "/images/products/drape_lscs_hero_arosafe.webp", alt: "AROSAFE LSCS Surgical Drape Kit Hero", label: "Hero View" },
      { src: "/images/products/drape_lscs_pack_arosafe.webp", alt: "AROSAFE LSCS Kit Components and Pack", label: "Pack & Components" },
    ],
    model: { kind: "drape-kit", tone: "blue" },
  },

  /* ----------------------------- CSSD ----------------------------- */
  {
    slug: "sterilization-reels",
    name: "AROSAFE Sterilization Reels",
    category: "cssd",
    tagline: "5 cm to 50 cm",
    description:
      "AROSAFE Sterilization Reels provide protection against contamination of all types of medical devices and surgical drapes with bacteria and chemicals. Available in different sizes to suit the requirement of CSSD.",
    specs: [{ label: "Sizes", value: "5 cm to 50 cm" }, store],
    applications: ["Hospitals", "Sterile Product Manufacturers", "CSSD Departments"],
    image: "/images/products/cssd_reels_hero.webp",
    gallery: [
      { src: "/images/products/cssd_reels_hero.webp", alt: "AROSAFE Sterilization Reels Range", label: "Sterilization Reels" },
      { src: "/images/products/cssd_reels_real_1.webp", alt: "AROSAFE Sterilization Reels Physical Product Roll Detail", label: "Production Roll Detail" },
      { src: "/images/products/cssd_reels_real_2.webp", alt: "AROSAFE Sterilization Reels Packaging & Indicator Strip", label: "Sterile Packaging Inspection" },
    ],
    model: { kind: "reel" },
  },
  {
    slug: "wrapping-sheets",
    name: "AROSAFE CSSD Wrapping Sheets",
    category: "cssd",
    tagline: "50 cm to 150 cm",
    description:
      "AROSAFE Wrapping sheets, manufactured in India under a state-of-the-art manufacturing process, are widely used in hospitals to cover beds and to wrap instruments and devices in the sterilisation process.",
    specs: [
      { label: "Sizes", value: "50 cm to 150 cm" },
      { label: "Colour", value: "Blue" },
    ],
    applications: ["Hospitals", "CSSD Departments"],
    image: "/images/products/cssd_wrap_tray_arosafe.webp",
    gallery: [
      { src: "/images/products/cssd_wrap_tray_arosafe.webp", alt: "AROSAFE CSSD Wrapping Sheet on Tray", label: "Instrument Tray Wrap" },
      { src: "/images/products/cssd_wrap_stack_arosafe.webp", alt: "AROSAFE CSSD Wrapping Sheets Stack", label: "Sheet Stack & Texture" },
    ],
    model: { kind: "wrap-sheet" },
  },
  {
    slug: "sterilization-indicators-tapes",
    name: "AROSAFE Sterilization Indicators & Tapes",
    category: "cssd",
    tagline: "Monitor the sterilisation process",
    description:
      "Sterilisation Indicators are used widely by a variety of labs, hospitals and infection control departments to monitor and control the process of sterilisation.",
    specs: [
      { label: "Types", value: "Chemical indicators (Class 1–6 types), Biological indicators, Autoclave tape, Visual indicators" },
    ],
    applications: ["Labs", "Hospitals", "Infection Control Departments"],
    image: "/images/products/cssd_indicator_dual_arosafe.webp",
    gallery: [
      { src: "/images/products/cssd_indicator_dual_arosafe.webp", alt: "AROSAFE Chemical Sterilization Indicator Strips", label: "Indicator Strips (Process Transition)" },
      { src: "/images/products/cssd_indicator_box_arosafe.webp", alt: "AROSAFE Sterilization Indicator Dispenser Box", label: "Dispenser Box" },
    ],
    model: { kind: "indicator" },
  },
  {
    slug: "labels",
    name: "AROSAFE CSSD Labels",
    category: "cssd",
    tagline: "CSSD labelling",
    description: "AROSAFE Labels, part of the AROSAFE CSSD Products range.",
    specs: [],
    image: "/images/products/cssd_labels_roll_arosafe.webp",
    gallery: [
      { src: "/images/products/cssd_labels_roll_arosafe.webp", alt: "AROSAFE CSSD Labels Roll", label: "Label Roll" },
      { src: "/images/products/cssd_labels_dispenser_arosafe.webp", alt: "AROSAFE CSSD Labels Dispenser", label: "Applicator / Dispenser" },
      { src: "/images/products/cssd_labels_pack_arosafe.webp", alt: "AROSAFE CSSD Labels Pack", label: "Packaging Pack" },
    ],
    model: { kind: "label" },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const productsIn = (id: CategoryId) => products.filter((p) => p.category === id);
