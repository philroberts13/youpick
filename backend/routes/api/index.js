// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listsRouter = require('./lists.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/lists', listsRouter)


module.exports = router;
