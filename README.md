# Node.js API assignment

Recruitment assignment for Coffee Mug

## Runtime dependencies

As few as possible.

- Express
- Inversify, `inversify-express-utils` and `reflect-metadata`
- SQLite (without an ORM)

I wrote validation and database handling logic by myself.

## Installation

Install dependencies using Yarn

```yarn```

Build TypeScript files

```yarn build```

Create and migrate the database

```yarn install-db```

Run the API!

```yarn start```

## Routes

*Price is an integer in order to prevent rounding errors.*

- `GET /products` - List all products
- `GET /products/1` - Retrieve one product by its ID
- `POST /products` - Create a new product

Example payload:
```json
{
  "name": "keyboard",
  "price": 1000
}
```

- `PUT /products` - Update an existing product

Example payload:
```json
{
  "id": 1,
  "name": "mouse",
  "price": 800
}
```

- `DELETE /products/1` - Delete a product
