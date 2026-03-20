const ensureAuthenticated = require('../middlewares/Auth');
const { uploadImage, getMyImages, deleteImage } = require('../controllers/ImageController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, getMyImages);
router.post('/', ensureAuthenticated, uploadImage);
router.delete('/:id', ensureAuthenticated, deleteImage);

module.exports = router;
