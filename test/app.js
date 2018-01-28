const config = require("config");
const mongoose = require("libs/mongoose")(config.get("testDataBaseUri"));
const app = require("../app");
const User = require("models/user");
const assert = require("assert");
const request = require("request-promise").defaults({
  resolveWithFullResponse: true,
  simple: false
});

const rootUrl = `http://localhost:${config.get("testPort")}/users`;

const fixtureUser = {
  email: "example@mail.com",
  displayName: "Example",
  _id: "123456789012345678901234"
};
const changedFixtureUser = {
  email: "changedemail@mail.com",
  displayName: "Example",
  _id: "123456789012345678901234"
};

describe("User REST API", async () => {
  let server = null;
  before(async () => {
    server = await app.listen(config.get("testPort"));
    await User.remove({});
  });

  after(async () => {
    await User.remove({});
    await mongoose.disconnect();
    await server.close();
  });

  describe("POST /users/", async () => {
    it("should create user", async () => {
      const response = await request.post({
        url: rootUrl,
        json: true,
        body: fixtureUser
      });
      let object = response.body;
      assert.equal(response.statusCode, 200, JSON.stringify(object));
      assert.equal(typeof object, "object");
      assert(!(object instanceof Array));
      assert.deepEqual(object, fixtureUser);
    });
  });

  describe("GET /users/", async () => {
    let body = null;

    it("should return right users json string", async () => {
      const response = await request.get(rootUrl);
      assert.equal(response.statusCode, 200, JSON.stringify(response.body));
      body = JSON.parse(response.body);
      assert(body instanceof Array, JSON.stringify(body));
    });

    it("should have length = 1", async () => {
      assert.equal(body.length, 1);
    });

    it("should have right signature", async () => {
      const object = body[0];
      assert.deepEqual(object, fixtureUser);
    });
  });

  describe("GET /users/:userId", async () => {
    it("should reutrn right json string", async () => {
      const response = await request.get(`${rootUrl}/${fixtureUser._id}`);
      assert.equal(response.statusCode, 200, response.body);
      const object = JSON.parse(response.body);
      assert.deepEqual(object, fixtureUser);
    });
  });

  describe("PATCH /users/:userId", async () => {
    it("should change user email", async () => {
      const response = await request.patch({
        url: `${rootUrl}/${fixtureUser._id}`,
        json: true,
        body: {
          email: changedFixtureUser.email
        }
      });
      assert.deepEqual(response.body, changedFixtureUser);
      assert.equal(response.statusCode, 200, JSON.stringify(response.body));
    });
  });
  
  describe("DELETE /users/:userId", async () => {
    it("should remove user", async () => {
      const response = await request.delete(`${rootUrl}/${fixtureUser._id}`);
      assert.equal(response.statusCode, 200, response.body);
      const user = await User.find({_id: fixtureUser._id});
      const object = JSON.parse(response.body);
      assert.deepEqual(object, changedFixtureUser, "changed user not equal to fixture");
      assert(!user.length);
    });
  });
});