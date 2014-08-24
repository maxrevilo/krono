define("krono/adapters/application",["ember-data","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.FixtureAdapter.extend({})}),define("krono/app",["ember","ember/resolver","ember/load-initializers","exports"],function(e,t,n,i){"use strict";var r=e["default"],o=t["default"],s=n["default"];r.MODEL_FACTORY_INJECTIONS=!0;var a=r.Application.extend({modulePrefix:"krono",Resolver:o});s(a,"krono"),i["default"]=a}),define("krono/components/kr-btn-record",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Component.extend({tagName:"a",classNames:["btn-record"],classNameBindings:["isTouching:btn-record-touch"],isTouching:!1,touchStart:function(){this.sendAction("start"),this.set("isTouching",!0)},touchEnd:function(){this.sendAction("stop"),this.set("isTouching",!1)}})}),define("krono/components/x-background",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Component.extend({tagName:"x-background",setupImage:function(){var e=this.get("imgSource");e&&this.$().css("background-image","url("+e+")")}.observes("imgSource").on("didInsertElement")})}),define("krono/controllers/evaluate",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Controller.extend({products:[],updateProducts:function(){var e=this;this.store.find("product").then(function(t){e.set("products",t)})}.on("init"),annotations:["No tenemos Coca Cola, tenemos Pepsi.","No tenemos Leche Entera, tenemos Leche deslactosada"]})}),define("krono/controllers/order",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Controller.extend({isRecording:!1,fileSrc:function(){var e="tmprecording.amr";return console.log("**************** **************** ****************"),console.log(e),e}.property(),actions:{record:function(){this.get("isRecording")&&this.send("stop");var e=this.get("fileSrc"),t=this,n=new Media(e,function(){console.log("recordAudio():Audio Success"),t.set("isRecording",!1)},function(e){console.log("recordAudio():Audio Error: "+e.code),t.set("isRecording",!1)});n.startRecord(),this.set("mediaRec",n),this.set("isRecording",!0)},stop:function(){var e=this.get("mediaRec");e&&e.stopRecord()},play:function(){var e=this.get("fileSrc"),t=new Media(e,function(){console.log("playAudio():Audio Success")},function(e){console.log("playAudio():Audio Error: "+e)});t.play()},upload:function(){var e=function(e){console.log("Code = "+e.responseCode),console.log("Response = "+e.response),console.log("Sent = "+e.bytesSent)},t=function(e){alert("An error has occurred: Code = "+e.code),console.log("upload error source "+e.source),console.log("upload error target "+e.target)},n=new FileUploadOptions;n.fileKey="file",n.fileName="tmprecording.amr",n.mimeType="audio/AMR",n.chunkedMode=!1;var i={};i.type="AUDIO",n.params=i,window.resolveLocalFileSystemURL("file:///storage/emulated/0/"+this.get("fileSrc"),function(i){var r=i.toURL();console.log("real URL",r);var o=new FileTransfer;o.upload(r,encodeURI("https://krono-market.herokuapp.com/orders/"),e,t,n)})}}})}),define("krono/helpers/liquid-bind",["exports"],function(e){"use strict";e["default"]=function(){var e=arguments[arguments.length-1],t=e.data.view.container,n=t.lookupFactory("helper:liquid-with");return e.fn=t.lookup("template:liquid-with-self"),n.apply(this,arguments)}}),define("krono/helpers/liquid-box",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=function(){n.assert("liquid-box is deprecated, see CHANGELOG.md",!1)}}),define("krono/helpers/liquid-if",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=function(e,t){var i=t.data.view.container.lookupFactory("view:liquid-if");return t.hash.firstTemplate=t.fn,delete t.fn,t.hash.secondTemplate=t.inverse,delete t.inverse,t.hash.showFirstBinding=e,n.Handlebars.helpers.view.call(this,i,t)}}),define("krono/helpers/liquid-measure",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=function(){n.assert("liquid-measure is deprecated, see CHANGELOG.md",!1)}}),define("krono/helpers/liquid-outlet",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=function(e,t){return e&&e.data&&e.data.isRenderData&&(t=e,e="main"),t.hash.view="liquid-outlet",n.Handlebars.helpers.outlet.call(this,e,t)}}),define("krono/helpers/liquid-with",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=function(){var e=arguments[0],t=arguments[arguments.length-1],i=t.data.view.container.lookupFactory("view:liquid-with"),r={data:t.data,hash:{},hashTypes:{}};return i=i.extend({originalArgs:Array.prototype.slice.apply(arguments,[0,-1]),originalHash:t.hash,originalHashTypes:t.hashTypes,innerTemplate:t.fn}),r.hash.boundContextBinding=e,["class","classNames","classNameBindings","use"].forEach(function(e){t.hash[e]&&(r.hash[e]=t.hash[e],r.hashTypes[e]=t.hashTypes[e])}),n.Handlebars.helpers.view.call(this,i,r)}}),define("krono/helpers/with-apply",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=function(e){var t=e.data.view,i=t.get("liquidWithParent"),r=i.get("originalArgs").slice();return r[0]="lwith-view.boundContext",e=n.copy(e),e.data.keywords["lwith-view"]=t,e.fn=i.get("innerTemplate"),e.hash=i.get("originalHash"),e.hashTypes=i.get("originalHashTypes"),r.push(e),n.Handlebars.helpers["with"].apply(this,r)}}),define("krono/initializers/liquid-fire",["vendor/liquid-fire","ember","exports"],function(e,t,n){"use strict";var i=e.initialize,r=t["default"];n["default"]={name:"liquid-fire",initialize:function(e){i(e,e.lookupFactory("transitions:main")),r.testing&&r.Test.registerWaiter(function(){return 0===e.lookup("transitions:map").runningTransitions()})}}}),define("vendor/liquid-fire",["vendor/liquid-fire/transitions","vendor/liquid-fire/animate","vendor/liquid-fire/promise","vendor/liquid-fire/initialize","vendor/liquid-fire/mutation-observer","vendor/liquid-fire/curry","exports"],function(e,t,n,i,r,o,s){"use strict";var a=e["default"],u=t.animate,c=t.stop,l=t.isAnimating,d=t.timeSpent,f=t.timeRemaining,h=t.finish,p=n["default"],m=i["default"],v=r["default"],g=o["default"];s.Transitions=a,s.animate=u,s.stop=c,s.isAnimating=l,s.timeSpent=d,s.timeRemaining=f,s.finish=h,s.Promise=p,s.initialize=m,s.MutationObserver=v,s.curryTransition=g}),define("vendor/liquid-fire/transitions",["vendor/liquid-fire/transition","vendor/liquid-fire/dsl","exports"],function(e,t,n){"use strict";function i(){this._map={},this.map(function(){this.setDefault({duration:250})})}var r=e["default"],o=t["default"];i.prototype={activeCount:0,runningTransitions:function(){return this.activeCount},lookup:function(e){var t=this.container.lookupFactory("transition:"+e);if(!t)throw new Error("unknown transition name: "+e);return t},transitionFor:function(e,t,n,i){var o,s;if(i&&t)o=this.lookup(i);else{var a=this.match(e,t,n);a&&(s=a.args,o="function"==typeof a.method?a.method:this.lookup(a.method))}return new r(e,t,n,o,s,this)},map:function(e){return e&&e.apply(new o(this)),this},register:function(e,t,n,i){this._register(this._map,[e.from,e.to,n,t.from,t.to],i)},_register:function(e,t,n){for(var i=t[0],r=0;r<i.length;r++){var o=i[r];if("function"==typeof o)if(e.__functions||(e.__functions=[]),1===t.length)e.__functions.push([o,n]);else{var s={};this._register(s,t.slice(1),n),e.__functions.push([o,s])}else 1===t.length?e[o]=n:(e[o]||(e[o]={}),this._register(e[o],t.slice(1),n))}},_viewProperties:function(e,t){return e&&t&&(e=e.get(t)),e?{route:e.get("renderedName"),context:e.get("liquidContext")}:{}},_ancestorsRenderedName:function(e){for(;e&&!e.get("renderedName");)e=e.get("_parentView");return e?e.get("renderedName"):void 0},match:function(e,t,n){var i={leaving:this._viewProperties(t,"currentView"),entering:this._viewProperties(n),parentView:e};return t&&!i.leaving.route&&(i.leaving.route=this._ancestorsRenderedName(e)),n&&!i.entering.route&&(i.entering.route=i.leaving.route||this._ancestorsRenderedName(e)),this._match(i,this._map,[i.leaving.route,i.entering.route,e,i.leaving.context,i.entering.context])},_match:function(e,t,n){var i,r,s,a=0,u=n[0],c=n.slice(1),l=[u||o.EMPTY].concat(t.__functions).concat(o.ANY);for(a=0;a<l.length;a++)if(i=l[a],i&&(r="function"==typeof i[0]?i[0].apply(u,this._predicateArgs(e,n.length))?i[1]:null:t[i])){if(0===c.length)return r;if(s=this._match(e,r,c))return s}},_predicateArgs:function(e,t){var n=5-t;switch(n){case 0:return[e.entering.route];case 1:return[e.leaving.route];case 2:return[];case 3:return[e.entering.context];case 4:return[e.leaving.context]}}},i.map=function(e){var t=new i;return t.map(e),t},n["default"]=i}),define("vendor/liquid-fire/transition",["vendor/liquid-fire/promise","exports"],function(e,t){"use strict";function n(e,t,n,i,r,o){this.parentView=e,this.oldView=t,this.newContent=n,this.animation=i,this.animationArgs=r,this.transitionMap=o}function i(e){var t;e&&(t=e.$())&&t.show()}var r=e["default"];n.prototype={run:function(){if(!this.animation)return this.maybeDestroyOldView(),this._insertNewView().then(i);var e=this;return e.transitionMap.activeCount+=1,this._invokeAnimation().then(function(){e.maybeDestroyOldView()},function(t){return e.cleanupAfterError().then(function(){throw t})}).finally(function(){e.transitionMap.activeCount-=1})},_insertNewView:function(){return this.inserted?this.inserted:this.inserted=this.parentView._pushNewView(this.newContent)},_goAbsolute:function(){var e;this.parentView.lockSize(),this.oldView&&(e=this.oldView.$())&&e.css("position","absolute")},_goStatic:function(){var e;this.interruptedLate||(this.newView&&(e=this.newView.$())&&this.newView.$().css("position",""),this.parentView.unlockSize())},_invokeAnimation:function(){this._goAbsolute();var e=this,t=this.animation,n=function(){return e._insertNewView().then(function(t){return t?(t.$().css("position","absolute"),e.parentView.adaptSize(t.$().outerWidth(!0),t.$().outerHeight(!0)),e.newView=t):void 0})},i=[this.oldView,n].concat(this.animationArgs);return new r(function(n,r){t.apply(e,i).then(n,r)}).then(function(){e._goStatic()})},maybeDestroyOldView:function(){!this.interruptedEarly&&this.oldView&&this.oldView.destroy()},cleanupAfterError:function(){return this.maybeDestroyOldView(),this._insertNewView().then(i)},interrupt:function(){this.inserted?this.interruptedLate=!0:(this.inserted=r.cast(null),this.interruptedEarly=!0)},lookup:function(e){return this.transitionMap.lookup(e)}},t["default"]=n}),define("vendor/liquid-fire/promise",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.RSVP.Promise}),define("vendor/liquid-fire/dsl",["vendor/liquid-fire/animate","exports"],function(e,t){"use strict";function n(e){this.map=e}function i(e){if(!e)return n.EMPTY;if("function"==typeof e)return e;if(e.instanceOf)return function(){return this instanceof e.instanceOf||this&&this.get&&this.get("model")&&this.get("model")instanceof e.instanceOf};if("boolean"==typeof e)return function(){return e?!!this:!this};throw new Error("unknown context matcher: "+JSON.stringify(e))}var r=e.setDefaults;n.prototype={setDefault:function(e){r(e)},define:function(){throw new Error("calling 'define' from within the transition map is deprecated")},_withEmpty:function(e){return e||n.EMPTY},_combineMatchers:function(e){return[e.reduce(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw new Error("cannot combine empty model matcher with any other constraints");return function(){return e.apply(this,arguments)&&t.apply(this,arguments)}})]},transition:function(){for(var e,t,i=[],r={},o={},s=Array.prototype.slice.apply(arguments).reduce(function(e,t){return e.concat(t)},[]),a=0;a<s.length;a++){var u=s[a];if("action"===u.type){if(e)throw new Error("each transition definition must contain exactly one 'use' statement");e={method:u.payload,args:u.args}}else if("reverseAction"===u.type){if(t)throw new Error("each transition defintiion may contain at most one 'reverse' statement");t={method:u.payload,args:u.args}}else if("route"===u.type){if(r[u.side])throw new Error("A transition definition contains multiple constraints on "+u.side+"Route");r[u.side]=u.payload.map(this._withEmpty)}else"parent"===u.type?i.push(u.payload):(o[u.side]||(o[u.side]=[]),o[u.side].push(u.payload))}if(!e)throw new Error("a transition definition contains no 'use' statement");r.from||(r.from=[n.ANY]),r.to||(r.to=[n.ANY]),0===i.length&&i.push(n.ANY),o.from||(o.from=[n.ANY]),o.to||(o.to=[n.ANY]),i=this._combineMatchers(i),o.from=this._combineMatchers(o.from),o.to=this._combineMatchers(o.to),this.map.register(r,o,i,e),t&&(r={from:r.to,to:r.from},o={from:o.to,to:o.from},this.map.register(r,o,i,t))},fromRoute:function(){return{side:"from",type:"route",payload:Array.prototype.slice.apply(arguments)}},toRoute:function(){return{side:"to",type:"route",payload:Array.prototype.slice.apply(arguments)}},withinRoute:function(){return[this.fromRoute.apply(this,arguments),this.toRoute.apply(this,arguments)]},fromModel:function(e){return{side:"from",type:"context",payload:i(e)}},toModel:function(e){return{side:"to",type:"context",payload:i(e)}},betweenModels:function(e){return[this.fromModel(e),this.toModel(e)]},hasClass:function(e){return{type:"parent",payload:function(){return this&&-1!==this.get("classNames").indexOf(e)}}},childOf:function(e){return{type:"parent",payload:function(){var t;return this&&this._morph&&Ember.$(this._morph.start.parentElement).is(e)||this.morph&&Ember.$("#"+this.morph.start).parent().is(e)||(t=this.$())&&t.parent().is(e)}}},fromNonEmptyModel:function(){return this.fromModel(function(){return"undefined"!=typeof this})},toNonEmptyModel:function(){return this.toModel(function(){return"undefined"!=typeof this})},betweenNonEmptyModels:function(){return this.betweenModels(function(){return"undefined"!=typeof this})},use:function(e){return{type:"action",payload:e,args:Array.prototype.slice.apply(arguments,[1])}},reverse:function(e){return{type:"reverseAction",payload:e,args:Array.prototype.slice.apply(arguments,[1])}}},n.ANY="__liquid-fire-ANY",n.EMPTY="__liquid-fire-EMPTY",t["default"]=n}),define("vendor/liquid-fire/animate",["vendor/liquid-fire/promise","ember","exports"],function(e,t,n){"use strict";function i(e,t,n,i){var r,o={percentComplete:0,timeRemaining:100,timeSpent:0};if(!e||!(r=e.$())||!r[0])return h.cast();if(n=n?p.copy(n):{},"undefined"==typeof n.display&&(n.display="auto"),n.progress)throw new Error("liquid-fire's 'animate' function reserves the use of Velocity's 'progress' option for its own nefarious purposes.");return n.progress=function(){o.percentComplete=arguments[1],o.timeRemaining=arguments[2],o.timeSpent=o.timeRemaining/(1/o.percentComplete-1)},o.promise=h.cast($.Velocity.animate(r[0],t,n)),i&&(o.promise=o.promise.then(function(){f(e,i)},function(t){throw f(e,i),t}),d(e,i,o)),o.promise}function r(e){var t;e&&(t=e.$())&&t.velocity("stop",!0)}function o(e){for(var t in e)if(e.hasOwnProperty(t)){if("progress"===t)throw new Error("liquid-fire's 'animate' function reserves the use of Velocity's '"+t+"' option for its own nefarious purposes.");$.Velocity.defaults[t]=e[t]}}function s(e,t){return e&&e._lfTags&&e._lfTags[t]}function a(e,t){return l(e,t).promise}function u(e,t){return l(e,t).timeSpent}function c(e,t){return l(e,t).timeRemaining}function l(e,t){var n=s(e,t);if(!n)throw new Error("no animation labeled "+t+" is in progress");return n}function d(e,t,n){e&&(e._lfTags||(e._lfTags={}),e._lfTags[t]=n)}function f(e,t){e&&e._lfTags&&delete e._lfTags[t]}var h=e["default"],p=t["default"];$.Velocity.Promise||($.Velocity.Promise=h),n.animate=i,n.stop=r,n.setDefaults=o,n.isAnimating=s,n.finish=a,n.timeSpent=u,n.timeRemaining=c}),define("vendor/liquid-fire/initialize",["vendor/liquid-fire/transitions","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=function(e,t){var i=n.map(t);i.container=e,e.register("transitions:map",i,{instantiate:!1}),["outlet","with","if"].forEach(function(t){e.injection("view:liquid-"+t,"transitions","transitions:map")})}}),define("vendor/liquid-fire/mutation-observer",["exports"],function(e){"use strict";function t(e){this.callback=e}t.prototype={observe:function(){this.interval=setInterval(this.callback,100)},disconnect:function(){clearInterval(this.interval)}};var n=window.MutationObserver||window.WebkitMutationObserver||t;e["default"]=n}),define("vendor/liquid-fire/curry",["exports"],function(e){"use strict";e["default"]=function(e){var t=Array.prototype.slice.apply(arguments,[1]);return function(){var n=this.lookup(e),i=Array.prototype.slice.apply(arguments);return i.splice.apply(i,[2,0].concat(t)),n.apply(this,i)}}}),define("krono/initializers/signin",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]={name:"signin",initialize:function(){var e="https://krono-market.herokuapp.com/auth/auto_signup/";n.$.post(e,function(e){console.log(e)})}}}),define("krono/models/product",["ember-data","exports"],function(e,t){"use strict";var n=e["default"],i=n.Model.extend({name:n.attr(),description:n.attr(),count:n.attr("number"),price:n.attr("number"),image:n.attr()});i.reopenClass({FIXTURES:[{id:1,name:"Coca Cola",count:3,price:"3500",image:"http://campaiexpress.com/archivosdelusuario/fotografias/productos/bebidas_cocacola-600_70_1.jpg"},{id:2,name:"Leche",count:1,price:"1500",image:"http://clande-products.s3.amazonaws.com/222941-co_24_7_colanta-ltda_jp_02-thumb.jpg"},{id:3,name:"Pepsi",count:1,price:"2800",image:"http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg"},{id:4,name:"Perman",count:1,price:"3500",image:"http://www.exito.com/images/products/062/0000059173061062/0000059174020526_lrg_a.jpg"}]}),t["default"]=i}),define("krono/router",["ember","exports"],function(e,t){"use strict";var n=e["default"],i=n.Router.extend({location:KronoENV.locationType});i.map(function(){this.route("order"),this.route("pending"),this.route("evaluate")}),t["default"]=i}),define("krono/routes/index",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Route.extend({beforeModel:function(){this.transitionTo("order")}})}),define("krono/templates/application",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,i,r,o){this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,n.Handlebars.helpers),o=o||{};var s,a="";return o.buffer.push("\n"),s=i._triageMustache.call(t,"liquid-outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(s||0===s)&&o.buffer.push(s),o.buffer.push("\n"),a})}),define("krono/templates/evaluate",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,i,r,o){function s(e,t){var n,r="";return t.buffer.push('\n  <div class="container annotations-wrapper">\n    <h2>Anotaciones</h2>\n    <ul>\n      '),n=i.each.call(e,"annotation","in","annotations",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(2,a,t),contexts:[e,e,e],types:["ID","ID","ID"],data:t}),(n||0===n)&&t.buffer.push(n),t.buffer.push("\n    </ul>\n  </div>\n  "),r}function a(e,t){var n,r="";return t.buffer.push("\n      <li>\n        "),n=i._triageMustache.call(e,"annotation",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(n||0===n)&&t.buffer.push(n),t.buffer.push("\n      </li>\n      "),r}function u(e,t){var n,r,o,s="";return t.buffer.push('\n        <a class="col-xs-4 product-col">\n          <div class="image-wrapper">\n            '),r=i["x-background"]||e&&e["x-background"],o={hash:{imgSource:"product.image"},hashTypes:{imgSource:"ID"},hashContexts:{imgSource:e},inverse:p.noop,fn:p.program(5,c,t),contexts:[],types:[],data:t},n=r?r.call(e,o):m.call(e,"x-background",o),(n||0===n)&&t.buffer.push(n),t.buffer.push("\n          </div>\n        </a>\n      "),s}function c(){var e="";return e}function l(e,t){var n="";return t.buffer.push("\n      <a class='btn-record' "),t.buffer.push(v(i.action.call(e,"record",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push("></a>\n      "),n}function d(e,t){var n="";return t.buffer.push("\n      <a class='btn-record btn-record-touch' "),t.buffer.push(v(i.action.call(e,"stop",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push('>\n        <div class="spinner"></div>\n      </a>\n      '),n}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,n.Handlebars.helpers),o=o||{};var f,h="",p=this,m=i.helperMissing,v=this.escapeExpression;return o.buffer.push('\n<div class="record-view-wrapper">\n\n  '),f=i["if"].call(t,"annotations",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,s,o),contexts:[t],types:["ID"],data:o}),(f||0===f)&&o.buffer.push(f),o.buffer.push('\n\n  <div class="container products-wrapper">\n    <div class="row">\n      '),f=i.each.call(t,"product","in","products",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(4,u,o),contexts:[t,t,t],types:["ID","ID","ID"],data:o}),(f||0===f)&&o.buffer.push(f),o.buffer.push('\n    </div>\n  </div>\n\n\n  <div class="bottom-buttons container">\n    <div class="row total-price">\n      <div class="col-xs-3">\n        Valor\n      </div>\n      <div class="col-xs-9 total-price-value">\n        $23.500\n      </div>\n    </div>\n    <div class="col-xs-4">\n      \n      <a class=\'btn-cancel-order\'></a>\n\n    </div>\n    <div class="col-xs-4">\n\n      '),f=i.unless.call(t,"isRecording",{hash:{},hashTypes:{},hashContexts:{},inverse:p.program(9,d,o),fn:p.program(7,l,o),contexts:[t],types:["ID"],data:o}),(f||0===f)&&o.buffer.push(f),o.buffer.push("\n\n    </div>\n    <div class=\"col-xs-4\">\n      \n      <a class='btn-accept-order'></a>\n\n    </div>\n  </div>\n\n</div>\n"),h})}),define("krono/templates/liquid-with-self",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,i,r,o){this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,n.Handlebars.helpers),o=o||{};var s,a="";return s=i._triageMustache.call(t,"",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(s||0===s)&&o.buffer.push(s),o.buffer.push("\n"),a})}),define("krono/templates/liquid-with",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,i,r,o){this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,n.Handlebars.helpers),o=o||{};var s,a="";return s=i._triageMustache.call(t,"with-apply",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(s||0===s)&&o.buffer.push(s),o.buffer.push("\n\n\n"),a})}),define("krono/templates/order",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,i,r,o){function s(e,t){var n="";return t.buffer.push("\n  <a class='btn-record' "),t.buffer.push(l(i.action.call(e,"record",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push("></a>\n  "),n}function a(e,t){var n="";return t.buffer.push("\n  <a class='btn-record btn-record-touch' "),t.buffer.push(l(i.action.call(e,"stop",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push('>\n    <div class="spinner"></div>\n  </a>\n  '),n}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,n.Handlebars.helpers),o=o||{};var u,c="",l=this.escapeExpression,d=this;return o.buffer.push('\n<div class="record-view-wrapper">\n  <h1>Haz tu pedido!</h1>\n\n  <p>\n    (Graba la tienda, productos, cantidad, referencia y marca de lo que necesitas)\n  </p>\n\n  '),u=i.unless.call(t,"isRecording",{hash:{},hashTypes:{},hashContexts:{},inverse:d.program(3,a,o),fn:d.program(1,s,o),contexts:[t],types:["ID"],data:o}),(u||0===u)&&o.buffer.push(u),o.buffer.push("\n  <br>\n  <button "),o.buffer.push(l(i.action.call(t,"play",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o}))),o.buffer.push(">Play</button>\n  <button "),o.buffer.push(l(i.action.call(t,"upload",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:o}))),o.buffer.push(">Upload</button>\n\n</div>\n"),c})}),define("krono/templates/pending",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,i,r,o){function s(e,t){t.buffer.push("\n    Cancelar pedido\n  ")}function a(e,t){var n="";return t.buffer.push("\n  \n\n  "),n}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,n.Handlebars.helpers),o=o||{};var u,c,l,d="",f=this,h=i.helperMissing;return o.buffer.push("\n\n<div class=\"record-view-wrapper\">\n  <h1>Pedido en proceso</h1>\n\n  <p>\n    (Espera mientras verificamos tu orden)\n  </p>\n\n  <a class='btn-cancel-order'>\n    Cancelar pedido\n  </a>\n\n  "),c=i["link-to"]||t&&t["link-to"],l={hash:{"class":"btn-stop-order"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},inverse:f.noop,fn:f.program(1,s,o),contexts:[t],types:["STRING"],data:o},u=c?c.call(t,"order",l):h.call(t,"link-to","order",l),(u||0===u)&&o.buffer.push(u),o.buffer.push("\n\n  "),u=i.unless.call(t,"isRecording",{hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(3,a,o),contexts:[t],types:["ID"],data:o}),(u||0===u)&&o.buffer.push(u),o.buffer.push("\n\n\n</div>\n\n"),d})}),define("krono/transitions",["exports"],function(e){"use strict";e["default"]=function(){this.transition(this.fromRoute("order"),this.toRoute("pending"),this.use("toLeft",{duration:500}),this.reverse("toRight",{duration:500}))}}),define("krono/transitions/cross-fade",["vendor/liquid-fire","exports"],function(e,t){"use strict";var n=e.animate,i=e.stop,r=e.Promise;t["default"]=function(e,t,o){return i(e),t().then(function(t){return r.all([n(e,{opacity:0},o),n(t,{opacity:[1,0]},o)])})}}),define("krono/transitions/fade",["vendor/liquid-fire","exports"],function(e,t){"use strict";var n=e.isAnimating,i=e.finish,r=e.timeSpent,o=e.animate,s=e.stop;t["default"]=function(e,t,a){var u,c=a;return n(e,"fade-out")?u=i(e,"fade-out"):(n(e,"fade-in")&&(c={duration:r(e,"fade-in")}),s(e),u=o(e,{opacity:0},c,"fade-out")),u.then(t).then(function(e){return o(e,{opacity:[1,0]},a,"fade-in")})}}),define("krono/transitions/move-over",["vendor/liquid-fire","exports"],function(e,t){"use strict";var n=e.stop,i=e.animate,r=e.Promise,o=e.isAnimating,s=e.finish;t["default"]=function(e,t,a,u,c){var l,d="translate"+a.toUpperCase(),f={},h={};return o(e,"moving-in")?l=s(e,"moving-in"):(n(e),l=r.cast()),f[d]=100*u+"%",h[d]=["0%",-100*u+"%"],l.then(t).then(function(t){return r.all([i(e,f,c),i(t,h,c,"moving-in")])})}}),define("krono/transitions/to-down",["vendor/liquid-fire","exports"],function(e,t){"use strict";var n=e.curryTransition;t["default"]=n("move-over","y",1)}),define("krono/transitions/to-left",["vendor/liquid-fire","exports"],function(e,t){"use strict";var n=e.curryTransition;t["default"]=n("move-over","x",-1)}),define("krono/transitions/to-right",["vendor/liquid-fire","exports"],function(e,t){"use strict";var n=e.curryTransition;t["default"]=n("move-over","x",1)}),define("krono/transitions/to-up",["vendor/liquid-fire","exports"],function(e,t){"use strict";var n=e.curryTransition;t["default"]=n("move-over","y",-1)}),define("krono/views/liquid-child",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.ContainerView.extend({classNames:["liquid-child"],resolveInsertionPromise:n.on("didInsertElement",function(){this.$().hide(),this._resolveInsertion&&this._resolveInsertion(this)})})}),define("krono/views/liquid-if",["krono/views/liquid-outlet","ember","exports"],function(e,t,n){"use strict";var i=e["default"],r=t["default"];n["default"]=i.extend({liquidUpdate:r.on("init",r.observer("showFirst",function(){var e=this.get((this.get("showFirst")?"first":"second")+"Template"),t=r._MetamorphView.create({container:this.container,template:e,liquidParent:this,contextBinding:"liquidParent.context",liquidContext:this.get("showFirst"),hasLiquidContext:!0});this.set("currentView",t)}))})}),define("krono/views/liquid-outlet",["ember","vendor/liquid-fire","exports"],function(e,t,n){"use strict";var i=e["default"],r=t.Promise,o=t.animate,s=t.stop;n["default"]=i.ContainerView.extend({classNames:["liquid-container"],attributeBindings:["style"],growPixelsPerSecond:200,growEasing:"slide",enableGrowth:!0,init:function(){this._super(),i.A(this._childViews).clear()},_currentViewWillChange:i.beforeObserver("currentView",function(){}),_currentViewDidChange:i.on("init",i.observer("currentView",function(){var e=this.get("childViews.lastObject"),t=this.get("currentView");if(!(!e&&!t||e&&e.get("currentView")===t||this._runningTransition&&this._runningTransition.oldView===e&&this._runningTransition.newContent===t)){var n=this.get("transitions").transitionFor(this,e,t,this.get("use"));this._runningTransition&&this._runningTransition.interrupt(),this._runningTransition=n,n.run()["catch"](function(e){i.RSVP.Promise.cast()._onerror(e)})}})),_liquidChildFor:function(e){e&&!e.get("hasLiquidContext")&&e.set("liquidContext",e.get("context"));var t=this.container.lookupFactory("view:liquid-child");return t.create({currentView:e})},_pushNewView:function(e){var t=this._liquidChildFor(e),n=new r(function(e){t._resolveInsertion=e});return this.pushObject(t),n},style:i.computed("preserveWidth","preserveHeight",function(){var e=this.get("preserveWidth"),t=this.get("preserveHeight"),n=[];return"undefined"!=typeof e&&n.push("width:"+e+"px"),"undefined"!=typeof t&&n.push("height:"+t+"px"),n.join(";")}),lockSize:function(){var e=this.$();e&&(this._lastLockWidth=e.width(),this._lastLockHeight=e.height(),e.width(this._lastLockWidth),e.height(this._lastLockHeight))},unlockSize:function(){function e(){var e=t.$();e&&e.css({width:"",height:""})}var t=this;this._scaling?this._scaling.then(e):e()},_durationFor:function(e,t){return 1e3*Math.abs(e-t)/this.get("growPixelsPerSecond")},_adaptDimension:function(e,t,n){if(t!==n&&this.get("enableGrowth")){var i={};return i[e]=[n,t],o(this,i,{duration:this._durationFor(t,n),queue:!1,easing:this.get("growEasing"),display:null})}var s=this.$();return s&&s[e](n),r.cast()},adaptSize:function(e,t){s(this),"undefined"==typeof this._lastLockWidth&&(this._lastLockWidth=e,this._lastLockHeight=t),this._scaling=r.all([this._adaptDimension("width",this._lastLockWidth,e),this._adaptDimension("height",this._lastLockHeight,t)])}})}),define("krono/views/liquid-with",["krono/views/liquid-outlet","ember","exports"],function(e,t,n){"use strict";var i=e["default"],r=t["default"];n["default"]=i.extend({liquidUpdate:r.on("init",r.observer("boundContext",function(){var e=r._MetamorphView.create({container:this.container,templateName:"liquid-with",boundContext:this.get("boundContext"),liquidWithParent:this,liquidContext:this.get("boundContext"),hasLiquidContext:!0});this.set("currentView",e)}))})});