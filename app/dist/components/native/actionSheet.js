"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = (require("../../lib/react-dom.js"), require("../../stores/webviewStores.js")),
        i = e.createClass({
            displayName: "ActionSheet",
            getInitialState: function() {
                return { itemList: [], itemColor: "#000000", cancelColor: "#000000", cancelText: "取消", hidden: !0 }
            },
            componentDidMount: function() { t.on("SEND_AS_SDK", this.handleAssdkCommand) },
            componentWillUnmount: function() { t.removeListener("SEND_AS_SDK", this.handleAssdkCommand) },
            handleAssdkCommand: function(e, t, i) {
                var n = t.args;
                "showActionSheet" === e && (this.setState({ itemList: n.itemList, itemColor: n.itemColor, cancelText: n.cancelText, cancelColor: n.cancelColor, hidden: !1 }), this.callback = i)
            },
            handleCancelClick: function() { this.callback({ errMsg: "showActionSheet:cancel" }), this.hide() },
            handleItemClick: function(e) { this.callback({ errMsg: "showActionSheet:ok", tapIndex: e }), this.hide() },
            hide: function() { this.setState({ hidden: !0 }) },
            render: function() {
                var t = this,
                    i = [];
                return this.state.itemList.map(function(n, a) { i.push(e.createElement("div", { className: "wx-action-sheet-item", onClick: t.handleItemClick.bind(t, a), style: { color: t.state.itemColor } }, n)) }), e.createElement("div", { style: { display: this.state.hidden ? "none" : "block" } }, e.createElement("div", { className: "wx-action-sheet-mask", onClick: this.handleCancelClick }), e.createElement("div", { className: "wx-action-sheet wx-action-sheet-show" }, e.createElement("div", { className: "wx-action-sheet-menu" }, i, e.createElement("div", { className: "wx-action-sheet-item-cancel" }, e.createElement("div", { className: "wx-action-sheet-middle" }), e.createElement("div", { className: "wx-action-sheet-cancel", onClick: this.handleCancelClick, style: { color: this.state.cancelColor } }, this.state.cancelText)))))
            }
        });
    _exports = i
}
var _exports;
init(), module.exports = _exports;
