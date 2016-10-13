"use strict";

function init() {
    var e = global.appConfig.isDev,
        r = (require("./trans/transConfigToPf.js"), require("./trans/transWxmlToJs.js"), require("./trans/transWxmlToHtml.js"), require("./trans/transManager.js")),
        s = require("./utils/tools.js"),
        t = (require("async"), require("fs")),
        i = require("path"),
        p = require("url"),
        n = require("./utils/vendorManager.js"),
        o = (require("glob"), require("./utils/projectManager.js")),
        c = require("../config/appserviceConfig.js"),
        a = require("../stores/projectStores.js"),
        u = require("../stores/windowStores.js"),
        l = require("./tpl/errorTpl.js"),
        j = require("./tpl/appserviceErrorTpl.js"),
        g = i.join(__dirname, "appservice/asdebug.js"),
        f = t.readFileSync(g, "utf8");
    s.noBrowser.join(",");
    _exports.getAppservice = function(r, g) {
        var v = s.getProject(r),
            d = p.parse(r),
            h = d.pathname,
            q = /appservice$/.test(h),
            _ = /appservice-sdk\.js$/.test(h),
            m = /asdebug\.js$/.test(h),
            x = /ascheck\.js$/.test(h),
            C = /webnode\.js$/.test(h),
            w = /reporter-sdk\.js/.test(h),
            S = /app_service_engine\.js/.test(h),
            T = (/\.js$/.test(h), /\.js\.map$/.test(h)),
            F = /WAService\.js/.test(h),
            b = (v.appname.toLowerCase(), v.appid.toLowerCase(), v.hash),
            k = void 0;
        try { k = s.getProjectConfig(v) } catch (y) {
            var N = l.replace(/{{error}}/g, function() {
                return JSON.stringify(y)
            });
            return void g(500, {}, N)
        }
        var R = a.getProjectConfig(v);
        k.projectConfig = R, k.appserviceConfig = c;
        var $ = k.pages || [];
        q ? ! function() {
            var r = require("./tpl/appserviceTpl.js"),
                s = "http://" + b + ".appservice.open.weixin.qq.com/",
                t = [],
                i = [],
                p = [];
            o.getAllJSFileList(v, function(n, o) {
                for (var c = {}, a = 0, l = $.length; a < l; a++) {
                    var j = $[a] + ".js";
                    c[j] = !0, t.push("<script>__wxRoute = '" + $[a] + "';__wxRouteBegin = true</script>"), t.push('<script src="' + s + j + '"></script>')
                }
                for (var f = 0, d = o.length; f < d; f++) {
                    var h = o[f];
                    c[h] || ("app.js" === h ? p.push('<script src="' + s + h + '"></script>') : i.push('<script src="' + s + h + '"></script>'))
                }
                t = i.concat(p).concat(t), e ? (t.unshift('<script src="' + s + 'app_service_engine.js"></script>'), t.unshift('<script src="' + s + 'reporter-sdk.js"></script>'), t.unshift('<script src="' + s + 'appservice-sdk.js"></script>'), t.unshift('<script src="' + s + 'webnode.js"></script>')) : t.unshift('<script src="' + s + 'WAService.js"></script>'), t.unshift('<script src="' + s + 'asdebug.js"></script>'), k.appname = v.appname, k.appid = v.appid, k.apphash = v.hash, k.isTourist = v.isTourist, v.isTourist && (k.userInfo = u.getUserInfo()), t.unshift("<script>var __wxConfig = " + JSON.stringify(k) + "</script>"), r = r.replace("<script></script>", t.join("")), g(null, {}, r)
            })
        }() : F ? g(null, {}, n.getFile("WAService.js")) : w ? g(null, {}, n.getFile("reporter-sdk.js")) : S ? g(null, {}, n.getFile("app_service_engine.js")) : _ ? g(null, {}, n.getFile("appservice-sdk.js")) : m ? g(null, {}, f) : x ? g(null, {}, asCheck) : C ? g(null, {}, n.getFile("webnode.js")) : T ? ! function() {
            var e = i.join(v.projectpath, h);
            t.readFile(e, function(r, s) {
                return r ? void g(404, {}, "do not find " + e) : void g(200, {}, s)
            })
        }() : ! function() {
            var e = r.replace("http://" + b + ".appservice.open.weixin.qq.com/", "");
            o.getScripts({ project: v, fileName: e, needRequire: "app.js" === e || $.indexOf(e.replace(/\.js/, "")) !== -1 }, function(r, s) {
                if (r)
                    if (s) g(null, { "es6-error": encodeURIComponent(JSON.stringify(r.e)), "es6-errorfile": encodeURIComponent(JSON.stringify(r.sourceFileName)) }, s);
                    else {
                        var t = j.replace("{{error}}", r.toString().replace(/\\/g, "/")).replace("{{fileName}}", e);
                        g(null, {}, t)
                    }
                else g(null, { "Content-Type": "text/javascript; charset=UTF-8" }, s)
            })
        }()
    }, _exports.getResponse = function(e, s) { r.getResponse(e, s) }
}
var _exports = {};
init(), module.exports = _exports;
