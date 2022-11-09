import { injectable } from 'inversify';
import BaseRepository from './BaseRepository';
import Product, { ProductCreateDto, ProductUpdateDto } from '../Product';

@injectable()
export default class ProductRepository extends BaseRepository<Product> {
  async create(dto: ProductCreateDto): Promise<Product> {
    const productOrNull = await this.db.runQueryOne<Product>(
      `
      INSERT INTO products (name, price, updateDate)
      VALUES (?, ?, ?)
    `,
      [dto.name, dto.price.toString(), new Date().toISOString()]
    );

    return productOrNull as Product;
  }

  async delete(id: number): Promise<Product | null> {
    return await this.db.runQueryOne<Product>(
      'DELETE FROM products WHERE id = ?',
      [id.toString()]
    );
  }

  async details(id: number): Promise<Product | null> {
    return await this.db.runQueryOne<Product>(
      'SELECT * FROM products WHERE id = ?',
      [id.toString()]
    );
  }

  async list(): Promise<Product[]> {
    return await this.db.runQuery<Product>('SELECT * FROM products');
  }

  async update(dto: ProductUpdateDto): Promise<Product | null> {
    return await this.db.runQueryOne<Product>(
      `
      UPDATE products 
      SET name = ?, price = ?, updateDate = ?
      WHERE id = ?
    `,
      [
        dto.name,
        dto.price.toString(),
        new Date().toISOString(),
        dto.id.toString()
      ]
    );
  }
}
