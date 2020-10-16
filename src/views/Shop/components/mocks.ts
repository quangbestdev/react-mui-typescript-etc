import { duplicateArr } from '../../../utils/utils'

export const mockProduct = {
  title: 'Peeling Solution Sleeping Premium Face Mask - Dr.Jart+',
  image: '/products/peeling-solution.jpg',
  price: 48,
  sizes: ['40ml', '150ml'],
  properties: ['Clears acne', 'Rejuvenates skin', 'Anti-aging'],
  description:
    'A serum that is jam-packed with the right powerhouse ingredients to transform your skin. The light, watery serum is power-packed with 8-Peptide Complex and Peach Flower Extract for an immediate pop of radiance.',
  keyIngredients: [
    { title: 'Pomegranate', image: '/products/pomegranate.png' },
    { title: 'Orange', image: '/products/orange.png' },
    { title: 'Honey', image: '/products/honey.png' },
    { title: 'Green Tea', image: '/products/green-tea.png' },
  ],
  fullIngredients:
    'Aqua (Water), Carbomer, Tetrasodium Glutamate Diacetate, Sodium Hydroxide, Diglycerin, Maltodextrin, Sodium Citrate, Citric Acid, Cyanocobalamin, 1,2-hexanediol, Chlorphenesin, Butylene Glycol, Sodium Acrylates Copolymer, Lecithin, Polyacrylate Crosspolymer-6, Sodium Hyaluronate, Magnolia Officinalis Bark Extract, Tocopherol, Vitis Vinifera (Grape) Seed Extract, Palmitoyl Tripeptide-8, Dextran, Sodium Carboxymethyl Beta-glucan',
  directions:
    'Gently sweep Black Tea Kombucha Facial Treatment Essence over cleansed face and neck with your finger tips. Use twice daily to prep skin for your serum and moisturizer. Pour into your hand and gently pat on your face and neck with your fingertips. Use daily, morning and night, after cleansing and before your serum and moisturiser.',
}

export const categoriesFilter = [
  'All Products',
  'Cleansers',
  'Exfoliators',
  'Serums',
  'Moisturisers',
  'Masks',
  'Toners',
]

export const concernsFilter = [
  'Acne',
  'Anti-Aging',
  'Hydrating',
  'Redness',
  'UV Protection',
  'Whitening',
  'Dark Circles',
]

export const skinTypeFilter = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']

export const brandsFilter = ['Veritas', 'SKII', 'Dr Jart+', 'Clinique', 'H20', 'Sulawusoo']

const title = 'Oat Cleansing Facial Polish'
const description = 'One Love Organics'
const price = 28.9

const products = [
  {
    image: '/products/ordinary-ala.jpg',
    title,
    description,
    price,
  },
  {
    image: '/products/peeling-solution.jpg',
    title,
    description,
    price,
  },
  {
    image: '/products/yours-night-cream.jpg',
    title,
    description,
    price,
  },
]
