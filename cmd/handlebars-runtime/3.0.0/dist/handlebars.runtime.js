define("handlebars-runtime/3.0.0/dist/handlebars.runtime",[],function(e,t,r){!function(e,n){"function"==typeof define&&define.amd?define([],n):"object"==typeof t?r.exports=n():e.Handlebars=n()}(this,function(){var e=function(){"use strict";function e(e){return l[e]}function t(e){for(var t=1;t<arguments.length;t++)for(var r in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],r)&&(e[r]=arguments[t][r]);return e}function r(e,t){for(var r=0,n=e.length;n>r;r++)if(e[r]===t)return r;return-1}function n(t){return t&&t.toHTML?t.toHTML():null==t?"":t?(t=""+t,c.test(t)?t.replace(u,e):t):t+""}function a(e){return e||0===e?h(e)&&0===e.length?!0:!1:!0}function i(e,t){return e.path=t,e}function o(e,t){return(e?e+".":"")+t}var s={},l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},u=/[&<>"'`]/g,c=/[&<>"'`]/;s.extend=t;var p=Object.prototype.toString;s.toString=p;var f=function(e){return"function"==typeof e};f(/x/)&&(f=function(e){return"function"==typeof e&&"[object Function]"===p.call(e)});var f;s.isFunction=f;var h=Array.isArray||function(e){return e&&"object"==typeof e?"[object Array]"===p.call(e):!1};return s.isArray=h,s.indexOf=r,s.escapeExpression=n,s.isEmpty=a,s.blockParams=i,s.appendContextPath=o,s}(),t=function(){"use strict";function e(e,t){var n,a,i=t&&t.loc;i&&(n=i.start.line,a=i.start.column,e+=" - "+n+":"+a);for(var o=Error.prototype.constructor.call(this,e),s=0;s<r.length;s++)this[r[s]]=o[r[s]];i&&(this.lineNumber=n,this.column=a)}var t,r=["description","fileName","lineNumber","message","name","number","stack"];return e.prototype=new Error,t=e}(),r=function(e,t){"use strict";function r(e,t){this.helpers=e||{},this.partials=t||{},n(this)}function n(e){e.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new o("Missing helper: '"+arguments[arguments.length-1].name+"'")}),e.registerHelper("blockHelperMissing",function(t,r){var n=r.inverse,a=r.fn;if(t===!0)return a(this);if(t===!1||null==t)return n(this);if(c(t))return t.length>0?(r.ids&&(r.ids=[r.name]),e.helpers.each(t,r)):n(this);if(r.data&&r.ids){var o=v(r.data);o.contextPath=i.appendContextPath(r.data.contextPath,r.name),r={data:o}}return a(t,r)}),e.registerHelper("each",function(e,t){function r(t,r,o){n&&(n.key=t,n.index=r,n.first=0===r,n.last=!!o,a&&(n.contextPath=a+t)),f+=s(e[t],{data:n,blockParams:i.blockParams([e[t],t],[a+t,null])})}if(!t)throw new o("Must pass iterator to #each");var n,a,s=t.fn,l=t.inverse,u=0,f="";if(t.data&&t.ids&&(a=i.appendContextPath(t.data.contextPath,t.ids[0])+"."),p(e)&&(e=e.call(this)),t.data&&(n=v(t.data)),e&&"object"==typeof e)if(c(e))for(var h=e.length;h>u;u++)r(u,u,u===e.length-1);else{var d;for(var m in e)e.hasOwnProperty(m)&&(d&&r(d,u-1),d=m,u++);d&&r(d,u-1,!0)}return 0===u&&(f=l(this)),f}),e.registerHelper("if",function(e,t){return p(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||i.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,r){return e.helpers["if"].call(this,t,{fn:r.inverse,inverse:r.fn,hash:r.hash})}),e.registerHelper("with",function(e,t){p(e)&&(e=e.call(this));var r=t.fn;if(i.isEmpty(e))return t.inverse(this);if(t.data&&t.ids){var n=v(t.data);n.contextPath=i.appendContextPath(t.data.contextPath,t.ids[0]),t={data:n}}return r(e,t)}),e.registerHelper("log",function(t,r){var n=r.data&&null!=r.data.level?parseInt(r.data.level,10):1;e.log(n,t)}),e.registerHelper("lookup",function(e,t){return e&&e[t]})}var a={},i=e,o=t,s="3.0.0";a.VERSION=s;var l=6;a.COMPILER_REVISION=l;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};a.REVISION_CHANGES=u;var c=i.isArray,p=i.isFunction,f=i.toString,h="[object Object]";a.HandlebarsEnvironment=r,r.prototype={constructor:r,logger:d,log:m,registerHelper:function(e,t){if(f.call(e)===h){if(t)throw new o("Arg not supported with multiple helpers");i.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(f.call(e)===h)i.extend(this.partials,e);else{if("undefined"==typeof t)throw new o("Attempting to register a partial as undefined");this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]}};var d={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:1,log:function(e,t){if("undefined"!=typeof console&&d.level<=e){var r=d.methodMap[e];(console[r]||console.log).call(console,t)}}};a.logger=d;var m=d.log;a.log=m;var v=function(e){var t=i.extend({},e);return t._parent=e,t};return a.createFrame=v,a}(e,t),n=function(){"use strict";function e(e){this.string=e}var t;return e.prototype.toString=e.prototype.toHTML=function(){return""+this.string},t=e}(),a=function(e,t,r){"use strict";function n(e){var t=e&&e[0]||1,r=h;if(t!==r){if(r>t){var n=d[r],a=d[t];throw new f("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+a+").")}throw new f("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function a(e,t){if(!t)throw new f("No environment passed to template");if(!e||!e.main)throw new f("Unknown template object: "+typeof e);t.VM.checkRevision(e.compiler);var r=function(r,n,a){a.hash&&(n=p.extend({},n,a.hash)),r=t.VM.resolvePartial.call(this,r,n,a);var i=t.VM.invokePartial.call(this,r,n,a);if(null==i&&t.compile&&(a.partials[a.name]=t.compile(r,e.compilerOptions,t),i=a.partials[a.name](n,a)),null!=i){if(a.indent){for(var o=i.split("\n"),s=0,l=o.length;l>s&&(o[s]||s+1!==l);s++)o[s]=a.indent+o[s];i=o.join("\n")}return i}throw new f("The partial "+a.name+" could not be compiled when running in runtime-only mode")},n={strict:function(e,t){if(!(t in e))throw new f('"'+t+'" not defined in '+e);return e[t]},lookup:function(e,t){for(var r=e.length,n=0;r>n;n++)if(e[n]&&null!=e[n][t])return e[n][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:p.escapeExpression,invokePartial:r,fn:function(t){return e[t]},programs:[],program:function(e,t,r,n,a){var o=this.programs[e],s=this.fn(e);return t||a||n||r?o=i(this,e,s,t,r,n,a):o||(o=this.programs[e]=i(this,e,s)),o},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var r=e||t;return e&&t&&e!==t&&(r=p.extend({},t,e)),r},noop:t.VM.noop,compilerInfo:e.compiler},a=function(t,r){r=r||{};var i=r.data;a._setup(r),!r.partial&&e.useData&&(i=u(t,i));var o,s=e.useBlockParams?[]:void 0;return e.useDepths&&(o=r.depths?[t].concat(r.depths):[t]),e.main.call(n,t,n.helpers,n.partials,i,s,o)};return a.isTop=!0,a._setup=function(r){r.partial?(n.helpers=r.helpers,n.partials=r.partials):(n.helpers=n.merge(r.helpers,t.helpers),e.usePartial&&(n.partials=n.merge(r.partials,t.partials)))},a._child=function(t,r,a,o){if(e.useBlockParams&&!a)throw new f("must pass block params");if(e.useDepths&&!o)throw new f("must pass parent depths");return i(n,t,e[t],r,0,a,o)},a}function i(e,t,r,n,a,i,o){var s=function(t,a){return a=a||{},r.call(e,t,e.helpers,e.partials,a.data||n,i&&[a.blockParams].concat(i),o&&[t].concat(o))};return s.program=t,s.depth=o?o.length:0,s.blockParams=a||0,s}function o(e,t,r){return e?e.call||r.name||(r.name=e,e=r.partials[e]):e=r.partials[r.name],e}function s(e,t,r){if(r.partial=!0,void 0===e)throw new f("The partial "+r.name+" could not be found");return e instanceof Function?e(t,r):void 0}function l(){return""}function u(e,t){return t&&"root"in t||(t=t?m(t):{},t.root=e),t}var c={},p=e,f=t,h=r.COMPILER_REVISION,d=r.REVISION_CHANGES,m=r.createFrame;return c.checkRevision=n,c.template=a,c.program=i,c.resolvePartial=o,c.invokePartial=s,c.noop=l,c}(e,t,r),i=function(e,t,r,n,a){"use strict";var i,o=e,s=t,l=r,u=n,c=a,p=function(){var e=new o.HandlebarsEnvironment;return u.extend(e,o),e.SafeString=s,e.Exception=l,e.Utils=u,e.escapeExpression=u.escapeExpression,e.VM=c,e.template=function(t){return c.template(t,e)},e},f=p();f.create=p;var h="undefined"!=typeof global?global:window,d=h.Handlebars;return f.noConflict=function(){h.Handlebars===f&&(h.Handlebars=d)},f["default"]=f,i=f}(r,n,t,e,a);return i})});