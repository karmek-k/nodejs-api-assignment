export default interface Product {
  id: number;
  name: string;
  price: number;
  updateDate: Date;
}

export interface ProductCreateDto extends Partial<Product> {
  name: string;
  price: number;
}

export interface ProductUpdateDto extends Partial<Product> {
  id: number;
  name: string;
  price: number;
}
