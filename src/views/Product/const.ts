export const PRODUCT_DATA = {
  category: 'Gift Box',
  title: '3 Bars Gift Box - Dark Chocolate Magic',
  price: 34.99,
  options: [
    {
      title: 'Flavours',
      values: [
        { value: 'With Nibs', label: 'With Nibs' },
        { value: 'Without Nibs', label: 'Without Nibs' },
        { value: 'Surprise Me', label: 'Surprise Me' },
      ],
    },
  ],
  contents: ['3 x Single Estate Chocolate Bars (72% dark chocolate)', '1 x Handwritten Message Card'],
  details: [
    {
      title: 'Cocoa',
      description: '70%',
    },
    {
      title: 'Weight',
      description: '3 x 32g',
    },
    {
      title: 'Bean Type',
      description: 'Trinitario',
    },
    {
      title: 'Conche Time',
      description: 72,
    },
    {
      title: 'Dietary Requirements',
      description: 'Halal Certified, Gluten Free, Vegan',
    },
    {
      title: 'Ingredients',
      description: '100% Natural Ingredients',
    },
    {
      title: 'Storage',
      description: 'Store in a cool dry place',
    },
  ],
  disclaimer: '*Slight variations in each product may occur because all our chocolate is made by hand',
  tasting: [
    {
      title: 'Lampang, Thailand',
      description: 'Tamarind, Cranberries, Cherries and Spices',
    },
    {
      title: 'Anaimalai, India',
      description: 'Sun Maid Raisins and Cashews',
    },
    {
      title: 'Sungai Ruan, Malaysia',
      description: 'Blackcurrants, Raisins and Almonds',
    },
    {
      title: 'Vung Tau, Vietnam',
      description: 'Red Currants, Dried Apricots and Dark Molasses',
    },
    {
      title: 'Calinan, Philippines',
      description: 'Burnt Caramel, Salted Caramel and Red Tea with Milk',
    },
  ],
  recommendedOccasions: ['Birthday', 'Thank You', 'Anniversary', 'Client Appreciation'],
}

export const MOCK_PRODUCTS = Array(4).fill({
  title: 'Speckled! The Salted Egg Yolk Chocolate Bon Bon',
  description: 'Handcrafted Bonbons',
  price: '22.00',
  image: '/products/salted-egg-mock.png',
})

export const PRODUCT_PHOTOS = [
  {
    image: '/products/salted-egg-mock.png',
  },
  {
    image: '/products/product-photo-1.jpg',
  },
  {
    image: '/products/product-photo-2.jpg',
  },
  {
    image: '/products/product-photo-3.jpg',
  },
]
