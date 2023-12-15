// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multer');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validateProducts');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

// /*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post(
    '/create',
    upload.single('image'),
    validateProducts,
    productsController.store
);

// /*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

// /*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put(
    '/edit/:id',
    upload.single('image'),
    validateProducts,
    productsController.update
);

// /*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy);

module.exports = router;
