## Installation

Clone the repo

1. API
Uses docker to run two images: api & db. Some dummy data is inserted in the db during this process.
 - open a new terminal and cd into ecom
 - create a .env file inside `ecom-api` folder with input <br><br>
   ![image](https://user-images.githubusercontent.com/25385289/200906958-f5fd79e0-f951-4079-aa85-d8fd87569a3d.png)
 - run `docker compose build` <br><br>
   ![image](https://user-images.githubusercontent.com/25385289/200905056-594694c8-9971-42a5-8c5b-aad190802131.png)
 - run `docker compose up -d` <br><br>
   ![image](https://user-images.githubusercontent.com/25385289/200907113-feac4bcc-09bf-4fb2-b295-e4386f5115e7.png)

2. UI
 - open a new terminal and cd into ecom
 - cd into ecom-ui
 - run `npm install` <br><br>
 ![image](https://user-images.githubusercontent.com/25385289/200903539-a8329fac-f0ee-4c2e-9e4b-5cb97f63d27d.png)
 - run `npm run build`
 - If already have a static server use it to serve the build folder or,
   - run `npm install -g serve`
   - run `serve -s build` <br><br>
  ![image](https://user-images.githubusercontent.com/25385289/200904355-6fe5229d-dff2-4550-8171-b805f4f2968a.png)

## Usage
- The app will run on `http://localhost:3000`
- Go to login and register a new user
- User the search bar to search for products
- Use the filters to filter by name or price
- Add some products to cart, added products have an indicator
- Go to cart page to view your added products
- Can modify and delete products from cart

