module.exports = app => {
       //该文件包含用户的创建和登录路由 (login 和 create)
       const user = require("../contrillers/user.controller");
       app.post("/user",user.create);
       app.post("/user/login", user.login);
}