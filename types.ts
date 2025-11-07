import React from 'react';

export type View = 'login' | 'categories' | 'products' | 'cart' | 'checkout' | 'confirmation';

export interface Product {
  id: string;
  name:string;
  price: string;
}

export interface CartItem extends Product {
  cartItemId: string; // Unique identifier for this specific item instance in the cart
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  products: Product[];
}