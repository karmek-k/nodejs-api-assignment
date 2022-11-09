import 'reflect-metadata';
import container from './container/container';
import Database from './services/Database';
import { symbols } from './container/symbols';

const db = container.get<Database>(symbols.Database);

db.runQuery(
  `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  updateDate TEXT NOT NULL
);`
)
  .then(() => console.log('Database created successfully'))
  .catch(err => {
    console.error(err.message);

    process.exit(1);
  });
