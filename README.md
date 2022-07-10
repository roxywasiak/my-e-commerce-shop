# Title : my-e-commerce-shop

![MIT](https://img.shields.io/badge/License-MIT-green)

## Table of Contents

- [About the Project](#about-🧠)
- [Technologies](#technologies-📕)
- [Installation](#installation-🔍)
- [Demo Video](#demo-video-📽)
- [Contact me](#contact-me-👋)

## About the project 🧠

As a manager at an internet retail company I want a back end for my e-commerce website that uses the latest technologies so my company can compete with other e-commerce companies.

The e-commerce database consists of 4 tables Category, Product, Tag, Product_Tag(Junction table) which extend the Sequelize model.

there are 15 endpoints 5 for each request listed below:

- GET - find all items
- GET - find one item by ID
- POST - create a new item
- PUT - update an item
- Delete - destroy a item

## Technologies 📕

Node.js, Express.js, MySQL2, Sequelize, dotenv, Postman for API requests

## Installation 🔍

```
git clone https://git@github.com:roxywasiak/my-e-commerce-shop.git

cd my-e-commerce-shop

npm i
```

## MySQL Workbench

```
DROP DATABASE IF EXISTS ecommerce_db;

CREATE DATABASE ecommerce_db;
```

## Seed the data

```
npm run seed
```

## Launch the application 🚀

```
npm run start
```

## Demo Video 📽

## Contact me 👋

If you have any questions about this application, please contact me by [email](ruksclone@hotmail.com).
