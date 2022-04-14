const express = require('express');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const {Idea} = require('../../db/models')


const router = express.Router();

router.get('', asyncHandler(async function (req, res) {
    const allIdeas = await Idea.findAll();

    return res.json(allIdeas)
}));


router.get('/:listId', asyncHandler(async function (req, res) {
    const ideas = await Idea.findAll(
        {
            where: {listId: req.params.listId}
        }
    );

    return res.json(ideas)
}));



module.exports = router;
