const express = require('express');
const router = express.Router();
const hostModel = require('../models/host.js');
const controller = require('../controllers/model');
const routerPath = "/hosts";
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const HOST = require('../models/host');
const Model = require('../controllers/model');
const Host = new Model(HOST);
let { findOne, find, create, update, remove } = Host;

// Create validation schema for update request body

const validationChain = [
    // check('username', 'Please enter a valid username').optional().not().isEmpty(),
    // check('email', 'Please enter a valid email').optional().isEmail(),
    // check('password', 'Please enter a password length more than 5').optional().isLength({ min: 6 }),
];




router.post(routerPath, validationChain, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    create(req, res);
});

router.get(routerPath, find.bind(Host));
router.get(routerPath + '/:id', findOne.bind(Host));

router.put(routerPath + '/:id', validationChain, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    update.bind(Host)(req, res);
});

router.delete(routerPath + '/:id', remove.bind(Host));

module.exports = router;
