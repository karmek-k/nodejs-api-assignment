import 'reflect-metadata';
import container from './container/container';
import { Database } from 'sqlite3';

const db = container.get<Database>(Database);

db.run(
  `
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  price INT NOT NULL,
  updateDate TEXT NOT NULL
);`,
  err => {
    if (err) {
      console.error(err.message);

      process.exit(1);
    }

    console.log('Database created successfully');
  }
);