module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret: "mysecret",
  port: 3000,
  testPort: 3001,
  dataBaseUri: "mongodb://localhost/koaUserTask",
  testDataBaseUri: "mongodb://localhost/test",
  root: process.cwd()
};
