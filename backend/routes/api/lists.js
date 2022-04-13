const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {List} = require('../../db/models');
const router = express.Router();

router.get('/:userId', asyncHandler(async function(req, res) {
    const userLists = await List.findAll({where: {userId: req.params.userId}})
    return res.json(userLists)
}))

router.get('', asyncHandler(async function(req, res) {
    const Lists = await List.findAll()
    return res.json(Lists)
}))

router.post('', asyncHandler(async function (req, res) {
    const list = await List.create(req.body);
    return res.json(list);
}))

module.exports = router;
