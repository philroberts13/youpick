const express = require('express');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const {List} = require('../../db/models');
const {Idea} = require('../../db/models')
const validateList = require('../api/validations/lists')

const router = express.Router();

router.get('/:userId', asyncHandler(async function(req, res) {
    const userLists = await List.findAll({where: {userId: req.params.userId}})
    return res.json(userLists)
}));

router.get('', asyncHandler(async function(req, res) {
    const lists = await List.findAll()
    return res.json(lists)
}));

router.get('/page/:id', asyncHandler(async function(req, res) {
    const list = await List.findByPk(req.params.id)
    return res.json(list);
}));

router.post('', validateList,  asyncHandler(async function (req, res) {
    const list = await List.create(req.body);
    return res.json(list);
}));

router.put('/page/edit/:id', validateList,  asyncHandler(async function (req, res) {
    const { id, title, type } = req.body;
    await List.update({ id, title, type }, {where: {id: req.params.id} })
    const list = await List.findByPk(req.params.id)
    return res.json(list);
   })
);

router.delete('/page/:id', asyncHandler(async function(req, res) {
    const { id } = req.params;
    const list = await List.findByPk(id)
    const ideas = await Idea.findAll({where: {listId: id}})

    const ideasArr = [...ideas]
    await ideasArr.forEach(idea => idea.destroy());
    await list.destroy();
    return res.json({ message: 'success' });

}));

module.exports = router;
