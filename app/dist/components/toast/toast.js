"use strict";

function init() {
    var t, s = require("../../lib/react.js"),
        e = require("../../cssStr/cssStr.js"),
        i = require("../../stores/windowStores.js"),
        o = s.createClass({
            displayName: "Toast",
            getInitialState: function() {
                return { msg: "", show: !1, type: "" }
            },
            _tipsMsg: function(s) {
                var e = this;
                this.setState({ msg: s.msg, show: !0, type: s.type || "success" }), t = setTimeout(function() { e.setState({ show: !1 }) }, 2e3)
            },
            componentDidMount: function() { i.on("SHOW_TIPS_MSG", this._tipsMsg) },
            componentWillUnmount: function() { clearTimeout(t), i.removeListener("SHOW_TIPS_MSG", this._tipsMsg) },
            render: function() {
                var t = this.state.show ? e.displayBlock : e.displayNone;
                return s.createElement("div", { className: "toast toast-" + this.state.type, style: t }, s.createElement("i", { className: "icon-info" }), this.state.msg)
            }
        });
    _exports = o
}
var _exports;
init(), module.exports = _exports;
