import {Image} from 'react-native';
import {Images} from '../../../theme/Images';

export const items = [
  // this is the parent or 'item'
  {
    name: 'FRUITY',
    id: 0,
    // these are the children or 'sub items'
    hasChildren: true,
    children: [
      {
        name: 'FRUITY',
        id: 1,
      },
      {
        name: 'citrus',
        id: 2,
      },
      {
        name: 'grapefruit',
        id: 3,
      },
      {
        name: 'lemon',
        id: 4,
      },
      {
        name: 'lime',
        id: 5,
      },
      {
        name: 'GREEN FRUIT',
        id: 6,
      },
      {
        name: 'apple',
        id: 7,
      },
      {
        name: 'pear',
        id: 8,
      },
      {
        name: 'gooseberry',
        id: 9,
      },
      {
        name: 'STONE FRUIT',
        id: 10,
      },
      {
        name: 'apricot',
        id: 11,
      },
      {
        name: 'peach',
        id: 12,
      },
      {
        name: 'RED FRUIT',
        id: 13,
      },
      {
        name: 'raspberry',
        id: 14,
      },
      {
        name: 'strawberry',
        id: 15,
      },
      {
        name: 'red cherry',
        id: 16,
      },
      {
        name: 'redcurrant',
        id: 17,
      },
      {
        name: 'plum',
        id: 18,
      },
      {
        name: 'BLACK FRUIT',
        id: 19,
      },
      {
        name: 'blackberry',
        id: 20,
      },
      {
        name: 'black cherry',
        id: 21,
      },
      {
        name: 'blackcurrant',
        id: 22,
      },
      {
        name: 'TROPICAL FRUIT',
        id: 23,
      },
      {
        name: 'banana',
        id: 24,
      },
      {
        name: 'kiwi',
        id: 25,
      },
      {
        name: 'lychee',
        id: 26,
      },
      {
        name: 'mango',
        id: 27,
      },
      {
        name: 'melon',
        id: 28,
      },
      {
        name: 'passion fruit',
        id: 29,
      },
      {
        name: 'pineapple',
        id: 30,
      },
      {
        name: 'DRIED FRUIT',
        id: 31,
      },
      {
        name: 'fig',
        id: 32,
      },
      {
        name: 'prune',
        id: 33,
      },
      {
        name: 'raisin',
        id: 34,
      },
    ],
  },

  {
    name: 'FLORAL',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: 'FLORAL',
        id: 1,
      },
      {
        name: 'rose',
        id: 2,
      },
      {
        name: 'violet',
        id: 3,
      },
      {
        name: 'elderflower',
        id: 4,
      },
      {
        name: 'orange',
        id: 5,
      },
      {
        name: 'blossom',
        id: 6,
      },
      {
        name: 'perfume',
        id: 7,
      },
    ],
  },

  {
    name: 'SPICY',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: 'SPICY',
        id: 1,
      },
      {
        name: 'cinnamon',
        id: 2,
      },
      {
        name: 'cloves',
        id: 3,
      },
      {
        name: 'ginger',
        id: 4,
      },
      {
        name: 'nutmeg',
        id: 5,
      },
      {
        name: 'vanilla',
        id: 6,
      },
      {
        name: 'pepper',
        id: 7,
      },
      {
        name: 'liquorice',
        id: 8,
      },
      {
        name: 'juniper',
        id: 9,
      },
    ],
  },

  {
    name: 'VEGETAL',
    id: 3,
    // these are the children or 'sub items'
    children: [
      {
        name: 'VEGETAL',
        id: 1,
      },
      {
        name: 'asparagus',
        id: 2,
      },
      {
        name: 'bell pepper',
        id: 3,
      },
      {
        name: 'mushroom',
        id: 4,
      },
      {
        name: 'olive',
        id: 5,
      },
    ],
  },

  {
    name: 'HERBACEOUS',
    id: 4,
    // these are the children or 'sub items'
    children: [
      {
        name: 'HERBACEOUS',
        id: 1,
      },
      {
        name: 'eucalyptus',
        id: 2,
      },
      {
        name: 'grass',
        id: 3,
      },
      {
        name: 'mint',
        id: 4,
      },
      {
        name: 'leaves',
        id: 5,
      },
    ],
  },

  {
    name: 'OAK - NUTTY',
    id: 5,
    // these are the children or 'sub items'
    children: [
      {
        name: 'OAK - NUTTY',
        id: 1,
      },
      {
        name: 'cedar',
        id: 2,
      },
      {
        name: 'smoky',
        id: 3,
      },
      {
        name: 'tobacco',
        id: 4,
      },
      {
        name: 'almond',
        id: 5,
      },
      {
        name: 'coconut',
        id: 6,
      },
      {
        name: 'hazelnut',
        id: 7,
      },
      {
        name: 'walnut',
        id: 8,
      },
    ],
  },

  {
    name: 'COMPLEX',
    id: 6,
    // these are the children or 'sub items'
    children: [
      {
        name: 'COMPLEX',
        id: 1,
      },
      {
        name: 'mineral',
        id: 2,
      },
      {
        name: 'aromatic',
        id: 3,
      },
      {
        name: 'chocolate',
        id: 4,
      },
      {
        name: 'coffee',
        id: 5,
      },
      {
        name: 'leather',
        id: 6,
      },
      {
        name: 'meaty',
        id: 7,
      },
      {
        name: 'earthy',
        id: 8,
      },
      {
        name: 'petrol',
        id: 9,
      },
      {
        name: 'stony/steely',
        id: 10,
      },
    ],
  },

  {
    name: 'RIPE',
    id: 7,
    // these are the children or 'sub items'
    children: [
      {
        name: 'RIPE',
        id: 1,
      },
      {
        name: 'oxidative',
        id: 2,
      },
      {
        name: 'caramel',
        id: 3,
      },
      {
        name: 'candy',
        id: 4,
      },
      {
        name: 'honey',
        id: 5,
      },
      {
        name: 'jam',
        id: 6,
      },
      {
        name: 'cooked',
        id: 7,
      },
      {
        name: 'baked',
        id: 8,
      },
      {
        name: 'stewed',
        id: 9,
      },
    ],
  },
  {
    name: 'AUTOLYTIC',
    id: 8,
    // these are the children or 'sub items'
    children: [
      {
        name: 'AUTOLYTIC',
        id: 1,
      },
      {
        name: 'yeast',
        id: 2,
      },
      {
        name: 'biscuit',
        id: 3,
      },
      {
        name: 'bread',
        id: 4,
      },
      {
        name: 'toast',
        id: 5,
      },
    ],
  },
];
