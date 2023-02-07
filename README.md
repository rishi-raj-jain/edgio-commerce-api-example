# Creating APIs with Serverless Functions by Edgio: A Fake E-Commerce API

[![Deploy with Edgio](https://docs.edg.io/button.svg)](https://app.layer0.co/deploy?repo=https://github.com/rishi-raj-jain/edgio-ecommerce-api-example)

![Creating APIs with Serverless Functions by Edgio: A Fake E-Commerce API](https://raw.githubusercontent.com/rishi-raj-jain/layer0-ecommmerce-api-example/master/Layer0-Serverless-Functions.png)

[Edgio Serverless Functions](https://docs.edg.io/guides/serverless_functions) allow you to create APIs without using a Javascript framework. This example is to create a free online REST API that you can use whenever you need Pseudo-real data for your e-commerce without running any server-side code.

## Resources

There are 3 main resources need in e-commerce prototypes:

- All Products: /products/all
- Specific Product: /products/:slug
- Image(s) of the products: /product-images/:slug

## How To

One can fetch data with any kind of methods you know(fetch API, Axios, JQuery AJAX, etc.)

### Get all products
```js
fetch("https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link/products/all")
  .then((res) => res.json())
  .then((res) => console.log(res))
```

### Get a single product
```js
fetch("https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link/products/next-js-enamel-mug")
  .then((res) => res.json())
  .then((res) => console.log(res))
```

### Get all images of a product
```js
fetch("https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link/product-images/next-js-enamel-mug")
  .then((res) => res.json())
  .then((res) => console.log(res))
```

## [Contributing] Getting Started

### Clone This Repo

Use `git clone https://github.com/rishi-raj-jain/edgio-ecommerce-api-example.git` to get the files within this repository onto your local machine.

### Install dependencies

On the command line, in the project root directory, run the following command:

```bash
npm install
```

### Run Serverless Functions locally on Edgio

```bash
edgio dev
```

### Testing production build locally with Edgio

```bash
edgio build && edgio run --production
```

Setting --production runs your app exactly as it will be uploaded to the Edgio cloud using serverless-offline.

## Deploying to Edgio

Deploying requires an account on Edgio. [Sign up here for free](https://app.layer0.co/signup). Once you have an account, you can deploy to Edgio by running the following in the root folder of your project:

```bash
edgio deploy
```

See [deploying](https://docs.edg.io/guides/deploying) for more information.
