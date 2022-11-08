import { Database } from 'sqlite3';
import { inject, injectable } from 'inversify';
import BaseRepository from './BaseRepository';
import Product, { ProductCreateDto, ProductUpdateDto } from '../Product';

@injectable()
export default class ProductRepository extends BaseRepository<Product> {
  constructor(@inject(Database) private db: Database) {
    super();
  }

  async create(dto: ProductCreateDto): Promise<Product> {
    const productOrNull = await this.runQueryOne(
      `
      INSERT INTO products (name, price, updateDate)
      VALUES (?, ?, ?)
    `,
      [dto.name, dto.price.toString(), new Date().toISOString()]
    );

    return productOrNull as Product;
  }

  async delete(id: number): Promise<Product | null> {
    return await this.runQueryOne('DELETE FROM products WHERE id = ?', [
      id.toString()
    ]);
  }

  async details(id: number): Promise<Product | null> {
    return await this.runQueryOne('SELECT * FROM products WHERE id = ?', [
      id.toString()
    ]);
  }

  async list(): Promise<Product[]> {
    return await this.runQuery('SELECT * FROM products');
  }

  async update(dto: ProductUpdateDto): Promise<Product | null> {
    return await this.runQueryOne(
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

  // TODO: clean up below code
  private runQuery(sql: string, params: string[] = []): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err: any, rows: Array<Product>) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });
  }

  private async runQueryOne(
    sql: string,
    params: string[] = []
  ): Promise<Product | null> {
    const rows = await this.runQuery(sql, params);

    return rows.length > 0 ? rows[0] : null;
  }
}
