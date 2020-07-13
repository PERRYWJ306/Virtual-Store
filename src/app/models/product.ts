export interface IProduct {
    id: number;
    name: string;
    price: number;
    exempt: boolean;
    imported: boolean;
}

export class Product implements IProduct {
    id: number;
    name: string;
    price: number;
    exempt: boolean;
    imported: boolean;
}

export const PRODUCT_DATA: Product[] = [
    {
        id: 1,
        name: 'book',
        price: 12.49,
        exempt: true,
        imported: false
    },
    {
        id: 2,
        name: 'music CD',
        price: 14.99,
        exempt: false,
        imported: false
    },
    {
        id: 3,
        name: 'chocolate bar',
        price: 0.85,
        exempt: true,
        imported: false
    },
    {
        id: 4,
        name: 'box of chocolates',
        price: 10.0,
        exempt: true,
        imported: true
    },
    {
        id: 5,
        name: 'perfume',
        price: 47.50,
        exempt: false,
        imported: true
    },
    {
        id: 6,
        name: 'headache pills',
        price: 9.75,
        exempt: true,
        imported: false
    }
];
