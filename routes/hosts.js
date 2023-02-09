const express = require('express');
const router = express.Router();
const hostModel = require('../models/host.js');
const controller = require('../controllers/modelController');
const routerPath = "/hosts";
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
    controller.create(hostModel)(req, res);
});

router.get(routerPath, controller.find(hostModel));
router.get(routerPath + '/:id', controller.findOne(hostModel));

router.put(routerPath + '/:id', validationChain, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    controller.update(hostModel)(req, res);
});

router.delete(routerPath + '/:id', controller.remove(hostModel));

module.exports = router;
