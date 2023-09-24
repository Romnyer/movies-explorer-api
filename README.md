# Бэкенд дипломного проекта

Выполнен деплой на виртуальной машине. Бэкенд привязан к домену, выпущен сертификат.

## ⚙️Функционал
* База данных на MongoDB
* Схемы и модели для пользователей и карточек
* Авторизация и регистрация пользователей
* Контроль прав пользователей
* Роутинг
* Медлвэр для авторизации и защиты роутов, кроме регистрации и логина
* Центролизованная обработка ошибок
* Валидация данных на уровне схемы. Ссылки валидируются через регулярное выражение
* Перенаправление запросов через Nginx
* Сделан hot-reload
* Настроен linter с исключением для переменной _id

## Запуск проекта локально

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

### 🛠Стек
<div>
  <img src="https://img.shields.io/badge/Express.js-black?style=flat-square&logo=Express&logoColor=white" alt="Express.js" style="display:inline;"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white" alt="MongoDB" style="display:inline;"/>
  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=Ubuntu&logoColor=white" alt="Ubuntu" style="display:inline;"/>
  <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white" alt="Nginx" style="display:inline;"/>
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white" alt="Postman" style="display:inline;"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white" alt="ESLint" style="display:inline;"/>
</div>
