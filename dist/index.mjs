var u=class{isJust(){return!1}isNothing(){return!0}map(e){return t()}chain(e){return t()}filter(e){return t()}orDefault(e){return e}orDefaultLazy(e){return e()}getSafe(){return{success:!1}}reduce(e,r){return r}ifJust(e){return this}ifNothing(e){return e(),this}};function t(){return new u}var i=class{constructor(e){this._value=e}isJust(){return!0}get value(){return this._value}isNothing(){return!1}map(e){let r=e(this._value);return this.isEmpty(r)?t():n(r)}isEmpty(e){return e==null}filter(e){return e(this.value)?n(this.value):t()}chain(e){let r=e(this._value);return this.isMonadValueEmpty(r)?t():r}isMonadValueEmpty(e){let r=e.getSafe();return r.success&&this.isEmpty(r.data)}orDefault(e){return this.value}orDefaultLazy(e){return this.value}getSafe(){return{success:!0,data:this.value}}reduce(e,r){return e(r,this._value)}ifJust(e){return e(this.value),this}ifNothing(e){return this}};function n(a){return new i(a)}var p=class{constructor(){}static of(e){return n(e)}static empty(){return t()}};export{p as Maybe};
