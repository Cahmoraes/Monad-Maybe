var u=class{isNothing(){return!0}map(e){return a()}chain(e){return a()}filter(e){return a()}orDefault(e){return e}orDefaultLazy(e){return e()}getSafe(){return{success:!1}}reduce(e,r){return r}};function a(){return new u}var l=class{constructor(e){this._value=e}get value(){return this._value}isNothing(){return!1}map(e){let r=e(this._value);return this.isEmpty(r)?a():p(r)}isEmpty(e){return e==null}filter(e){return e(this.value)?p(this.value):a()}chain(e){let r=e(this._value);return this.isMonadValueIsEmpty(r)?a():r}isMonadValueIsEmpty(e){let r=e.getSafe();return r.success&&this.isEmpty(r.data)}orDefault(e){return this._value}orDefaultLazy(e){return this._value}getSafe(){return{success:!0,data:this.value}}reduce(e,r){return e(r,this._value)}};function p(t){return new l(t)}var n=class{static of(e){return p(e)}static empty(){return a()}};export{n as Maybe};
//# sourceMappingURL=index.mjs.map