// src/data/defaultProducts.ts

export type Product = {
    id: string;
    name: string;
    price: number;
    vatRate: number;
  };
  
  export const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Ekmek',
      price: 5,
      vatRate: 1,
    },
    {
      id: '2',
      name: 'Süt',
      price: 6,
      vatRate: 8,
    },
    {
      id: '3',
      name: 'Yumurta',
      price: 10,
      vatRate: 1,
    },
  ];