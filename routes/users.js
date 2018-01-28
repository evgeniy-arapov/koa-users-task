const Router = require("koa-router");
const User = require("models/user");

const router = new Router({
  prefix: "/users"
})
  .get("/", async ctx => {
    let users = await User.find({});
    ctx.body = users.map(user => user.toObject());
  })
  .get("/:userId", async ctx => {
    const user = await User.findById(ctx.params.userId);
    ctx.body = user.toObject();
  })
  .post("/", async ctx => {
    const newUser = await User.create(ctx.request.body);
    ctx.body = newUser.toObject();
  })
  .delete("/:userId", async ctx => {
    const user = await User.findByIdAndRemove(ctx.params.userId);
    ctx.body = user.toObject();
  })
  .patch("/:userId", async ctx => {
    const userId = ctx.params.userId;
    const newFields = ctx.request.body;
    const changedUser = await User.findByIdAndUpdate(userId, newFields, { new: true});
    ctx.body = changedUser.toObject();
  });

module.exports = router;