export class Product {
  id: number;
  name: string;
  description: string;
  gender: string;
  brand: string;
  category: string;
  size: number[];
  color: string[];
  discountPrice?: number;
  price: number;
  is_in_inventory: boolean;
  items_left: number;
  imageURL: string;
  slug: string;
}
