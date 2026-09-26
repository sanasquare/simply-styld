import { Product, Review, Order, InquiryMessage } from '../types';

export const BRAND_LOGO = '/logo.png';

export const PRODUCTS: Product[] = [
  {
    id: 'gulzar-embroidered-chanderi',
    name: 'Gulzar Embroidered Chanderi Kurti Set',
    category: 'Kurtis',
    subCategory: 'Festive Pret \'25',
    price: 2690,
    originalPrice: 3200,
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewCount: 42,
    provenance: 'Handcrafted in Chanderi, MP',
    fabric: 'Breathable Chanderi Silk with 100% fine cotton mulmul inner lining',
    description: 'Crafted from breathable Chanderi silk with delicate botanical threadwork inspired by traditional motifs. Designed for effortless grace from day to evening celebrations.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtS1n1ETi9rLS3LLnarruPEQcokTQkjhgFQgygtCZlRrU1U7yyk3jTx4vtNfasafNtkl34bykZPwxhArPa1ZY5YQmw25hua_Pgpa7Xo41UozUmkOnBJft42djFGxQeU6azO5zj1GWk-Vu6tdoiin9wTbihlicV22z93JlaEKV4zOBKYr2bhFoK6mAisn-TuzRW7vc39qUzf7HZz7tdUM6pVTica8WU_iY6yTGlgzADdF4HFoS5RoX86g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKh1hf0Qc_1zf9rHQSWJKU6P3dAZnOfVr20S7uXdiGdgjPfQ1ybsoFPF-nKCv_eedtQN0pnl3iuGLrw8wmg4K45rG0LPC1COZikQqkBfzkpgoXjEmVkTr4K4YPuDTOQJz4pOMWP51sq49lfeRE9z-cW_iBJFvf_TzXfJ3JKa6gV9wzqh9UjThGg6h2zw3eHFbfIk0pFfOJNWiibVDK_kOCmXH5x9Uc8nZJ0FpmNYaLoxAiSCgRu-siz5rEPZnGH4oFSyU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1TwI5waf-sHVkUxmWBL95RxTF88YUwkOWNdWW3pEqBx7pMpQzQOF61bd5TPiIqkarZ9TgZ4XIG3axQwe2Kqi9I9R1mVrnPZpvdzn2utR9nhS4DZ5fjGVRWGKqlAfNVPwd_Ex7ZfIGQtRZcnrZXryxpFm99W7ZichK7qP8yvFPWsQ9dvTyKhh1kXwZQBQIRLSaMGHbMZ3jEt8jJO0tuqWsO8BjZW6MSkIgX-MbG5PPoy73iCNu8dCQUA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNWPaavgGtuuiOoZlVnOhq52bty1Zo0u1ZuwRwVInD5rxsLbz5VnjssV6nROQkHBDZJfB3jnpve0L8V4cOE3YosPBjS3_jZFzTEGxkekvxmU79vgcvbPJmdCr_YaoCBRF-E5dIxJoiXxJltk0kKg4lqpGwt019IukLN_gGh_DA7YigSEjyTAfRv_y4qm9lG-T4eTYfljWez6HXHubazGJVMCfUkXrWc5F3KP9j-6PA_waHiCLNmjuM9A'
    ],
    colors: [
      { name: 'Warm Ivory', hex: '#FAF7F0' },
      { name: 'Jet Black', hex: '#1C1A18' },
      { name: 'Muted Sage', hex: '#A3B19B' },
      { name: 'Rosewood', hex: '#C08A80' }
    ],
    sizes: [
      { size: 'M', stock: 8, status: 'Ready' },
      { size: 'L', stock: 3, status: '3 Left' },
      { size: 'XL', stock: 6, status: 'Ready' },
      { size: 'XXL', stock: 2, status: 'Few Left' }
    ],
    details: [
      'Pure handloom Chanderi silk with authentic pit-loom sheen',
      'Intricate resham threadwork & subtle zari piping at neckline',
      'Soft 100% mulmul breathable cotton inner lining',
      'Side slits with reinforced hand tacking for comfortable drape',
      '1.5-inch internal seam margin for easy custom tailoring'
    ],
    careInstructions: [
      'Dry clean recommended for first wash to preserve luster',
      'Subsequent washes: gentle handwash in cold water with mild liquid soap',
      'Do not wring; dry flat in shade',
      'Warm iron on reverse side under protective cotton cloth'
    ],
    pairings: [
      {
        id: 'zari-organza-dupatta',
        name: 'Zari Organza Dupatta',
        price: 1190,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNWPaavgGtuuiOoZlVnOhq52bty1Zo0u1ZuwRwVInD5rxsLbz5VnjssV6nROQkHBDZJfB3jnpve0L8V4cOE3YosPBjS3_jZFzTEGxkekvxmU79vgcvbPJmdCr_YaoCBRF-E5dIxJoiXxJltk0kKg4lqpGwt019IukLN_gGh_DA7YigSEjyTAfRv_y4qm9lG-T4eTYfljWez6HXHubazGJVMCfUkXrWc5F3KP9j-6PA_waHiCLNmjuM9A'
      },
      {
        id: 'zari-cotton-palazzos',
        name: 'Zari Tailored Palazzos',
        price: 1450,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlL17txj6okZfGpBUwVAZJBTXKfQBQ2fxmjqZgIGdoSBCkAdrcvVO0NRVp_tNIrWY_3TkdBPk390jGeo_j8Dc7rE46RUKAIIyXPSMU3JoB-8Co1r6dbepnBgICyC1kMjzGPwD6EQb3Hmncy_41EzBnZ1cLSvxgAG_8cYO-wjqSFFDFrb-VsAcTmBlqbI4sBcHeFguU0N5rfE0tLxm4nXg1IIWHzBtD7aQpc66ZU3y458LrPuH2-PZ67w'
      },
      {
        id: 'kundan-jhumkis',
        name: 'Kundan Drop Jhumkis',
        price: 890,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA6G1dJrqwHW6LTUbg4X63NJqn4YcH8b52InlxsyYd-hLS1o2IOlMJn0v7F8IurB3ItCutQf3lmsee_raPqg3NFa6Ax4ft8UbxKU5dOxY9VaV_ZeG9PVIGlC8hM_OOc0LnIOIZoJD0LInIcn-8H0fapYfRkIvSYKnuYwhKaXVT9SfgLpTXmEfW_pPFx7dYcO4dwHJQeN3zDwDeiWDfC23jngFlu_pqbMHcOqImyvgeEfG2SciyIeMFfg'
      }
    ],
    isBestseller: true
  },
  {
    id: 'ivory-chanderi-anarkali',
    name: 'Ivory Chanderi Anarkali Suit Set',
    category: 'Kurtis',
    subCategory: 'Pure Silk',
    price: 2490,
    originalPrice: 2850,
    badge: 'PURE SILK',
    rating: 4.8,
    reviewCount: 31,
    provenance: 'Chanderi, Madhya Pradesh',
    fabric: 'Fine Chanderi Silk with Mulmul Cotton Lining',
    description: 'An elegant flared Anarkali silhouette with delicate pearl buttons and delicate gold foil prints.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1TwI5waf-sHVkUxmWBL95RxTF88YUwkOWNdWW3pEqBx7pMpQzQOF61bd5TPiIqkarZ9TgZ4XIG3axQwe2Kqi9I9R1mVrnPZpvdzn2utR9nhS4DZ5fjGVRWGKqlAfNVPwd_Ex7ZfIGQtRZcnrZXryxpFm99W7ZichK7qP8yvFPWsQ9dvTyKhh1kXwZQBQIRLSaMGHbMZ3jEt8jJO0tuqWsO8BjZW6MSkIgX-MbG5PPoy73iCNu8dCQUA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0-5vS0kfYM_9-CRUzsm1eYE6wg2Md4ymv_VedmZ8fWfayIFcbMiSV4fcY-YBcMEBD_7y_DDFUSLBROkTMPV29wi3SBUAwksyVMScC8ADvAYr1_3iTkUrS2i0NDcP7awffHSaCROMCgSjglWLjhi8G3LsX1kIQlbiR-4D3Psw94fwjNC_Jf2DPGp-GNLj2CE3Z46KaGJmxY5_5ZNrClPHMBKbt5r4QN9jaT8qv-uKpYrfmpQC79hVxCA'
    ],
    colors: [
      { name: 'Warm Ivory', hex: '#FAF7F0' },
      { name: 'Dusty Rose', hex: '#D6A29A' }
    ],
    sizes: [
      { size: 'M', stock: 5, status: 'Ready' },
      { size: 'L', stock: 8, status: 'Ready' },
      { size: 'XL', stock: 4, status: 'Ready' },
      { size: 'XXL', stock: 1, status: 'Few Left' }
    ],
    details: [
      'Flared 32-kalidar cut creating a graceful circular swirl',
      'Concealed side zipper for streamlined tailoring',
      'Comes with tonal straight-leg pants'
    ],
    careInstructions: ['Dry clean only'],
    isNew: true
  },
  {
    id: 'muted-sage-raw-silk',
    name: 'Muted Sage Raw Silk Kurti',
    category: 'Kurtis',
    subCategory: 'Best Seller',
    price: 1890,
    originalPrice: 2200,
    badge: 'BEST SELLER',
    rating: 4.9,
    reviewCount: 56,
    provenance: 'Bhagalpur, Bihar',
    fabric: 'Pure Raw Tussar Silk Blend',
    description: 'Minimalist mandarin collar kurti in serene sage green with subtle self-colored kantha stitch on cuffs.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCME5BU615xx_RHBFLhG5utBa91x1KbRkgmvYRTpuN0_JfUTzcG5vWC8UnAGrOwJBD7_jmcItY00xKMU4h8Vf19ia32plT0ElPj4Q49p-CbtQuMGZ7WIxFTIrOewNLMs54uTNTWkqFR61BEbiVLK70CfZjQMuS4x7K-aR_VQpAf2tXjx2mWtchfoFHVN6KqTYfhWpG3gqHc1QivArg8xYbzicwCuuMPHf3TJCcH0ZOReBPKIqMM1XebwA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcfrFV9kMkeqteKGc_sTlRwGWmPFdAy0HT5-wvVpmftnegTy5jGRarkbbFLhQfvCvRpTA8zr8gQA_nGtAlGdYpCnw9frN0qswKM00aGOs7X_DTP_FE-WEovSDZe7S2IwUFVLTc4wXSkOUxi6y_o2rVCClcxY538DFb_w9nHGiMrJi7QQj5W80lBa3LbVfj_ilRLjxjeVcHZPeukTi2aPYImh4B9aFN5Qj-1cTr6NbTzYSoX7tThAzlAQ'
    ],
    colors: [
      { name: 'Muted Sage', hex: '#A3B19B' },
      { name: 'Oatmeal', hex: '#E6DFC8' }
    ],
    sizes: [
      { size: 'M', stock: 12, status: 'Ready' },
      { size: 'L', stock: 6, status: 'Ready' },
      { size: 'XL', stock: 4, status: 'Ready' },
      { size: 'XXL', stock: 3, status: 'Ready' }
    ],
    details: [
      'Naturally slubbed raw silk with pleasant earthy texture',
      'Mother of pearl buttons down front placket',
      'Deep functional side seam pocket'
    ],
    careInstructions: ['Dry clean or cold gentle handwash'],
    isBestseller: true
  },
  {
    id: 'rosewood-coord-set',
    name: 'Rosewood Co-ord Set',
    category: 'Co-ords',
    subCategory: 'Modern Comfort',
    price: 2190,
    originalPrice: 2550,
    badge: 'NEW',
    rating: 4.7,
    reviewCount: 19,
    provenance: 'Jaipur Atelier, Rajasthan',
    fabric: '100% Breathable Khadi Cotton',
    description: 'Contemporary relaxed-fit button tunic paired with cropped straight culottes in earthy rosewood terracotta.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHTLO12rzdFb8BW6Fh530BXShq33KHohH7OpxA3IsYkCFDjNvua4Yd2UB7yDXFqg90GVkmUERyNIu2fH1zG9omMTYfVS4915cP6P2tHu-EPSMXHi5I9Ax7D_h4dOD_2TCxPDsSlppaL4wsBxHJTIEi7ZJQyDSEW0hUPEVhQmp1ctNw0bWwOlk8coBJdZJVQcb9OB0POJbijiZ48Ao833wx21hJdBhdKewbP5rrWzYXhUp63QrLKpgScA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsYbJPikZc8E4f4yzh6fBCydc7yV69wlIJWSporG-0HDE0LiHq6DCzRMZuJU9uVdq7tWmi-1jxwHnl_HD1NFppdl5bXq4Rq0aRGWjiOdFJKpEm5698fmOTR03o6R25ftQ2umDWM-ZTgJ2Z6dbDgaInuJKbx6QEPh-bIcpLdzyMp2tAZDV-5b2y1L0KtDBv9gEs8eR8S_m3UYk466ngkTLz3Ro4UVPIMlJA1q-60DRtP8t_z3Pawo_Axw'
    ],
    colors: [
      { name: 'Rosewood', hex: '#B57467' },
      { name: 'Ivory Cream', hex: '#F5EFE6' }
    ],
    sizes: [
      { size: 'M', stock: 4, status: 'Ready' },
      { size: 'L', stock: 6, status: 'Ready' },
      { size: 'XL', stock: 2, status: 'Few Left' },
      { size: 'XXL', stock: 3, status: 'Ready' }
    ],
    details: [
      'Relaxed drop-shoulder shirt silhouette',
      'High-rise elasticated waistband with drawstring',
      'Block print accents using natural dyes'
    ],
    careInstructions: ['Machine wash gentle in cold water, line dry in shade'],
    isNew: true
  },
  {
    id: 'noor-embroidered-kurti',
    name: 'Noor Handcrafted Kurti',
    category: 'Kurtis',
    subCategory: 'Daily Edit',
    price: 1650,
    originalPrice: 1950,
    badge: 'DAILY EDIT',
    rating: 4.8,
    reviewCount: 38,
    provenance: 'Lucknow, Uttar Pradesh',
    fabric: 'Featherweight Mulmul Cotton',
    description: 'Everyday noir black kurti enriched with tone-on-tone Lucknowi chikankari shadow work and antique gold touches.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBs6aM7M-Un4IQoWcsErylgMgpjvNGyflLGSJCYtQa1HlzG4nwdFTu-HFlyl52Cj-3Cp8rMw9oTW2fuLDCwYdhAXl5EUPo7VytaVCy5xrQnCJ4FiSZzd0l4sIex6el0vWHA0KMAoKnbVuLIVnm9BylISmzdUgTpSevuwc5HkY3-yVUF5BB_UR18HNJwHXVnB7hOaIU2VJWZqss2-Ng3Mlb2qP2y1YMX3-nZHHd7hgZsNFea8ooY41r3NQ'
    ],
    colors: [
      { name: 'Jet Black', hex: '#1C1A18' },
      { name: 'Cloud White', hex: '#FFFFFF' }
    ],
    sizes: [
      { size: 'M', stock: 7, status: 'Ready' },
      { size: 'L', stock: 9, status: 'Ready' },
      { size: 'XL', stock: 5, status: 'Ready' },
      { size: 'XXL', stock: 4, status: 'Ready' }
    ],
    details: [
      'Hand-embroidered floral motifs across yoke and sleeves',
      'Ultra-soft mulmul cotton that breathes through high humidity',
      'Side pockets for functional ease'
    ],
    careInstructions: ['Gentle handwash cold'],
    isBestseller: true
  },
  {
    id: 'zari-border-palazzos',
    name: 'Zari Border Cotton Palazzos',
    category: 'Bottoms',
    subCategory: 'Wardrobe Essential',
    price: 1450,
    badge: 'ESSENTIAL',
    rating: 4.9,
    reviewCount: 29,
    provenance: 'Maheshwar, Madhya Pradesh',
    fabric: '100% Combed Slub Cotton',
    description: 'Crisp, airy wide-leg trousers finished with a subtle woven golden zari hem border. Pairs effortlessly with all Simply Styld kurtas.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlL17txj6okZfGpBUwVAZJBTXKfQBQ2fxmjqZgIGdoSBCkAdrcvVO0NRVp_tNIrWY_3TkdBPk390jGeo_j8Dc7rE46RUKAIIyXPSMU3JoB-8Co1r6dbepnBgICyC1kMjzGPwD6EQb3Hmncy_41EzBnZ1cLSvxgAG_8cYO-wjqSFFDFrb-VsAcTmBlqbI4sBcHeFguU0N5rfE0tLxm4nXg1IIWHzBtD7aQpc66ZU3y458LrPuH2-PZ67w'
    ],
    colors: [
      { name: 'Off-White', hex: '#FAF6ED' },
      { name: 'Beige', hex: '#EDE4D6' }
    ],
    sizes: [
      { size: 'M', stock: 15, status: 'Ready' },
      { size: 'L', stock: 12, status: 'Ready' },
      { size: 'XL', stock: 8, status: 'Ready' },
      { size: 'XXL', stock: 5, status: 'Ready' }
    ],
    details: [
      'Relaxed straight silhouette with graceful leg flow',
      'Comfort-stretch back waistband with smooth flat front',
      'Generous 4-inch deep pockets on both sides'
    ],
    careInstructions: ['Machine wash cold on gentle cycle']
  },
  {
    id: 'ayla-pakistani-tunic',
    name: 'Ayla Embroidered Pakistani Tunic',
    category: 'Pakistani Wear',
    subCategory: 'Artisanal Lawn',
    price: 2990,
    originalPrice: 3450,
    badge: 'ARTISANAL',
    rating: 4.9,
    reviewCount: 24,
    provenance: 'Sindh Heritage Cluster',
    fabric: 'Fine Pima Lawn Cotton with Organza Inserts',
    description: 'Long-line Pakistani style tunic with intricate cutwork organza cuffs, lace neckline inserts, and scalloped hem.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwrEwvM0TOpwkEGNEJKUh4ZZ2dYRF3GnXs5fFofUcDqsufCXo29mFM1YYmIBVRCBdIgX7kOeyTDKexie05LPJVVemdGRArDOvT8qs-7l478AZkH3NcOPknF1AtyRGpyiSoMv3tXxnqWDVjUQbXvl4xpTZ2qZ3EpZKbDiTgZk3GQpKg5KNkH2lCgT998wTWVWFch17PM11xZMI-jKXYDKDXzhrHz433zXd78Xbonqs6ACFUu8x5UpOeBQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzZx8TwIZlEJvHA4iiSqvtVaWrlhLaxP890shG5v9eO-16RLyG7ECbvisyIldJnhwpGR5BBzKzUtA9GPgYzANmmdSvnnKYSJ7u-6Y9q9QPEA4rgqP6mqX4ecY9xfGmK2FLsjV-vgPtEILJbtptwImKO76Za-QJ5AOZXbrRWq1F4wX8JVRwUkJyBrcuyF4aXVIvN1AmbLogEKxUwO8nZgO4s7nclP1l5iAFxJ1TGEO-hGWdZIDL-K5dqd7vq-qk0GgPFGY'
    ],
    colors: [
      { name: 'Blush Pink', hex: '#F0D4CE' },
      { name: 'Ivory', hex: '#FAF7F0' }
    ],
    sizes: [
      { size: 'M', stock: 2, status: 'Few Left' },
      { size: 'L', stock: 2, status: 'Few Left' },
      { size: 'XL', stock: 4, status: 'Ready' },
      { size: 'XXL', stock: 0, status: 'Sold Out' }
    ],
    details: [
      'Scalloped lace trims along front slits and sleeves',
      'Subtle crystal and bead embellishments at the neckline',
      'Calf-skimming contemporary straight drape'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'tiered-modal-dress',
    name: 'Tiered Modal Fusion Midi Dress',
    category: 'Dresses',
    subCategory: 'Flowing Silhouette',
    price: 2750,
    rating: 4.8,
    reviewCount: 16,
    provenance: 'Jaipur Atelier',
    fabric: 'Sustainable Beechwood Modal Silk',
    description: 'An ethereal tiered dress featuring hand-carved floral woodblock prints, tie-up tassel neck, and breezy romantic sleeves.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5SaYLiKnCNBADX8Xyj4Zksdm5cmfk3h9TaUSqjLTKNR8Nc-BkzOutrHXPIfrRoKsa1kdjhazj05u2eDRlDevW-uYf-zk0unnvgUMqcveuB_Cr_xE11td545QHfs4087hrThPAZCCSv1n7PEd0hv_yfXH2qMTxR5hzc4x8NEmj3fJz2Jw77tqtMHdixiWmM0Qkoh_7QWSF_vHt5t30t3UQsKfF_2KmQD-jdaxgcuhaqxety2davtOQ2Q'
    ],
    colors: [
      { name: 'Warm Ecru', hex: '#EDE6D8' }
    ],
    sizes: [
      { size: 'M', stock: 6, status: 'Ready' },
      { size: 'L', stock: 7, status: 'Ready' },
      { size: 'XL', stock: 3, status: 'Ready' },
      { size: 'XXL', stock: 2, status: 'Few Left' }
    ],
    details: [
      'Voluminous three-tier flared body',
      'Pure organic cotton inner slip included',
      'Handmade thread and pearl tassels'
    ],
    careInstructions: ['Gentle machine wash cold with gentle detergent']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ananya Kapoor',
    location: 'Mumbai',
    rating: 5,
    verified: true,
    date: '14 Sept 2024',
    comment: 'The Chanderi silk is exceptionally airy and does not stiffen like synthetic blends. Wore it to a high-tea event and received endless compliments on the neckline zari work.',
    sizePurchased: 'Size L',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1TwI5waf-sHVkUxmWBL95RxTF88YUwkOWNdWW3pEqBx7pMpQzQOF61bd5TPiIqkarZ9TgZ4XIG3axQwe2Kqi9I9R1mVrnPZpvdzn2utR9nhS4DZ5fjGVRWGKqlAfNVPwd_Ex7ZfIGQtRZcnrZXryxpFm99W7ZichK7qP8yvFPWsQ9dvTyKhh1kXwZQBQIRLSaMGHbMZ3jEt8jJO0tuqWsO8BjZW6MSkIgX-MbG5PPoy73iCNu8dCQUA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNWPaavgGtuuiOoZlVnOhq52bty1Zo0u1ZuwRwVInD5rxsLbz5VnjssV6nROQkHBDZJfB3jnpve0L8V4cOE3YosPBjS3_jZFzTEGxkekvxmU79vgcvbPJmdCr_YaoCBRF-E5dIxJoiXxJltk0kKg4lqpGwt019IukLN_gGh_DA7YigSEjyTAfRv_y4qm9lG-T4eTYfljWez6HXHubazGJVMCfUkXrWc5F3KP9j-6PA_waHiCLNmjuM9A'
    ]
  },
  {
    id: 'rev-2',
    author: 'Pooja Mehra',
    location: 'Bengaluru',
    rating: 5,
    verified: true,
    date: '20 Sept 2024',
    comment: 'Size L fits like a dream! The inner lining is pure breathable cotton which makes wearing it during warm afternoons completely effortless. Definitely ordering the Muted Sage next.',
    sizePurchased: 'Size L'
  },
  {
    id: 'rev-3',
    author: 'Rhea Sen',
    location: 'Delhi',
    rating: 5,
    verified: true,
    date: '02 Oct 2024',
    comment: 'Quiet luxury done right. The packaging was lovely in the unbleached keepsake muslin pouch, and the fabric drape feels so elevated.',
    sizePurchased: 'Size M'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SS-84920',
    customerName: 'Pooja Mehra',
    city: 'Bengaluru',
    address: 'B-402, Vrindavan Residences, Linking Road',
    phone: '+91 98201 44892',
    email: 'pooja.m@outlook.com',
    items: [
      {
        productName: 'Gulzar Embroidered Kurti',
        size: 'L',
        color: 'Warm Ivory',
        price: 2690,
        quantity: 1
      },
      {
        productName: 'Zari Border Cotton Palazzos',
        size: 'L',
        color: 'Off-White',
        price: 1450,
        quantity: 1
      }
    ],
    subtotal: 4140,
    discount: 414,
    total: 3726,
    paymentMethod: 'Instant UPI (PhonePe)',
    status: 'Processing',
    date: 'Today, 11:42 AM'
  },
  {
    id: 'SS-84919',
    customerName: 'Ananya Kapoor',
    city: 'Mumbai',
    address: '14, Silver Oak, Bandra West, Mumbai 400050',
    phone: '+91 98200 11928',
    email: 'ananya.k@gmail.com',
    items: [
      {
        productName: 'Noor Chanderi Kurti',
        size: 'M',
        color: 'Jet Black',
        price: 1650,
        quantity: 1
      }
    ],
    subtotal: 1650,
    discount: 0,
    total: 1650,
    paymentMethod: 'Credit Card',
    status: 'Shipped',
    date: '25 Sept 2024'
  },
  {
    id: 'SS-84918',
    customerName: 'Radhika Sharma',
    city: 'Delhi',
    address: 'E-29, Greater Kailash 1, New Delhi 110048',
    phone: '+91 98110 33491',
    email: 'radhika@example.com',
    items: [
      {
        productName: 'Gulzar Linen Co-ord',
        size: 'XL',
        color: 'Olive Sage',
        price: 3490,
        quantity: 1
      }
    ],
    subtotal: 3490,
    discount: 0,
    total: 3490,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    date: '24 Sept 2024'
  }
];

export const INITIAL_INQUIRIES: InquiryMessage[] = [
  {
    id: 'inq-1',
    name: 'Radhika Sharma',
    email: 'radhika@example.com',
    phone: '+91 98000 00000',
    subject: 'Custom length inquiry for Gulzar Chanderi Kurti',
    message: 'Hi Saloni, I am 5\'2" and wondering if the length can be hemmed to 42 inches instead of 44? Also wanted to ask if matching organza dupatta is in stock?',
    timeAgo: '14m ago',
    status: 'Unread'
  },
  {
    id: 'inq-2',
    name: 'Tanvi Joshi',
    email: 'tanvi.j@gmail.com',
    phone: '+91 98212 90123',
    subject: 'Expected restock date for Rosewood Co-ord in M',
    message: 'Loved the Rosewood Co-ord! Would love to know if size M will be restocked before next Friday.',
    timeAgo: '1h ago',
    status: 'Unread'
  }
];
