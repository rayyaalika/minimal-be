const router = require('express').Router();

const {
    get_product, post_product, put_product, delete_product
} = require('../../controllers/ProdukController');

const {
    Authentication
} = require('../../middlewares/middleware');

router.get("/produk/", Authentication, get_product);
router.post("/produk/", Authentication, post_product);
router.put("/produk/:id_products", Authentication, put_product);
router.delete("/produk/:id_products", Authentication, delete_product);

module.exports = router;