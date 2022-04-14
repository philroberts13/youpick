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
        { where: {listId: req.params.listId}}
    );
    return res.json(ideas)
}));

router.put('/edit/:id', asyncHandler(async function (req, res) {
    const { id, title, description } = req.body;
    await Idea.update({id, title, description}, {where: {id: req.params.id} })
    const idea = await Idea.findByPk(req.params.id)
    return res.json(idea);
    })
);

router.post('', asyncHandler(async function (req, res) {
    const idea = await Idea.create(req.body);
    return res.json(idea);
}));

  router.delete('/edit/:id',asyncHandler(async (req, res) => {
        const idea = await Idea.findByPk(req.params.id);
        await Idea.destroy();
        return res.json({ message: 'success' });
    })
);



module.exports = router;
