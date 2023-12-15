const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const controller = {
    // Root - Show all products
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products', { products: products });
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        const { id } = req.params;
        let product = products.find((product) => product.id == id);
        if (product) {
            res.render('detail', { product });
        } else {
            res.send('El producto no existe');
        }
    },

    // Create - Form to create
    create: (req, res) => {
        
        res.render('product-create-form');
    },

    // Create -  Method to store
    store: (req, res) => {
        const errors = validationResult(req);
        console.log('1-Errors', errors);
        console.log('💙💙💙💙');
        console.log('2-Errors', errors.mapped());

        const { name, price, discount, category, description } = req.body;
        console.log(req.body);
        const newProduct = {
            id: uuidv4(),
            name: name,
            price: price,
            discount: discount,
            category: category,
            description: description,
            image: req.file?.filename || 'default-image.png',
        };
        products.push(newProduct);
        let productsJSON = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect('/products');
    },

    // Update - Form to edit
    edit: (req, res) => {
        let id = req.params.id;
        let product = products.find((product) => product.id == id);
        if (product) {
            res.render('product-edit-form', { product });
        } else {
            res.send('El producto no existe');
        }
    },
    // Update - Method to update
    update: (req, res) => {
        const { name, price, discount, category, description } = req.body;
        const { id } = req.params;
        let product = products.find((product) => product.id == id);
        if (req.file?.filename && product.image != 'default-image.png') {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    '../../public/images/products',
                    product.image
                )
            );
        }
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.image = req.file?.filename || product.image;
            product.discount = discount || product.discount;

            fs.writeFileSync(
                productsFilePath,
                JSON.stringify(products, null, ' ')
            );

            res.redirect('/');
        }
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        const id = req.params.id;
        const pDelete = products.find((product) => product.id == id);
        if (pDelete.image != 'default-image.png') {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    '../../public/images/products',
                    pDelete.image
                )
            );
        }
        products = products.filter((product) => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));

        res.redirect('/');
    },
};

module.exports = controller;
