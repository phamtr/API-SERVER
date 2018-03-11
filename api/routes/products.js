const express =require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const fileFilter = (req, file, cb) =>{
    if (file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
    
}
const upload = multer({ storage: storage, limits:{
    fileSize: 1024*1024*5
}, fileFilter: fileFilter });
const Product = require('../models/product');
const productController = require('../controllers/products')


router.get('/', checkAuth, productController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), productController.products_create_product);
router.get('/:productId', checkAuth, productController.products_get_product);

router.patch('/:productId', checkAuth, productController.products_patch_product);
router.delete('/:productId', checkAuth, productController.products_delete_product);
module.exports = router;