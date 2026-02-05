export type Wine = {
  id: string
  name: string
  winery: string
  vintage: string
  region: string
  country: string
  price: number
  rating: number
  ratingsCount: number
  type: 'Red' | 'White' | 'Sparkling' | 'Rosé'
  sweetness: number
  acidity: number
  tannin: number
  body: number
  alcohol: string
  notes: string[]
  foodPairing: string[]
  imageGradient: string
  imagePath: string
}

export const wines: Wine[] = [
  {
    id: '1',
    name: 'Cabernet Sauvignon Reserve',
    winery: 'Oakridge Cellars',
    vintage: '2019',
    region: 'Napa Valley',
    country: 'USA',
    price: 38,
    rating: 4.4,
    ratingsCount: 2140,
    type: 'Red',
    sweetness: 1,
    acidity: 3,
    tannin: 4,
    body: 4,
    alcohol: '14.5%',
    notes: ['blackberry', 'cedar', 'cocoa'],
    foodPairing: ['steak', 'mushrooms', 'aged cheese'],
    imageGradient: 'linear-gradient(135deg, #3B0A16 0%, #7C1D3A 45%, #D84A68 100%)',
    imagePath: '/images/bottles/bottle-01.svg'
  },
  {
    id: '2',
    name: 'Pinot Noir Estate',
    winery: 'Silver Creek',
    vintage: '2020',
    region: 'Willamette Valley',
    country: 'USA',
    price: 29,
    rating: 4.2,
    ratingsCount: 1640,
    type: 'Red',
    sweetness: 1,
    acidity: 4,
    tannin: 2,
    body: 3,
    alcohol: '13.8%',
    notes: ['cherry', 'rose', 'forest floor'],
    foodPairing: ['duck', 'salmon', 'herbs'],
    imageGradient: 'linear-gradient(135deg, #4C0D21 0%, #B92B4E 55%, #F3A7B5 100%)',
    imagePath: '/images/bottles/bottle-02.svg'
  },
  {
    id: '3',
    name: 'Rosé Lumière',
    winery: 'Maison Claire',
    vintage: '2023',
    region: 'Provence',
    country: 'France',
    price: 22,
    rating: 4.1,
    ratingsCount: 980,
    type: 'Rosé',
    sweetness: 2,
    acidity: 3,
    tannin: 1,
    body: 2,
    alcohol: '12.5%',
    notes: ['strawberry', 'citrus', 'white peach'],
    foodPairing: ['salads', 'seafood', 'soft cheese'],
    imageGradient: 'linear-gradient(135deg, #F9D4DA 0%, #E8768F 55%, #B92B4E 100%)',
    imagePath: '/images/bottles/bottle-03.svg'
  },
  {
    id: '4',
    name: 'Chardonnay Solstice',
    winery: 'Golden Ridge',
    vintage: '2021',
    region: 'Sonoma Coast',
    country: 'USA',
    price: 26,
    rating: 4.0,
    ratingsCount: 1120,
    type: 'White',
    sweetness: 2,
    acidity: 3,
    tannin: 1,
    body: 3,
    alcohol: '13.5%',
    notes: ['green apple', 'vanilla', 'toast'],
    foodPairing: ['roast chicken', 'pasta', 'creamy sauces'],
    imageGradient: 'linear-gradient(135deg, #F9F7F4 0%, #E5F3E6 55%, #9ED39E 100%)',
    imagePath: '/images/bottles/bottle-04.svg'
  },
  {
    id: '5',
    name: 'Sauvignon Blanc Coastline',
    winery: 'Mist & Stone',
    vintage: '2022',
    region: 'Marlborough',
    country: 'New Zealand',
    price: 20,
    rating: 4.3,
    ratingsCount: 1860,
    type: 'White',
    sweetness: 1,
    acidity: 4,
    tannin: 1,
    body: 2,
    alcohol: '12.8%',
    notes: ['lime', 'gooseberry', 'herbs'],
    foodPairing: ['shellfish', 'goat cheese', 'fresh herbs'],
    imageGradient: 'linear-gradient(135deg, #E5F3E6 0%, #9ED39E 45%, #3D9140 100%)',
    imagePath: '/images/bottles/bottle-05.svg'
  },
  {
    id: '6',
    name: 'Syrah Nightfall',
    winery: 'Montara Hills',
    vintage: '2018',
    region: 'Barossa Valley',
    country: 'Australia',
    price: 34,
    rating: 4.5,
    ratingsCount: 2400,
    type: 'Red',
    sweetness: 1,
    acidity: 3,
    tannin: 4,
    body: 4,
    alcohol: '14.8%',
    notes: ['plum', 'pepper', 'smoke'],
    foodPairing: ['bbq', 'lamb', 'hard cheese'],
    imageGradient: 'linear-gradient(135deg, #2F0715 0%, #6B152E 50%, #B92B4E 100%)',
    imagePath: '/images/bottles/bottle-06.svg'
  },
  {
    id: '7',
    name: 'Prosecco Brillante',
    winery: 'Villa Bianca',
    vintage: '2023',
    region: 'Veneto',
    country: 'Italy',
    price: 18,
    rating: 4.0,
    ratingsCount: 890,
    type: 'Sparkling',
    sweetness: 2,
    acidity: 3,
    tannin: 1,
    body: 2,
    alcohol: '11.5%',
    notes: ['pear', 'white flowers', 'almond'],
    foodPairing: ['aperitivo', 'fruit', 'soft cheese'],
    imageGradient: 'linear-gradient(135deg, #F9F7F4 0%, #F3A7B5 50%, #E8768F 100%)',
    imagePath: '/images/bottles/bottle-07.svg'
  },
  {
    id: '8',
    name: 'Tempranillo Gran Reserva',
    winery: 'Bodega Aurelia',
    vintage: '2017',
    region: 'Rioja',
    country: 'Spain',
    price: 32,
    rating: 4.3,
    ratingsCount: 1520,
    type: 'Red',
    sweetness: 1,
    acidity: 3,
    tannin: 3,
    body: 4,
    alcohol: '14.0%',
    notes: ['dark cherry', 'leather', 'spice'],
    foodPairing: ['jamón', 'roasted vegetables', 'aged cheese'],
    imageGradient: 'linear-gradient(135deg, #3B0A16 0%, #8A1D3B 55%, #D84A68 100%)',
    imagePath: '/images/bottles/bottle-08.svg'
  }
]
