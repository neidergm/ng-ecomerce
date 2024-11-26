export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    name: string;
    category: string;
    gender: ValidGenders
}

// export type ValidCategories = 'men'|'women'|'kid'|'unisex';
export type ValidGenders = 'male' | 'female' | 'unisex';
export type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'UNIQUE';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

export type ProductInCart = {
    id: string;
    slug: string;
    name: string;
    price: number;
    quantity: number;
    size: ValidSizes;
    image: string;
}