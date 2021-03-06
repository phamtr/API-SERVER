const express =require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');
const checkAuth = require('../middleware/check-auth');


const Admin = require('../models/admin');

router.post('/signup', AdminController.admin_signup);

router.post("/login", AdminController.admin_login);

router.delete('/:adminId', checkAuth, AdminController.admin_delete)

module.exports = router;