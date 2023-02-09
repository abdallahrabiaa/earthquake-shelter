const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
const controller = require('../controllers/model');
const routerPath = "/users";
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const USER = require('../models/user');
const Model = require('../controllers/model');
const User = new Model(USER);
let { findOne, find, create, update, remove } = User;

// Create validation schema for update request body

const validationChain = [
    check('email', 'Please enter a valid email').optional().isEmail(),
    check('password', 'Please enter a password length more than 5').optional().isLength({ min: 6 }),
];


const hashPassword = async (req, res, next) => {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);
    req.body.password = hashedPassword;
    next();
};


router.post(routerPath, validationChain, hashPassword, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    create.bind(User)(req, res);
});

router.get(routerPath, find.bind(User));
router.get(routerPath + '/:id', findOne.bind(User));

router.put(routerPath + '/:id', validationChain, hashPassword, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    update.bind(User)(req, res);
});

router.delete(routerPath + '/:id', remove.bind(User));

module.exports = router;
