import os

OUT_DIR_PUBLIC = r"E:\Aroved Full Templates\Aroved- Temp3\public\concepts"
OUT_DIR_ARTIFACT = r"C:\Users\mchin\.gemini\antigravity\brain\0846d6ce-f38a-4b13-9a2e-2764bd54a338"
os.makedirs(OUT_DIR_PUBLIC, exist_ok=True)
os.makedirs(OUT_DIR_ARTIFACT, exist_ok=True)

# Common SVG elements: Navbar, Hero typography, CTA buttons, Stats, 3D Glove Duo & Orbiting items
def get_common_overlay():
    return """
  <!-- Top Navbar Header (Dark Obsidian Capsule) -->
  <g id="navbar" transform="translate(320, 24)">
    <rect width="1280" height="60" rx="30" fill="#071126" fill-opacity="0.92" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" filter="drop-shadow(0 12px 30px rgba(0,0,0,0.6))" />
    
    <!-- Logo -->
    <g transform="translate(32, 14)">
      <!-- Aroved Geometric Logo Mark -->
      <path d="M0 16 L12 0 L24 8 L16 28 L4 24 Z" fill="#18b8e0" />
      <path d="M12 0 L24 8 L20 22 L10 18 Z" fill="#4f6fd6" opacity="0.85" />
      <path d="M4 24 L16 28 L10 32 L0 16 Z" fill="#0f2c8f" opacity="0.9" />
      <text x="36" y="20" font-family="Inter, Sora, sans-serif" font-size="14" font-weight="800" fill="#ffffff" letter-spacing="2">AROSAFE</text>
      <text x="36" y="30" font-family="Inter, Sora, sans-serif" font-size="8" font-weight="600" fill="#9be3f5" letter-spacing="3">HEALTHCARE</text>
    </g>

    <!-- Nav Links -->
    <g transform="translate(340, 35)" font-family="Inter, sans-serif" font-size="13" font-weight="500">
      <rect x="-16" y="-18" width="68" height="32" rx="16" fill="#ffffff" fill-opacity="0.08" />
      <text x="0" y="2" fill="#9be3f5" font-weight="600">Home</text>
      <text x="80" y="2" fill="#ffffff" fill-opacity="0.8">About</text>
      <text x="150" y="2" fill="#ffffff" fill-opacity="0.8">Products ▾</text>
      <text x="245" y="2" fill="#ffffff" fill-opacity="0.8">Expertise</text>
      <text x="330" y="2" fill="#ffffff" fill-opacity="0.8">Why Aroved</text>
      <text x="430" y="2" fill="#ffffff" fill-opacity="0.8">Contact</text>
    </g>

    <!-- Right Contact & Enquire Button -->
    <g transform="translate(1040, 16)">
      <text x="-40" y="20" font-family="Inter, sans-serif" font-size="12" font-weight="500" fill="#ffffff" fill-opacity="0.65">+91 6366939345</text>
      <rect x="110" y="-2" width="102" height="36" rx="18" fill="#ffffff" filter="drop-shadow(0 2px 10px rgba(255,255,255,0.25))" />
      <text x="161" y="21" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#071631" text-anchor="middle">Enquire</text>
    </g>
  </g>

  <!-- Left Column: Hero Content -->
  <g id="hero-copy" transform="translate(120, 240)">
    <!-- Subtitle pill -->
    <g>
      <circle cx="6" cy="6" r="3.5" fill="#18b8e0" />
      <circle cx="6" cy="6" r="7" fill="#18b8e0" fill-opacity="0.25" />
      <text x="24" y="10" font-family="monospace" font-size="11" font-weight="600" fill="#9be3f5" letter-spacing="3">A HEALTHCARE ENTERPRISE · AROSAFE</text>
    </g>

    <!-- Main Headline -->
    <text x="0" y="90" font-family="Sora, Inter, sans-serif" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Infection control,</text>
    <text x="0" y="165" font-family="Sora, Inter, sans-serif" font-size="64" font-weight="800" fill="#9be3f5" letter-spacing="-1.5" filter="drop-shadow(0 0 30px rgba(24,184,224,0.4))">engineered</text>
    <text x="0" y="240" font-family="Sora, Inter, sans-serif" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="-1.5">for care.</text>

    <!-- Paragraph Description -->
    <text x="0" y="305" font-family="Inter, sans-serif" font-size="16" fill="#ffffff" fill-opacity="0.75" width="480">
      <tspan x="0" dy="0">Aroved Healthcare Pvt Ltd delivers a complete range</tspan>
      <tspan x="0" dy="26">of infection control products under our brand AROSAFE® —</tspan>
      <tspan x="0" dy="26">enhancing service quality for hospitals, customers and patients.</tspan>
    </text>

    <!-- CTA Buttons -->
    <g transform="translate(0, 410)">
      <!-- Primary Pill -->
      <rect width="230" height="52" rx="26" fill="#ffffff" filter="drop-shadow(0 4px 16px rgba(0,0,0,0.4))" />
      <text x="28" y="32" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#071631">Enter the product universe</text>
      <circle cx="198" cy="26" r="12" fill="#071631" />
      <path d="M194 26 L202 26 M198 22 L202 26 L198 30" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Secondary Pill -->
      <rect x="250" width="160" height="52" rx="26" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1" />
      <text x="330" y="32" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">Request a quote</text>
    </g>

    <!-- Stats Bar at Bottom Left -->
    <g transform="translate(0, 540)">
      <g>
        <text x="0" y="30" font-family="Sora, Inter, sans-serif" font-size="34" font-weight="800" fill="#ffffff">20</text>
        <text x="0" y="48" font-family="monospace" font-size="10" font-weight="600" fill="#ffffff" fill-opacity="0.5" letter-spacing="1">YEARS EXPERIENCE</text>
      </g>
      <g transform="translate(130, 0)">
        <text x="0" y="30" font-family="Sora, Inter, sans-serif" font-size="34" font-weight="800" fill="#ffffff">250<tspan fill="#18b8e0">+</tspan></text>
        <text x="0" y="48" font-family="monospace" font-size="10" font-weight="600" fill="#ffffff" fill-opacity="0.5" letter-spacing="1">HOSPITALS</text>
      </g>
      <g transform="translate(270, 0)">
        <text x="0" y="30" font-family="Sora, Inter, sans-serif" font-size="34" font-weight="800" fill="#ffffff">500<tspan fill="#18b8e0">+</tspan></text>
        <text x="0" y="48" font-family="monospace" font-size="10" font-weight="600" fill="#ffffff" fill-opacity="0.5" letter-spacing="1">DISTRIBUTORS</text>
      </g>
    </g>
  </g>

  <!-- Right Column: 3D Glove Duo & Orbiting Products Representation -->
  <g id="hero-gloves-and-orbit" transform="translate(1340, 560)">
    <!-- Orbit Ellipse Guide -->
    <ellipse cx="0" cy="0" rx="340" ry="140" fill="none" stroke="#18b8e0" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="4 6" />

    <!-- Glove Duo Representation -->
    <g id="gloves" transform="translate(0, 0)">
      <!-- Blue Nitrile Glove (Left) -->
      <g transform="translate(-110, -60)">
        <path d="M-50 -140 Q-55 -210 -40 -210 Q-25 -210 -30 -140 L-30 -130 Q-20 -230 -5 -230 Q10 -230 5 -130 L5 -120 Q15 -220 30 -220 Q45 -220 40 -125 L40 -115 Q50 -195 65 -195 Q80 -195 70 -110 L65 -20 Q70 60 45 130 Q20 180 -10 180 Q-40 180 -60 130 Q-80 60 -70 -20 Q-95 -40 -95 -80 Q-95 -110 -75 -100 Q-60 -90 -50 -70 Z" fill="url(#blueGloveGrad)" filter="drop-shadow(0 20px 40px rgba(10,50,140,0.6))" />
        <path d="M-60 130 C-40 180 20 180 45 130 L40 150 C15 200 -35 200 -55 150 Z" fill="#d8efff" opacity="0.6" />
      </g>

      <!-- Black Surgical Glove (Right) -->
      <g transform="translate(110, -30)">
        <path d="M-40 -130 Q-45 -200 -30 -200 Q-15 -200 -20 -130 L-20 -120 Q-10 -220 5 -220 Q20 -220 15 -120 L15 -110 Q25 -210 40 -210 Q55 -210 50 -115 L50 -105 Q60 -185 75 -185 Q90 -185 80 -100 L75 -10 Q80 70 55 140 Q30 190 0 190 Q-30 190 -50 140 Q-70 70 -60 -10 Q-85 -30 -85 -70 Q-85 -100 -65 -90 Q-50 -80 -40 -60 Z" fill="url(#blackGloveGrad)" filter="drop-shadow(0 20px 40px rgba(0,0,0,0.8))" />
        <path d="M-50 140 C-30 190 30 190 55 140 L50 160 C25 210 -25 210 -45 160 Z" fill="#4a5568" opacity="0.5" />
      </g>
    </g>

    <!-- 5 Orbiting Products around the gloves -->
    <!-- 1. Wet Wipes Box (Far Left) -->
    <g transform="translate(-320, -50)">
      <rect width="80" height="48" rx="8" fill="#ffffff" stroke="#18b8e0" stroke-width="1.5" filter="drop-shadow(0 10px 25px rgba(0,0,0,0.6))" />
      <rect x="25" y="8" width="30" height="12" rx="4" fill="#18b8e0" />
      <text x="40" y="36" font-family="Inter, sans-serif" font-size="8" font-weight="800" fill="#071631" text-anchor="middle">WET WIPES</text>
    </g>

    <!-- 2. Bouffant Cap (Top Left) -->
    <g transform="translate(-160, -160)">
      <ellipse cx="40" cy="25" rx="42" ry="22" fill="#4baee0" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.5))" />
      <ellipse cx="40" cy="30" rx="36" ry="6" fill="#18b8e0" opacity="0.8" />
    </g>

    <!-- 3. Sterilization Reel (Top Right) -->
    <g transform="translate(180, -170)">
      <circle cx="35" cy="35" r="32" fill="#d8eefc" stroke="#18b8e0" stroke-width="2" filter="drop-shadow(0 10px 25px rgba(0,0,0,0.6))" />
      <circle cx="35" cy="35" r="14" fill="#071631" />
      <circle cx="35" cy="35" r="7" fill="#18b8e0" />
    </g>

    <!-- 4. Surgical Drape Kit (Far Right) -->
    <g transform="translate(280, 20)">
      <rect width="80" height="60" rx="6" fill="#1a44c9" stroke="#5fdcff" stroke-width="1.2" filter="drop-shadow(0 12px 30px rgba(0,0,0,0.7))" />
      <circle cx="40" cy="30" r="14" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="40" y="52" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">SURGICAL DRAPE</text>
    </g>

    <!-- 5. 3-Ply Face Mask (Bottom Center-Front) -->
    <g transform="translate(-40, 110)">
      <rect width="90" height="50" rx="6" fill="#5fdcff" stroke="#ffffff" stroke-width="1" filter="drop-shadow(0 12px 30px rgba(0,0,0,0.6))" />
      <line x1="8" y1="16" x2="82" y2="16" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.5" />
      <line x1="8" y1="25" x2="82" y2="25" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.5" />
      <line x1="8" y1="34" x2="82" y2="34" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.5" />
      <path d="M0 12 C-15 15 -15 35 0 38" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.8" />
      <path d="M90 12 C105 15 105 35 90 38" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.8" />
    </g>
  </g>
"""

# ==============================================================================
# CONCEPT 1: Laminar Cleanroom Airflow & ISO Class 5 Barrier Currents
# ==============================================================================
def make_concept_1():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#030712">
  <defs>
    <!-- Gradients -->
    <radialGradient id="c1_bg" cx="70%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#07183d" />
      <stop offset="45%" stop-color="#040b1e" />
      <stop offset="85%" stop-color="#02050e" />
    </radialGradient>
    <linearGradient id="c1_stream1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18b8e0" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#1a44c9" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#18b8e0" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="c1_stream2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5fdcff" stop-opacity="0.4" />
      <stop offset="60%" stop-color="#0f2c8f" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#5fdcff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="blueGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ad2ff" />
      <stop offset="30%" stop-color="#2196f3" />
      <stop offset="80%" stop-color="#0d47a1" />
      <stop offset="100%" stop-color="#072b6b" />
    </linearGradient>
    <linearGradient id="blackGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#525d6b" />
      <stop offset="40%" stop-color="#2d3748" />
      <stop offset="85%" stop-color="#1a202c" />
      <stop offset="100%" stop-color="#0f141d" />
    </linearGradient>
  </defs>

  <!-- 1. Base Dark Background -->
  <rect width="1920" height="1080" fill="url(#c1_bg)" />

  <!-- 2. Laminar Flow Cleanroom Streamlines (Curved Aero Airflow Vectors) -->
  <g id="laminar-streams">
    <!-- Stream Ribbon 1 -->
    <path d="M 600 -100 C 1100 200, 1400 350, 2050 300" fill="none" stroke="url(#c1_stream1)" stroke-width="1.8" opacity="0.6" />
    <path d="M 500 -100 C 1050 220, 1380 380, 2050 340" fill="none" stroke="url(#c1_stream1)" stroke-width="1.2" opacity="0.45" />
    <path d="M 400 -100 C 1000 240, 1360 410, 2050 380" fill="none" stroke="url(#c1_stream1)" stroke-width="2.5" opacity="0.3" />

    <!-- Stream Ribbon 2 (Flowing across behind gloves) -->
    <path d="M 800 1150 C 1200 850, 1450 650, 2050 550" fill="none" stroke="url(#c1_stream2)" stroke-width="2.0" opacity="0.5" />
    <path d="M 720 1150 C 1150 880, 1420 680, 2050 590" fill="none" stroke="url(#c1_stream2)" stroke-width="1.2" opacity="0.35" />
    <path d="M 640 1150 C 1100 910, 1390 710, 2050 630" fill="none" stroke="url(#c1_stream2)" stroke-width="3.0" opacity="0.25" />

    <!-- Wave 3: Subtle upper laminar barrier -->
    <path d="M 0 350 C 600 280, 1200 450, 1920 220" fill="none" stroke="#18b8e0" stroke-width="1.0" stroke-dasharray="8 12" opacity="0.25" />
    <path d="M 0 420 C 600 350, 1200 520, 1920 290" fill="none" stroke="#4f6fd6" stroke-width="1.0" opacity="0.2" />

    <!-- ISO Cleanroom Micro Particles Flowing along streamlines -->
    <g fill="#9be3f5" opacity="0.6">
      <circle cx="1120" cy="240" r="2.5" />
      <circle cx="1250" cy="310" r="1.8" />
      <circle cx="1400" cy="380" r="3.0" filter="drop-shadow(0 0 6px #18b8e0)" />
      <circle cx="1580" cy="420" r="2.0" />
      <circle cx="1080" cy="720" r="2.2" />
      <circle cx="1220" cy="650" r="3.2" filter="drop-shadow(0 0 6px #18b8e0)" />
      <circle cx="1380" cy="590" r="1.8" />
      <circle cx="1540" cy="550" r="2.4" />
    </g>

    <!-- Cleanroom Technical Coordinate Markers -->
    <g font-family="monospace" font-size="10" fill="#18b8e0" opacity="0.45" letter-spacing="2">
      <text x="120" y="160">ISO 14644-1 CLASS 5 CLEANROOM</text>
      <text x="120" y="175">AIR VELOCITY: 0.45 m/s ± 20% · UNIDIRECTIONAL LAMINAR</text>
      <text x="1450" y="160">FILTER EFFICIENCY: 99.997% @ 0.3μm HEPA</text>
      <text x="1450" y="175">STERILE ZONE: ACTIVE POSITIVE PRESSURE</text>
      <text x="1450" y="980">AIR CHANGE RATE: 300 ACH · CORE COMPLIANT</text>
    </g>
  </g>

  <!-- 3. Superimposed Hero Elements -->
  {get_common_overlay()}
</svg>"""

# ==============================================================================
# CONCEPT 2: Molecular Nitrile Polymer & Hexagonal Defense Matrix
# ==============================================================================
def make_concept_2():
    # Generate Hex Grid
    hex_nodes = []
    # Centered on the right half
    r = 38
    w = 65.8  # r * sqrt(3)
    for col in range(9):
        for row in range(12):
            cx = 1050 + col * w * 0.95
            cy = 150 + row * r * 1.5 + (r * 0.75 if col % 2 == 1 else 0)
            opacity = 0.04 + (0.16 * (1.0 - abs(col - 4) / 5.0) * (1.0 - abs(row - 6) / 7.0))
            # draw polygon points
            points = " ".join([f"{cx + r * 0.866 * (0 if i in [0,3] else (1 if i in [1,2] else -1))},{cy + r * (1 if i==1 or i==5 else (0.5 if i==2 or i==4 else -0.5 if i==0 else -1))}" for i in range(6)])
            hex_nodes.append(f'<polygon points="{cx},{cy-r*0.6} {cx+w*0.4},{cy-r*0.3} {cx+w*0.4},{cy+r*0.3} {cx},{cy+r*0.6} {cx-w*0.4},{cy+r*0.3} {cx-w*0.4},{cy-r*0.3}" fill="none" stroke="#18b8e0" stroke-width="1" stroke-opacity="{opacity:.3f}" />')
            if (col + row) % 3 == 0 and opacity > 0.1:
                hex_nodes.append(f'<circle cx="{cx}" cy="{cy}" r="2" fill="#5fdcff" fill-opacity="{opacity*1.5:.2f}" />')
    hex_svg = "\n    ".join(hex_nodes)

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#02050f">
  <defs>
    <radialGradient id="c2_bg" cx="68%" cy="48%" r="70%">
      <stop offset="0%" stop-color="#061230" />
      <stop offset="50%" stop-color="#03081a" />
      <stop offset="90%" stop-color="#010309" />
    </radialGradient>
    <linearGradient id="blueGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ad2ff" />
      <stop offset="30%" stop-color="#2196f3" />
      <stop offset="80%" stop-color="#0d47a1" />
      <stop offset="100%" stop-color="#072b6b" />
    </linearGradient>
    <linearGradient id="blackGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#525d6b" />
      <stop offset="40%" stop-color="#2d3748" />
      <stop offset="85%" stop-color="#1a202c" />
      <stop offset="100%" stop-color="#0f141d" />
    </linearGradient>
  </defs>

  <!-- 1. Base Dark Background -->
  <rect width="1920" height="1080" fill="url(#c2_bg)" />

  <!-- 2. Molecular Polymer & Hexagonal Barrier Matrix -->
  <g id="molecular-matrix">
    {hex_svg}

    <!-- Crosslinked polymer chain lines -->
    <path d="M 880 320 L 1150 280 L 1380 420 L 1620 380 L 1880 520" fill="none" stroke="#4f6fd6" stroke-width="1.8" stroke-opacity="0.35" stroke-dasharray="6 8" />
    <path d="M 940 760 L 1180 680 L 1420 820 L 1680 750 L 1860 880" fill="none" stroke="#18b8e0" stroke-width="1.8" stroke-opacity="0.3" stroke-dasharray="6 8" />

    <!-- Chemical / Polymer Formulation Telemetry -->
    <g font-family="monospace" font-size="10" fill="#9be3f5" opacity="0.4" letter-spacing="2">
      <text x="120" y="160">NBR POLYMER MATRIX [ACRYLONITRILE-BUTADIENE]</text>
      <text x="120" y="175">BARRIER INTEGRITY: AQL 1.5 EN 455-1 / ASTM D6319</text>
      <text x="1080" y="160">MOLECULAR CROSSLINKING: SULFUR/ZINC ACCELERATED</text>
      <text x="1080" y="980">PINHOLE FREE DEFENSE · VIRAL PENETRATION PASS (ASTM F1671)</text>
    </g>
  </g>

  <!-- 3. Superimposed Hero Elements -->
  {get_common_overlay()}
</svg>"""

# ==============================================================================
# CONCEPT 3: AROSAFE Geometric Facets & Architectural Diamond Shield
# ==============================================================================
def make_concept_3():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#030611">
  <defs>
    <radialGradient id="c3_bg" cx="72%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#08183e" />
      <stop offset="50%" stop-color="#040b1e" />
      <stop offset="90%" stop-color="#02040c" />
    </radialGradient>
    <linearGradient id="f1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18b8e0" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#0f2c8f" stop-opacity="0.04" />
    </linearGradient>
    <linearGradient id="f2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4f6fd6" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#18b8e0" stop-opacity="0.05" />
    </linearGradient>
    <linearGradient id="f3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1a44c9" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#5fdcff" stop-opacity="0.06" />
    </linearGradient>
    <linearGradient id="blueGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ad2ff" />
      <stop offset="30%" stop-color="#2196f3" />
      <stop offset="80%" stop-color="#0d47a1" />
      <stop offset="100%" stop-color="#072b6b" />
    </linearGradient>
    <linearGradient id="blackGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#525d6b" />
      <stop offset="40%" stop-color="#2d3748" />
      <stop offset="85%" stop-color="#1a202c" />
      <stop offset="100%" stop-color="#0f141d" />
    </linearGradient>
  </defs>

  <!-- 1. Base Dark Background -->
  <rect width="1920" height="1080" fill="url(#c3_bg)" />

  <!-- 2. Architectural Polygonal Facets (Derived from Aroved Logo Mark) -->
  <g id="brand-facets" transform="translate(1320, 520)">
    <!-- Giant subtle protective diamond prism backdrop -->
    <polygon points="-380,-340 0,-420 380,-300 460,180 120,440 -340,320" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1.5" />
    
    <!-- Facet A -->
    <polygon points="-380,-340 0,-420 20,-40 -240,-20" fill="url(#f1)" stroke="#18b8e0" stroke-opacity="0.25" stroke-width="1" />
    <!-- Facet B -->
    <polygon points="0,-420 380,-300 240,60 20,-40" fill="url(#f2)" stroke="#5fdcff" stroke-opacity="0.3" stroke-width="1.2" />
    <!-- Facet C -->
    <polygon points="380,-300 460,180 120,440 240,60" fill="url(#f3)" stroke="#1a44c9" stroke-opacity="0.35" stroke-width="1" />
    <!-- Facet D -->
    <polygon points="-380,-340 -240,-20 -340,320" fill="url(#f2)" stroke="#18b8e0" stroke-opacity="0.2" stroke-width="1" />
    <!-- Facet E (Center base under gloves) -->
    <polygon points="-240,-20 20,-40 240,60 120,440 -340,320" fill="url(#f1)" stroke="#4f6fd6" stroke-opacity="0.2" stroke-width="1" />

    <!-- Radiant Prism Ray Lines -->
    <line x1="0" y1="-420" x2="-240" y2="-20" stroke="#18b8e0" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="4 6" />
    <line x1="20" y1="-40" x2="120" y2="440" stroke="#5fdcff" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="4 6" />
    <circle cx="20" cy="-40" r="4" fill="#ffffff" filter="drop-shadow(0 0 10px #18b8e0)" />
    <circle cx="240" cy="60" r="3" fill="#18b8e0" />
    <circle cx="-240" cy="-20" r="3" fill="#5fdcff" />

    <!-- Geometric Branding Telemetry -->
    <g font-family="monospace" font-size="10" fill="#9be3f5" opacity="0.4" letter-spacing="2">
      <text x="-480" y="-360">AROSAFE SHIELD GEOMETRY: FACET α-7</text>
      <text x="-480" y="-345">PRISMATIC DEFENSE ARCHITECTURE</text>
      <text x="180" y="460">SYMMETRIC DUAL-BARRIER VECTOR</text>
    </g>
  </g>

  <!-- 3. Superimposed Hero Elements -->
  {get_common_overlay()}
</svg>"""

# ==============================================================================
# CONCEPT 4: Surgical OT Perspective Matrix & Precision Depth Coordinates
# ==============================================================================
def make_concept_4():
    # Generate 3D perspective grid lines
    grid_lines = []
    # Converging perspective lines from horizon at y=520, x=1340
    hx, hy = 1340, 480
    for i in range(-12, 13):
        bx = hx + i * 90
        grid_lines.append(f'<line x1="{hx + i * 8}" y1="{hy}" x2="{bx * 1.6 - 400}" y2="1080" stroke="#18b8e0" stroke-opacity="{max(0.04, 0.22 - abs(i)*0.012):.3f}" stroke-width="1.2" />')
    # Horizontal grid rungs with exponential depth spacing
    for d in [0.05, 0.12, 0.22, 0.35, 0.52, 0.73, 1.0]:
        y = hy + (1080 - hy) * (d ** 1.8)
        opacity = 0.06 + d * 0.18
        grid_lines.append(f'<line x1="500" y1="{y:.1f}" x2="1920" y2="{y:.1f}" stroke="#4f6fd6" stroke-opacity="{opacity:.3f}" stroke-width="1" />')
    grid_svg = "\n    ".join(grid_lines)

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#02050e">
  <defs>
    <radialGradient id="c4_bg" cx="70%" cy="48%" r="70%">
      <stop offset="0%" stop-color="#061230" />
      <stop offset="50%" stop-color="#030818" />
      <stop offset="90%" stop-color="#010308" />
    </radialGradient>
    <linearGradient id="blueGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ad2ff" />
      <stop offset="30%" stop-color="#2196f3" />
      <stop offset="80%" stop-color="#0d47a1" />
      <stop offset="100%" stop-color="#072b6b" />
    </linearGradient>
    <linearGradient id="blackGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#525d6b" />
      <stop offset="40%" stop-color="#2d3748" />
      <stop offset="85%" stop-color="#1a202c" />
      <stop offset="100%" stop-color="#0f141d" />
    </linearGradient>
  </defs>

  <!-- 1. Base Dark Background -->
  <rect width="1920" height="1080" fill="url(#c4_bg)" />

  <!-- 2. Surgical OT Depth Grid & Alignment Reticles -->
  <g id="ot-grid">
    {grid_svg}

    <!-- Surgical Target Reticle around the Glove Stage -->
    <g transform="translate(1340, 520)">
      <circle cx="0" cy="0" r="320" fill="none" stroke="#18b8e0" stroke-opacity="0.15" stroke-width="1" stroke-dasharray="8 8" />
      <circle cx="0" cy="0" r="220" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
      <!-- Crosshairs -->
      <line x1="-360" y1="0" x2="-280" y2="0" stroke="#18b8e0" stroke-opacity="0.4" stroke-width="1.5" />
      <line x1="280" y1="0" x2="360" y2="0" stroke="#18b8e0" stroke-opacity="0.4" stroke-width="1.5" />
      <line x1="0" y1="-340" x2="0" y2="-270" stroke="#18b8e0" stroke-opacity="0.4" stroke-width="1.5" />
      <line x1="0" y1="270" x2="0" y2="340" stroke="#18b8e0" stroke-opacity="0.4" stroke-width="1.5" />

      <!-- Corner brackets -->
      <path d="M -300 -220 L -330 -220 L -330 -190" fill="none" stroke="#5fdcff" stroke-width="2" opacity="0.6" />
      <path d="M 300 -220 L 330 -220 L 330 -190" fill="none" stroke="#5fdcff" stroke-width="2" opacity="0.6" />
      <path d="M -300 220 L -330 220 L -330 190" fill="none" stroke="#5fdcff" stroke-width="2" opacity="0.6" />
      <path d="M 300 220 L 330 220 L 330 190" fill="none" stroke="#5fdcff" stroke-width="2" opacity="0.6" />
    </g>

    <!-- OT Suite Telemetry -->
    <g font-family="monospace" font-size="10" fill="#9be3f5" opacity="0.45" letter-spacing="2">
      <text x="120" y="160">OT SUITE PERSPECTIVE MATRIX · CALIBRATED 0.1mm</text>
      <text x="120" y="175">SURGICAL ENVIRONMENT Z-INDEX: +9.50</text>
      <text x="1450" y="160">ACTIVE STERILE FIELD: CLUSTER A-1</text>
      <text x="1450" y="175">PRECISION DEPTH TRACKING ENABLED</text>
      <text x="1450" y="980">INSPECTION LEVEL: G-I / AQL 1.5</text>
    </g>
  </g>

  <!-- 3. Superimposed Hero Elements -->
  {get_common_overlay()}
</svg>"""

# ==============================================================================
# CONCEPT 5: Bio-Clean Micro-Lattice & Pathogen Defense Web
# ==============================================================================
def make_concept_5():
    # Generate Concentric Bio-Defense Rings
    rings = []
    for i in range(1, 9):
        rx = 180 + i * 55
        ry = 90 + i * 35
        opacity = 0.28 - i * 0.028
        rings.append(f'<ellipse cx="1340" cy="540" rx="{rx}" ry="{ry}" fill="none" stroke="#18b8e0" stroke-opacity="{opacity:.3f}" stroke-width="{1.5 if i%2==0 else 1}" stroke-dasharray="{6 if i%3==0 else 0} {4 if i%3==0 else 0}" />')
    rings_svg = "\n    ".join(rings)

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#02050f">
  <defs>
    <radialGradient id="c5_bg" cx="70%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#08173d" />
      <stop offset="45%" stop-color="#040b1e" />
      <stop offset="85%" stop-color="#01030a" />
    </radialGradient>
    <linearGradient id="blueGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ad2ff" />
      <stop offset="30%" stop-color="#2196f3" />
      <stop offset="80%" stop-color="#0d47a1" />
      <stop offset="100%" stop-color="#072b6b" />
    </linearGradient>
    <linearGradient id="blackGloveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#525d6b" />
      <stop offset="40%" stop-color="#2d3748" />
      <stop offset="85%" stop-color="#1a202c" />
      <stop offset="100%" stop-color="#0f141d" />
    </linearGradient>
  </defs>

  <!-- 1. Base Dark Background -->
  <rect width="1920" height="1080" fill="url(#c5_bg)" />

  <!-- 2. Concentric Bio-Defense Shield & Radial Pathogen Filter Rings -->
  <g id="defense-rings">
    {rings_svg}

    <!-- Radial Rays radiating from defense center -->
    <g transform="translate(1340, 540)" stroke="#5fdcff" stroke-opacity="0.18" stroke-width="1">
      <line x1="-580" y1="-280" x2="580" y2="280" stroke-dasharray="4 6" />
      <line x1="-580" y1="280" x2="580" y2="-280" stroke-dasharray="4 6" />
      <line x1="0" y1="-380" x2="0" y2="380" stroke-dasharray="4 6" />
      <line x1="-650" y1="0" x2="650" y2="0" stroke-dasharray="4 6" />
    </g>

    <!-- Microscopic Microbe / Pathogen Defense Particle Halos (trapped at boundary) -->
    <g fill="#18b8e0" opacity="0.6">
      <circle cx="1680" cy="380" r="3" filter="drop-shadow(0 0 6px #18b8e0)" />
      <circle cx="1780" cy="520" r="2.5" />
      <circle cx="1620" cy="710" r="3.5" filter="drop-shadow(0 0 8px #5fdcff)" />
      <circle cx="980" cy="620" r="2" />
      <circle cx="940" cy="460" r="3" filter="drop-shadow(0 0 6px #18b8e0)" />
      <circle cx="1060" cy="340" r="2.5" />
    </g>

    <!-- Bio-Clean Technical Telemetry -->
    <g font-family="monospace" font-size="10" fill="#9be3f5" opacity="0.45" letter-spacing="2">
      <text x="120" y="160">ANTIMICROBIAL BIO-BARRIER FIELD</text>
      <text x="120" y="175">ASTM F1671 VIRAL PENETRATION RESISTANT · EN 455 MEDICAL</text>
      <text x="1450" y="160">PATHOGEN IMPERMEABILITY: 99.9%</text>
      <text x="1450" y="175">RADIAL STERILE RETENTION SHIELD</text>
      <text x="1450" y="980">CROSS-CONTAMINATION DEFENSE ACTIVE</text>
    </g>
  </g>

  <!-- 3. Superimposed Hero Elements -->
  {get_common_overlay()}
</svg>"""

concepts = [
    ("concept_1_laminar_cleanroom.svg", make_concept_1()),
    ("concept_2_molecular_polymer.svg", make_concept_2()),
    ("concept_3_arosafe_geometric_facets.svg", make_concept_3()),
    ("concept_4_surgical_ot_grid.svg", make_concept_4()),
    ("concept_5_antimicrobial_forcefield.svg", make_concept_5()),
]

for filename, content in concepts:
    p1 = os.path.join(OUT_DIR_PUBLIC, filename)
    p2 = os.path.join(OUT_DIR_ARTIFACT, filename)
    with open(p1, "w", encoding="utf-8") as f:
        f.write(content)
    with open(p2, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved: {filename}")

# Generate an interactive HTML Showcase to view all 5 side by side or as tabs
html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AROSAFE — 5 Dark Hero Background Concepts</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #030611; color: #fff; font-family: Inter, system-ui, sans-serif; padding: 30px; }
    header { text-align: center; margin-bottom: 30px; }
    h1 { font-size: 28px; font-weight: 800; color: #9be3f5; margin-bottom: 8px; }
    p { color: rgba(255,255,255,0.7); font-size: 15px; }
    .tabs { display: flex; justify-content: center; gap: 10px; margin: 25px 0; flex-wrap: wrap; }
    .tab-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 10px 20px; border-radius: 999px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; }
    .tab-btn:hover, .tab-btn.active { background: #18b8e0; color: #071631; border-color: #18b8e0; box-shadow: 0 0 20px rgba(24,184,224,0.4); }
    .viewer { width: 100%; max-width: 1400px; margin: 0 auto; aspect-ratio: 16/9; background: #000; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 60px rgba(0,0,0,0.8); position: relative; }
    .viewer img { width: 100%; height: 100%; object-fit: contain; }
    .desc-card { max-width: 1400px; margin: 20px auto; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; }
    .desc-title { font-size: 18px; font-weight: 700; color: #fff; }
    .desc-text { font-size: 14px; color: rgba(255,255,255,0.65); margin-top: 4px; }
    .desc-tag { background: rgba(24,184,224,0.15); color: #9be3f5; border: 1px solid rgba(24,184,224,0.3); padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; font-family: monospace; }
    .grid-view { max-width: 1400px; margin: 50px auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; }
    .grid-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; overflow: hidden; cursor: pointer; transition: transform 0.2s, border-color 0.2s; }
    .grid-item:hover { transform: translateY(-4px); border-color: #18b8e0; }
    .grid-item img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
    .grid-item-info { padding: 14px 18px; }
    .grid-item-title { font-size: 15px; font-weight: 700; color: #fff; }
    .grid-item-sub { font-size: 12px; color: rgba(255,255,255,0.55); margin-top: 3px; }
  </style>
</head>
<body>
  <header>
    <h1>AROSAFE — 5 Brand-Relevant Dark Hero Concepts</h1>
    <p>Select any concept to preview full-screen. Each concept features a non-plain dark medical theme tailored to Aroved infection control.</p>
  </header>

  <div class="tabs" id="tabs"></div>

  <div class="viewer">
    <img id="main-view" src="concept_1_laminar_cleanroom.svg" alt="Concept View" />
  </div>

  <div class="desc-card">
    <div>
      <div class="desc-title" id="card-title">Concept 1: Laminar Flow & ISO-5 Barrier Currents</div>
      <div class="desc-text" id="card-desc">Luminous, cleanroom airflow vectors and HEPA filtration streamlines representing sterile surgical manufacturing.</div>
    </div>
    <div class="desc-tag" id="card-tag">ISO 14644-1 CLASS 5</div>
  </div>

  <h2 style="max-width:1400px; margin:40px auto 10px; font-size:20px; color:#fff;">Compare All 5 Concepts</h2>
  <div class="grid-view" id="gallery"></div>

  <script>
    const data = [
      {
        id: 1,
        file: "concept_1_laminar_cleanroom.svg",
        name: "Concept 1: Laminar Flow & Cleanroom Currents",
        desc: "Luminous, curved cleanroom airflow streamlines and HEPA particulate vectors representing sterile manufacturing environments.",
        tag: "ISO 14644-1 CLASS 5"
      },
      {
        id: 2,
        file: "concept_2_molecular_polymer.svg",
        name: "Concept 2: Molecular Nitrile Polymer Matrix",
        desc: "High-tech hexagonal nitrile butadiene rubber (NBR) molecular chain lattice and surgical grip micro-texture.",
        tag: "AQL 1.5 VIRAL BARRIER"
      },
      {
        id: 3,
        file: "concept_3_arosafe_geometric_facets.svg",
        name: "Concept 3: AROSAFE Architectural Facet Shield",
        desc: "Large multi-layered geometric polygonal facets directly inspired by Aroved's diamond prism brand logo mark.",
        tag: "BRAND PRISM ARCHITECTURE"
      },
      {
        id: 4,
        file: "concept_4_surgical_ot_grid.svg",
        name: "Concept 4: Surgical OT Coordinate Matrix",
        desc: "3D perspective surgical theatre coordinate grid with precision alignment reticles and medical telemetry lines.",
        tag: "SURGICAL OT SUITE CALIBRATION"
      },
      {
        id: 5,
        file: "concept_5_antimicrobial_forcefield.svg",
        name: "Concept 5: Radial Antimicrobial Bio-Barrier",
        desc: "Concentric acoustic bio-defense waves and pathogen filtration rings radiating around the central glove duo.",
        tag: "ASTM F1671 BIO-DEFENSE"
      }
    ];

    let current = 0;
    const mainView = document.getElementById('main-view');
    const cardTitle = document.getElementById('card-title');
    const cardDesc = document.getElementById('card-desc');
    const cardTag = document.getElementById('card-tag');
    const tabsContainer = document.getElementById('tabs');
    const galleryContainer = document.getElementById('gallery');

    function selectConcept(index) {
      current = index;
      const item = data[index];
      mainView.src = item.file;
      cardTitle.textContent = item.name;
      cardDesc.textContent = item.desc;
      cardTag.textContent = item.tag;

      document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }

    data.forEach((item, i) => {
      // Tab button
      const btn = document.createElement('button');
      btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
      btn.textContent = `Option ${i + 1}: ${item.name.split(':')[1].trim()}`;
      btn.onclick = () => selectConcept(i);
      tabsContainer.appendChild(btn);

      // Gallery card
      const card = document.createElement('div');
      card.className = 'grid-item';
      card.innerHTML = `
        <img src="${item.file}" alt="${item.name}" />
        <div class="grid-item-info">
          <div class="grid-item-title">${item.name}</div>
          <div class="grid-item-sub">${item.desc}</div>
        </div>
      `;
      card.onclick = () => {
        selectConcept(i);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      };
      galleryContainer.appendChild(card);
    });
  </script>
</body>
</html>
"""

html_p1 = os.path.join(OUT_DIR_PUBLIC, "index.html")
html_p2 = os.path.join(OUT_DIR_ARTIFACT, "index.html")
with open(html_p1, "w", encoding="utf-8") as f:
    f.write(html_content)
with open(html_p2, "w", encoding="utf-8") as f:
    f.write(html_content)
print("Saved interactive gallery index.html!")

