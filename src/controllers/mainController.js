const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const controller = {
    index: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const visited = products.filter(
            (product) => product.category === 'visited'
        );
        const inSale = products.filter(
            (product) => product.category === 'in-sale'
        );

        res.render('index', {
            inSale: inSale,
            visited: visited,
            toThousand: toThousand,
        });
    },
    search: (req, res) => {
        let { keywords } = req.query;

        const results = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()));
        
        res.render('results', {results, keywords});
    },
};

module.exports = controller;
