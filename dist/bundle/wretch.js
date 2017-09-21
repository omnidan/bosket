!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):t.wretch=r()}(this,function(){"use strict";const t=Object.assign||function(t){for(var r,n=1;n<arguments.length;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t};var r=function(n,o,e){if(void 0===e&&(e=!1),!n||!o||"object"!=typeof n||"object"!=typeof o)return n;var i=t({},n,o);for(var u in o)o.hasOwnProperty(u)&&(o[u]instanceof Array&&n[u]instanceof Array?i[u]=e?n[u].concat(o[u]):i[u]=o[u]:"object"==typeof o[u]&&"object"==typeof n[u]&&(i[u]=r(n[u],o[u],e)));return i},n={},o=null,e=function(){function e(t,r){void 0===r&&(r={}),this._url=t,this._options=r}return e.prototype.defaults=function(t){return n=t,this},e.prototype.mixdefaults=function(t){return n=r(n,t),this},e.prototype.errorType=function(t){return o=t,this},e.prototype.url=function(t){return new e(t,this._options)},e.prototype.baseUrl=function(t){return function(r,n){return void 0===r&&(r=""),void 0===n&&(n={}),new e(t+r,n)}},e.prototype.options=function(t){return new e(this._url,t)},e.prototype.query=function(t){return new e(i(this._url,t),this._options)},e.prototype.accept=function(t){return new e(this._url,r(this._options,{headers:{Accept:t}}))},e.prototype.get=function(t){return void 0===t&&(t={}),u(this._url)(r(t,this._options))},e.prototype.delete=function(n){return void 0===n&&(n={}),u(this._url)(t({},r(n,this._options),{method:"DELETE"}))},e.prototype.put=function(n){return void 0===n&&(n={}),u(this._url)(t({},r(n,this._options),{method:"PUT"}))},e.prototype.post=function(n){return void 0===n&&(n={}),u(this._url)(t({},r(n,this._options),{method:"POST"}))},e.prototype.patch=function(n){return void 0===n&&(n={}),u(this._url)(t({},r(n,this._options),{method:"PATCH"}))},e.prototype.json=function(r){return new e(this._url,t({},this._options,{headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}))},e.prototype.formData=function(r){var n=new FormData;for(var o in r)if(r[o]instanceof Array)for(var i=0,u=r[o];i<u.length;i++){var f=u[i];n.append(o+"[]",f)}else n.append(o,r[o]);return new e(this._url,t({},this._options,{body:n}))},e}(),i=function(t,r){var n=new URLSearchParams,o=t.indexOf("?");for(var e in r)if(r[e]instanceof Array)for(var i=0,u=r[e];i<u.length;i++){var f=u[i];n.append(e,f)}else n.append(e,r[e]);return~o?t.substring(0,o)+"?"+n.toString():t+"?"+n.toString()},u=function(t){return function(e){void 0===e&&(e={});var i=fetch(t,r(n,e)).then(function(t){return t.ok?t:t[o||"text"]().then(function(r){var n=new Error(r);throw n[o]=r,n.status=t.status,n.response=t,n})}),u=[],f=function(t){return u.reduce(function(t,r){return t.catch(r)},t)},s=function(t){return function(r){return f(t?i.then(function(r){return r&&r[t]()}).then(function(t){return t&&r&&r(t)||t}):i.then(function(t){return t&&r&&r(t)||t}))}},p={res:s(null),json:s("json"),blob:s("blob"),formData:s("formData"),arrayBuffer:s("arrayBuffer"),text:s("text"),error:function(t,r){return u.push(function(n){if(n.status!==t)throw n;r(n)}),p},badRequest:function(t){return p.error(400,t)},unauthorized:function(t){return p.error(401,t)},forbidden:function(t){return p.error(403,t)},notFound:function(t){return p.error(404,t)},timeout:function(t){return p.error(408,t)},internalError:function(t){return p.error(500,t)}};return p}};"undefined"==typeof self&&(global.URLSearchParams=require("url").URLSearchParams);return function(t,r){return void 0===t&&(t=""),void 0===r&&(r={}),new e(t,r)}});
//# sourceMappingURL=wretch.js.map