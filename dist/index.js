"use strict";var r=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var T=(t,e)=>{for(var i in e)r(t,i,{get:e[i],enumerable:!0})},y=(t,e,i,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of p(e))!u.call(t,n)&&n!==i&&r(t,n,{get:()=>e[n],enumerable:!(l=s(e,n))||l.enumerable});return t};var o=t=>y(r({},"__esModule",{value:!0}),t);var c={};T(c,{Maybe:()=>a});module.exports=o(c);var a=class{constructor(e){this.value=e}static of(e){return new a(e)}static empty(){return a.of(null)}map(e){return this.isNothing()?a.of(null):a.of(e(this.value))}isNothing(){return this.value===null||this.value===void 0}chain(e){let i=this.map(e).join();return i===null?a.of(null):i}join(){return this.value}getOrElse(e){return this.isNothing()?e:this.value}getSafe(){return this.isNothing()?{success:!1}:{success:!0,data:this.value}}};0&&(module.exports={Maybe});
//# sourceMappingURL=index.js.map