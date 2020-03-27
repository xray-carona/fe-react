const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    console.log('Proxy setup is called.');
    app.use(proxy("/api/v1", { target: "http://localhost:3001/" }))
}