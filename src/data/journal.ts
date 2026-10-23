import { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'the-anatomy-of-drape',
    title: 'The Anatomy of Drape: Why Modern Tailoring Must Embrace Architectural Tension',
    kicker: 'Essay 01 · Design Philosophy',
    excerpt: 'An investigation into how brutalist concrete forms, cantilevered rooflines, and Italian canvas chest construction converge in the VELORA atelier.',
    author: 'Elena Vance, Creative Director',
    date: 'April 2026',
    readTime: '6 min read',
    heroImage: '/src/assets/images/hero_velora_editorial_1792764508905.jpg',
    content: [
      {
        sectionHeading: 'The Burden of Decorative Fashion',
        paragraph: 'For too long, contemporary women’s fashion has oscillated between hyper-casual athleisure and suffocating ornamental eveningwear. We founded VELORA on the premise that clothing should act as personal architecture—a structure that shelters, defines, and honors the body without restricting its natural kinetic rhythm.',
        pullQuote: '"True luxury is not ornament; it is the absolute certainty of proportions."',
      },
      {
        sectionHeading: 'Canvas, Horsehair, and High-Twist Wool',
        paragraph: 'In our Milanese atelier, our pattern-makers begin with 320gsm high-twist virgin wool from Biella. Rather than relying on synthetic fusible interlinings that stiffen and deteriorate over time, every lapel is structured with floating natural horsehair canvas. This allows the collar to roll with a gentle, sculptural arc that molds specifically to the wearer’s collarbone after just three wearings.',
      },
      {
        sectionHeading: 'A Return to Intentionality',
        paragraph: 'When a garment possesses sculptural integrity, the wearer no longer needs excess accessories. The garment itself establishes the space around her. It is an understated confidence—calm, unyielding, and profoundly tactile.',
      },
    ],
    relatedProductSlugs: ['architectural-double-breasted-blazer', 'sculpted-cocoon-trench-coat', 'sharp-creased-wide-leg-trouser'],
  },
  {
    id: 'art-02',
    slug: 'tactile-memory-raw-mulberry-belgian-flax',
    title: 'Tactile Memory: The Alchemy of Hand-Reeled Mulberry and Belgian Flax',
    kicker: 'Essay 02 · Atelier Chronicles',
    excerpt: 'Journeying to the looms of Kyoto and Courtrai to preserve endangered artisanal weaving methods before they vanish into machine homogeny.',
    author: 'Matteo Rossi, Head of Textile Development',
    date: 'March 2026',
    readTime: '5 min read',
    heroImage: '/src/assets/images/editorial_craft_atelier_1792764511170.jpg',
    content: [
      {
        sectionHeading: 'The Nuance of Slub Weaving',
        paragraph: 'Industrial high-speed looms demand yarns of uniform diameter, devoid of knots or organic variation. The consequence has been a sterile flattening of clothing surfaces. In our Permanent Core series, we deliberately partnered with small family mills in Kyoto who continue to spin silk by hand from raw cocoons.',
        pullQuote: '"When you touch fabric made on a shuttle loom, your skin recognizes human handiwork immediately."',
      },
      {
        sectionHeading: 'Mineral Pigments & Natural Fermentation',
        paragraph: 'Our bone, umber, and basalt hues are not synthesized from petroleum dyes. We utilize ancient mineral clays and low-impact vegetable tannin baths that age like fine leather. With every wash, the garment develops subtle patina along seams, recording the journeys of its wearer.',
      },
    ],
    relatedProductSlugs: ['raw-mulberry-pleated-wrap-tunic', 'ribbed-cashmere-monolith-turtleneck'],
  },
  {
    id: 'art-03',
    slug: 'nocturne-silhouette-in-shadow',
    title: 'Nocturne: Dressing for Twilight, Candlelight, and Quiet Evening Drama',
    kicker: 'Essay 03 · Seasonal Editorial',
    excerpt: 'Exploring the 40-momme heavy silk crepe column gown and the subtle theatricality of low cowl draping under ambient light.',
    author: 'Claire D’Souza, Fashion Editor',
    date: 'February 2026',
    readTime: '4 min read',
    heroImage: '/src/assets/images/product_silk_column_dress_1792764512732.jpg',
    content: [
      {
        sectionHeading: 'Sculptural Simplicity Under Twilight',
        paragraph: 'Eveningwear so often relies on glitter, sequins, and sheer cutouts to command attention. Edition 03, Nocturne, operates on the opposite principle: absolute opacity, deliberate monastic lines, and an arresting low-back drapery that reveals only when the wearer turns.',
        pullQuote: '"Sophistication is what remains when you have removed everything that was merely loud."',
      },
      {
        sectionHeading: 'The Weight of Heavy Silk Crepe',
        paragraph: 'At 40 momme, silk ceases to be flimsy. It gains the drape of liquid marble, skimming past the hips and falling into an effortless column with whisper-quiet floor acoustics. It is the uniform for the modern salon.',
      },
    ],
    relatedProductSlugs: ['fluid-cowl-silk-column-gown', 'asymmetrical-draped-faille-skirt'],
  },
];
