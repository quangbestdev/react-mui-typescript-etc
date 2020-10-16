const purchases = [
  {
    quantity: 1,
    image: '/cart/peeling-solutions.png',
    title: 'Peptidin™ Radiance Serum with Energy Replenshishment Peptides',
    brand: 'Dr. Jart+',
    cost: 85,
  },
  {
    quantity: 1,
    image: '/cart/peptidin.png',
    title: 'Peptidin™ Radiance Serum with Energy Replenshishment Peptides',
    brand: 'Dr. Jart+',
    cost: 72.9,
  },
  {
    quantity: 1,
    image: '/cart/peptidin.png',
    title: 'Peptidin™ Radiance Serum with Energy Replenshishment Peptides',
    brand: 'Dr. Jart+',
    cost: 72.9,
  },
]

export const orders = [
  {
    details: {
      id: '2344671',
      orderDate: '25 Sep 2019, 12:54pm',
      address: 'Address: Blk 562 Ang Mo Kio Ave 5, 23-00, Singapore 57789',
      deliveryDate: 'Est. Delivery: 29 Mar 2020 - 2 Apr 2020',
      status: 'Preparing Order',
    },
    purchases,
  },
  {
    details: {
      id: '2344672',
      orderDate: '30 Sep 2019, 9:21pm',
      address: 'Address: Blk 562 Ang Mo Kio Ave 5, #23-00, Singapore 57789',
      deliveryDate: 'Est. Delivery: 15 Mar 2020 - 19 Apr 2020',
      status: 'Completed',
    },
    purchases,
  },
]
