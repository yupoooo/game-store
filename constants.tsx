import type { ProductCategory } from './types';
import { PubgCoinIcon, FreeFireDiamondIcon, FifaCoinIcon, StoreCardIcon } from './components/Icons';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
        id: 'pubg-uc',
        name: 'PUBG UC',
        icon: PubgCoinIcon,
        products: [
            { id: 'pubg-1', name: '60 UC', price: '$0.99' },
            { id: 'pubg-2', name: '325 UC', price: '$4.99' },
            { id: 'pubg-3', name: '660 UC', price: '$9.99' },
            { id: 'pubg-4', name: '1800 UC', price: '$24.99' },
            { id: 'pubg-5', name: '3850 UC', price: '$49.99' },
            { id: 'pubg-6', name: '8100 UC', price: '$99.99' },
        ]
    },
    {
        id: 'freefire-gems',
        name: 'FREE FIRE GEMS',
        icon: FreeFireDiamondIcon,
        products: [
            { id: 'ff-1', name: '100 Diamonds', price: '$0.99' },
            { id: 'ff-2', name: '310 Diamonds', price: '$2.99' },
            { id: 'ff-3', name: '520 Diamonds', price: '$4.99' },
            { id: 'ff-4', name: '1060 Diamonds', price: '$9.99' },
            { id: 'ff-5', name: '2180 Diamonds', price: '$19.99' },
            { id: 'ff-6', name: '5600 Diamonds', price: '$49.99' },
        ]
    },
    {
        id: 'fifa-coins',
        name: 'FIFA COINS',
        icon: FifaCoinIcon,
        products: [
            { id: 'fifa-1', name: '1050 Points', price: '$9.99' },
            { id: 'fifa-2', name: '2200 Points', price: '$19.99' },
            { id: 'fifa-3', name: '4600 Points', price: '$39.99' },
            { id: 'fifa-4', name: '12000 Points', price: '$99.99' },
        ]
    },
    {
        id: 'store-cards',
        name: 'STORE CARDS',
        icon: StoreCardIcon,
        products: [
            { id: 'sc-1', name: 'Google Play $10', price: '$10.00' },
            { id: 'sc-2', name: 'iTunes $10', price: '$10.00' },
            { id: 'sc-3', name: 'PlayStation $20', price: '$20.00' },
            { id: 'sc-4', name: 'Xbox $20', price: '$20.00' },
            { id: 'sc-5', name: 'Steam $50', price: '$50.00' },
        ]
    }
];
