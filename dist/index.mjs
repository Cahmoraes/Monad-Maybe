var a=class{constructor(e){this.value=e}static of(e){return new a(e)}map(e){return this.isEmpty()?a.of(null):a.of(e(this.value))}chain(e){let t=this.map(e).join();return t===null?a.of(null):t}getOrElse(e){return this.isEmpty()?e:this.value}join(){return this.value}isEmpty(){return this.value===null||this.value===void 0}};export{a as Maybe};
//# sourceMappingURL=index.mjs.map