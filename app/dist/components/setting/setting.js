"use strict";

function init() {
    var t = require("../../lib/react.js"),
        e = (require("../../cssStr/cssStr.js"), require("../../config/config.js"), require("../../stores/windowStores.js")),
        s = require("../../actions/windowActions.js"),
        r = (require("../../actions/webviewActions.js"), require("../../common/request/request.js"), 4),
        a = t.createClass({
            displayName: "Setting",
            getInitialState: function() {
                var t = e.getSetting();
                return t ? t : { proxyType: "SYSTEM", currentProxyType: "SYSTEM", proxyHost: "", currentProxyHost: "", proxyPort: "", currentProxyPort: "" }
            },
            changeProxy: function(t) {
                var e = t.currentTarget,
                    s = e.dataset,
                    r = s.type,
                    a = void 0;
                a = "USER" !== r ? r : "PROXY " + this.state.proxyHost + ":" + this.state.proxyPort, this.setState({ proxyType: a })
            },
            changeProxyHost: function(t) {
                var e = t.target.value,
                    s = this.state.proxyPort || "80",
                    r = "PROXY " + e + ":" + s;
                this.setState({ proxyType: r, proxyHost: e })
            },
            changeProxyPort: function(t) {
                var e = t.target.value,
                    s = this.state.proxyHost,
                    r = "PROXY " + s + ":" + e;
                this.setState({ proxyType: r, proxyPort: e })
            },
            cancel: function() { this.setState({ version: this.state.currentVersion, proxyType: this.state.currentProxyType, proxyPort: this.state.currentProxyPort, proxyHost: this.state.currentProxyHost }), this.props.showSetting() },
            save: function() {
                var t = this,
                    e = function() { t.setState({ currentProxyType: t.state.proxyType, currentVersion: t.state.version, currentDevice: t.state.device }, function() { s.saveSetting(Object.assign({}, t.state)), t.props.showSetting() }) };
                this.state.currentProxyType !== this.state.proxyType ? s.updataProxySetting(this.state.proxyType, function() { setTimeout(function() { e() }) }) : e()
            },
            componentDidMount: function() {},
            render: function() {
                var e = this,
                    s = this.props.show ? "setting-show" : "setting",
                    a = ("iOS" === this.state.os ? "setting-form-select-item setting-form-select-item-selected" : "setting-form-select-item", "Android" === this.state.os ? "setting-form-select-item setting-form-select-item-selected" : "setting-form-select-item", Object.assign([], this.state.versionList)),
                    o = a.findIndex(function(t) {
                        return t === e.state.version
                    });
                o >= r && (a.splice(o, 1), a.unshift(this.state.version));
                var i = "SYSTEM" !== this.state.proxyType && "DIRECT" !== this.state.proxyType;
                return t.createElement("div", { className: s }, t.createElement("div", { className: "setting-hd" }, t.createElement("h3", { className: "setting-hd-title" }, "设置")), t.createElement("div", { className: "setting-bd" }, t.createElement("div", { className: "setting-form-title" }, "设置代理"), t.createElement("div", { className: "setting-form-bd" }, t.createElement("label", { htmlFor: "noProxy", className: "setting-form-option" }, t.createElement("input", { onChange: this.changeProxy, checked: "DIRECT" === this.state.proxyType, "data-type": "DIRECT", type: "radio", name: "proxy", id: "noProxy" }), t.createElement("i", { className: "setting-form-radio" }), "不使用任何代理，勾选后直连网络"), t.createElement("label", { htmlFor: "systemProxy", className: "setting-form-option" }, t.createElement("input", { onChange: this.changeProxy, checked: "SYSTEM" === this.state.proxyType, "data-type": "SYSTEM", type: "radio", name: "proxy", id: "systemProxy" }), t.createElement("i", { className: "setting-form-radio" }), "使用系统代理"), t.createElement("label", { htmlFor: "manuallyProxy", className: "setting-form-option" }, t.createElement("input", { onChange: this.changeProxy, checked: i, "data-type": "USER", type: "radio", name: "proxy", id: "manuallyProxy" }), t.createElement("i", { className: "setting-form-radio" }), "手动设置代理"), t.createElement("div", { className: "setting-form-proxy-area" }, t.createElement("input", { disabled: !i, onChange: this.changeProxyHost, value: this.state.proxyHost, type: "text", className: "setting-form-proxy-address", placeholder: "请填写代理地址" }), t.createElement("input", { disabled: !i, onChange: this.changeProxyPort, value: this.state.proxyPort, type: "number", className: "setting-form-proxy-port", placeholder: "请填写端口" })))), t.createElement("div", { className: "setting-ft" }, t.createElement("a", { onClick: this.cancel, href: "javascript:;", className: "setting-button-default" }, "取消"), t.createElement("a", { onClick: this.save, href: "javascript:;", className: "setting-button-primary" }, "保存")))
            }
        });
    _exports = a
}
var _exports;
init(), module.exports = _exports;
