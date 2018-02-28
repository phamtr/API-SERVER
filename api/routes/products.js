const express =require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
message: 'Handling Get request to/products'
    });
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
message: 'Handling Post request to/products'
    });
});
router.get('/:productId', (req, res, next) =>{
const id = req.params.productId;
if(id === 'special'){
    res.status(200).json({ message: 'You discovered the special ID',
id: id
});
}else{
    res.status(200).json({ message: 'You passed an ID'});
}
});

router.patch('/:productId', (req, res, next) =>{
res.status(200).json({ message: 'You Updated product'});
    });
router.delete('/:productId', (req, res, next) =>{
        res.status(200).json({ message: 'You Deleted product'});
            });
module.exports = router;