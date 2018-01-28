const Koa = require("koa");
const app = module.exports = new Koa();

const config = require("config");

const path = require("path");
const fs = require("fs");

const handlers = fs.readdirSync(path.join(__dirname, "middleware")).sort();

handlers.forEach(handler => require("./middleware/" + handler).init(app));

const router = require("./routes");

app.use(router.routes());
app.use(router.allowedMethods());