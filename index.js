/*
REST-сервис для юзеров на Koa.JS + Mongoose

User имеет уникальный email, а также даты создания и модификации и имя displayName.

GET /users/:id - получить юзера по id, например: /users/57ffe7300b863737ddfe9a39

GET /users - получить массив юзеров

POST /users - создать пользователя
  Метод POST позволяет указать только email и displayName (нельзя при создании юзера указать его _id)

PATCH /users/:id - модифицировать пользователя
  Метод PATCH позволяет поменять только email и displayName (нельзя при создании юзера указать его _id)

DELETE /users/:id - удалить пользователя

Если юзера с данным :id нет:
   метод возвращает 404

Если ошибка валидации (напр. не указан email) или уникальности:
  метод возвращает 400 и объект с ошибками вида { errors: { field: error } }
  пример:
    {
      errors: {
        email: 'Такой email уже есть'
      }
    }

Желательно, с тестами.
*/

if(process.env.TRACE) {
  require("./libs/trace");
}

const config = require("config");
const mongoose = require("./libs/mongoose")(config.get("dataBaseUri"));
const app = require("./app");

app.listen(config.get("port"));