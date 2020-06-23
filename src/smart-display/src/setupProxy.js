const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy(
            "/api/openhab/**", {
            target: "http://openhab.cb7.com:8080",
            changeOrigin: true,
            pathRewrite: {
                "^/api/openhab/": ""
            }
        })
    );
};