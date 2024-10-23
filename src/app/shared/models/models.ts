export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt:string;
  category:object;
}

export interface NewProduct {
    title: string;
    price: number;
    description?: string;
    images?: string[];
    categoryId?: number;
    }
      
