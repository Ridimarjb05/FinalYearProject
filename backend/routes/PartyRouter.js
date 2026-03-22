const ensureAuthenticated = require('../middlewares/Auth');
const { partyCreateValidation, partyUpdateValidation } = require('../middlewares/PartyValidation');
const { createParty, listMyParties, getMyParty, updateParty, deleteParty, exportParties } = require('../controllers/PartyController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, listMyParties);
router.get('/export-parties', ensureAuthenticated, exportParties);
router.get('/:id', ensureAuthenticated, getMyParty);
router.post('/', ensureAuthenticated, partyCreateValidation, createParty);
router.put('/:id', ensureAuthenticated, partyUpdateValidation, updateParty);
router.delete('/:id', ensureAuthenticated, deleteParty);

module.exports = router;
