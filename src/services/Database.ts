import { inject, injectable } from 'inversify';
import { symbols } from '../container/symbols';
import Config from '../config';
import sqlite3 from 'sqlite3';

@injectable()
export default class Database {
  constructor(@inject(symbols.Config) private config: Config) {}

  build(): Promise<sqlite3.Database> {
    return new Promise((resolve, reject) => {
      resolve(
        new sqlite3.Database(this.config.databaseFile, err => {
          if (err) {
            reject(`Error while connecting to the db: ${err.message}`);
          }
        })
      );
    });
  }

  async runQuery<T>(sql: string, params: string[] = []): Promise<T[]> {
    const db = await this.build();

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err: any, rows: Array<T>) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });
  }

  async runQueryOne<T>(sql: string, params: string[] = []): Promise<T | null> {
    const rows = await this.runQuery<T>(sql, params);

    return rows.length > 0 ? rows[0] : null;
  }
}
