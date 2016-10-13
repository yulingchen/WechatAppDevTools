"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = require("../simulator/controller.js"),
        r = require("../debugger/debugger.js"),
        s = require("../../cssStr/cssStr.js"),
        o = require("../../stores/projectStores.js"),
        i = e.createClass({
            displayName: "Develop",
            getInitialState: function() {
                return { project: !!this.props.project }
            },
            _restart: function() {
                var e = this;
                this.setState({ project: !1 }, function() { e.setState({ project: !0 }) })
            },
            componentDidMount: function() { o.on("RESTART_PROJECT", this._restart) },
            componentWillUnmount: function() { o.removeListener("RESTART_PROJECT", this._restart) },
            render: function() {
                var o = this.props.show,
                    i = "debug" === o ? {} : Object.assign({}, s.webviewDisplayNone),
                    p = void 0;
                return this.props.project ? this.state.project ? (p = e.createElement(t, { project: this.props.project }), i.marginTop = -52) : p = "" : p = e.createElement(t, { project: this.props.project }), e.createElement("div", { className: "develop", style: i }, p, e.createElement(r, { project: this.props.project, propshow: o }))
            }
        });
    _exports = i
}
var _exports;
init(), module.exports = _exports;
