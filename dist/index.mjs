var u=class{isJust(){return !1}isNothing(){return !0}map(e){return r()}chain(e){return r()}filter(e){return r()}orDefault(e){return e}orDefaultLazy(e){return e()}getSafe(){return {success:!1}}reduce(e,t){return t}ifJust(e){return this}ifNothing(e){return e(),this}};function r(){return new u}var i=class{constructor(e){this._value=e;}isJust(){return !0}get value(){return this._value}isNothing(){return !1}map(e){let t=e(this._value);return this.isEmpty(t)?r():n(t)}isEmpty(e){return e==null}filter(e){return e(this.value)?n(this.value):r()}chain(e){let t=e(this._value);return this.isMonadValueEmpty(t)?r():t}isMonadValueEmpty(e){let t=e.getSafe();return t.success&&this.isEmpty(t.data)}orDefault(e){return this._value}orDefaultLazy(e){return this._value}getSafe(){return {success:!0,data:this.value}}reduce(e,t){return e(t,this._value)}ifJust(e){return e(this._value),this}ifNothing(e){return this}};function n(a){return new i(a)}var p=class{static of(e){return n(e)}static empty(){return r()}};

export { p as Maybe };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map