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
    categoryId: string;
    category: string;
    gender: ValidCategories
}

// export type ValidCategories = 'men'|'women'|'kid'|'unisex';
export type ValidCategories = 'male'|'female'|'unisex';
export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL' | 'UNIQUE';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';
