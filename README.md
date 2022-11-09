## Installation

Clone the repo

1. UI
 - cd into ecom-ui
 - run `npm install`
 - run `npm run start`

2. API
Uses docker to run two images: api & db. Some dummy data is inserted in the db during this process.
 - run `docker compose build`
 - run `docker compose up -d`

## Usage
- The UI will run on `http://127.0.0.1:3000`
- Go to login and register a new user
- Add some products to cart
- Go to cart page to view your added products
- Can modify and delete products from cart

