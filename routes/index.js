const Router = require("koa-router");
const users = require("./users");
const router = new Router();

router.use(users.routes());

module.exports = router;