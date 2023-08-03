(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8771:function(e,s,t){"use strict";var n=t(9713);function i(e,s){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);s&&(n=n.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var s=1;s<arguments.length;s++){var t=null!=arguments[s]?arguments[s]:{};s%2?i(Object(t),!0).forEach((function(s){n(e,s,t[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))}))}return e}s.default=function(e,s){var t=r.default,n={loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};e instanceof Promise?n.loader=function(){return e}:"function"===typeof e?n.loader=e:"object"===typeof e&&(n=a(a({},n),e));var i=n=a(a({},n),s);if(i.suspense)throw new Error("Invalid suspense option usage in next/dynamic. Read more: https://nextjs.org/docs/messages/invalid-dynamic-suspense");if(i.suspense)return t(i);n.loadableGenerated&&delete(n=a(a({},n),n.loadableGenerated)).loadableGenerated;if("boolean"===typeof n.ssr){if(!n.ssr)return delete n.ssr,c(t,n);delete n.ssr}return t(n)};l(t(7294));var r=l(t(4860));function l(e){return e&&e.__esModule?e:{default:e}}function c(e,s){return delete s.webpack,delete s.modules,e(s)}},1083:function(e,s,t){"use strict";var n;Object.defineProperty(s,"__esModule",{value:!0}),s.LoadableContext=void 0;var i=((n=t(7294))&&n.__esModule?n:{default:n}).default.createContext(null);s.LoadableContext=i},4860:function(e,s,t){"use strict";var n=t(4575),i=t(3913),a=t(9713);function r(e,s){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);s&&(n=n.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var s=1;s<arguments.length;s++){var t=null!=arguments[s]?arguments[s]:{};s%2?r(Object(t),!0).forEach((function(s){a(e,s,t[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))}))}return e}function c(e,s){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,s){if(!e)return;if("string"===typeof e)return d(e,s);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return d(e,s)}(e))||s&&e&&"number"===typeof e.length){t&&(e=t);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return r=e.done,e},e:function(e){l=!0,a=e},f:function(){try{r||null==t.return||t.return()}finally{if(l)throw a}}}}function d(e,s){(null==s||s>e.length)&&(s=e.length);for(var t=0,n=new Array(s);t<s;t++)n[t]=e[t];return n}Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var o,m=(o=t(7294))&&o.__esModule?o:{default:o},u=t(7161),h=t(1083);var p=[],f=[],x=!1;function j(e){var s=e(),t={loading:!0,loaded:null,error:null};return t.promise=s.then((function(e){return t.loading=!1,t.loaded=e,e})).catch((function(e){throw t.loading=!1,t.error=e,e})),t}var y=function(){function e(s,t){n(this,e),this._loadFn=s,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return i(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var s=this._res,t=this._opts;s.loading&&("number"===typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),t.delay)),"number"===typeof t.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),t.timeout))),this._res.promise.then((function(){e._update({}),e._clearTimeouts()})).catch((function(s){e._update({}),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=l(l({},this._state),{},{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var s=this;return this._callbacks.add(e),function(){s._callbacks.delete(e)}}}]),e}();function g(e){return function(e,s){var t=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null,suspense:!1},s);t.suspense&&(t.lazy=m.default.lazy(t.loader));var n=null;function i(){if(!n){var s=new y(e,t);n={getCurrentValue:s.getCurrentValue.bind(s),subscribe:s.subscribe.bind(s),retry:s.retry.bind(s),promise:s.promise.bind(s)}}return n.promise()}if(!x&&"function"===typeof t.webpack&&!t.suspense){var a=t.webpack();f.push((function(e){var s,t=c(a);try{for(t.s();!(s=t.n()).done;){var n=s.value;if(-1!==e.indexOf(n))return i()}}catch(r){t.e(r)}finally{t.f()}}))}var r=t.suspense?function(e,s){return m.default.createElement(t.lazy,l(l({},e),{},{ref:s}))}:function(e,s){i();var a=m.default.useContext(h.LoadableContext),r=u.useSubscription(n);return m.default.useImperativeHandle(s,(function(){return{retry:n.retry}}),[]),a&&Array.isArray(t.modules)&&t.modules.forEach((function(e){a(e)})),m.default.useMemo((function(){return r.loading||r.error?m.default.createElement(t.loading,{isLoading:r.loading,pastDelay:r.pastDelay,timedOut:r.timedOut,error:r.error,retry:n.retry}):r.loaded?m.default.createElement(function(e){return e&&e.__esModule?e.default:e}(r.loaded),e):null}),[e,r])};return r.preload=function(){return!t.suspense&&i()},r.displayName="LoadableComponent",m.default.forwardRef(r)}(j,e)}function b(e,s){for(var t=[];e.length;){var n=e.pop();t.push(n(s))}return Promise.all(t).then((function(){if(e.length)return b(e,s)}))}g.preloadAll=function(){return new Promise((function(e,s){b(p).then(e,s)}))},g.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(s){var t=function(){return x=!0,s()};b(f,e).then(t,t)}))},window.__NEXT_PRELOADREADY=g.preloadReady;var v=g;s.default=v},2562:function(e,s,t){"use strict";t.r(s);var n,i=t(5152),a=t(1664),r=t(7294),l=t(5893);s.default=function(){var e=(0,r.useState)(""),s=e[0],c=e[1];return(0,r.useEffect)((function(){n=(0,i.default)((function(){return Promise.all([t.e(571),t.e(568)]).then(t.t.bind(t,2568,23))}),{ssr:!1,loadableGenerated:{webpack:function(){return[2568]},modules:["index.tsx -> react-owl-carousel"]}}),c(n)}),[]),(0,l.jsxs)("div",{className:"wrapper-inner",children:[(0,l.jsxs)("section",{className:"main-top-section",children:[(0,l.jsx)("img",{className:"main-top-bg",src:"images/main-top-bg.png"}),(0,l.jsx)("div",{className:"container",children:(0,l.jsxs)("div",{className:"main-top-content-blk",children:[(0,l.jsx)("div",{className:"main-top-left-content",children:(0,l.jsx)("div",{className:"main-top-sec-content-block",children:(0,l.jsxs)("div",{className:"main-top-sec-content",children:[(0,l.jsx)("h2",{children:"Cyber Octopus"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"}),(0,l.jsxs)("div",{className:"action-btn-blk",children:[(0,l.jsx)(a.default,{href:"login",children:(0,l.jsx)("a",{className:"btn common-btn",children:"Login"})}),(0,l.jsx)(a.default,{href:"signup",children:(0,l.jsx)("a",{className:"btn common-btn trans-btn",style:{marginLeft:"10px"},children:"Sign Up"})})]})]})})}),(0,l.jsx)("div",{className:"main-top-right-content",children:(0,l.jsx)("div",{className:"main-top-img-block",children:(0,l.jsx)("figure",{className:"d-flex",children:(0,l.jsx)("img",{src:"images/main-top-img.png"})})})})]})})]}),(0,l.jsx)("section",{className:"info-detail-sec",children:(0,l.jsxs)("div",{className:"container",children:[(0,l.jsxs)("div",{className:"info-detail-sec-head mb-5",children:[(0,l.jsx)("h4",{children:"Trusted By big and small companies"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"})]}),(0,l.jsxs)("div",{className:"row mb-5",children:[(0,l.jsx)("div",{className:"col-md-3",children:(0,l.jsxs)("div",{className:"info-detail-item",style:{display:"block"},children:[(0,l.jsx)("img",{src:"images/micro-icon.svg"}),(0,l.jsx)("h4",{children:"Lorem Ipsum is simply"})]})}),(0,l.jsx)("div",{className:"col-md-3",children:(0,l.jsxs)("div",{className:"info-detail-item",children:[(0,l.jsx)("img",{src:"images/micro-icon.svg"}),(0,l.jsx)("h4",{children:"Lorem Ipsum is simply"})]})}),(0,l.jsx)("div",{className:"col-md-3",children:(0,l.jsxs)("div",{className:"info-detail-item",children:[(0,l.jsx)("img",{src:"images/micro-icon.svg"}),(0,l.jsx)("h4",{children:"Lorem Ipsum is simply"})]})}),(0,l.jsx)("div",{className:"col-md-3",children:(0,l.jsxs)("div",{className:"info-detail-item",children:[(0,l.jsx)("img",{src:"images/micro-icon.svg"}),(0,l.jsx)("h4",{children:"Lorem Ipsum is simply"})]})})]}),(0,l.jsx)("div",{className:"text-center",children:(0,l.jsxs)("button",{type:"button",className:"btn common-btn",children:["Read More ",(0,l.jsx)("i",{className:"fas fa-long-arrow-alt-right"})]})})]})}),(0,l.jsx)("section",{className:"info-content-sec",children:(0,l.jsxs)("div",{className:"container",children:[(0,l.jsxs)("div",{className:"info-content-block mb-7",children:[(0,l.jsx)("div",{className:"info-content-detail",children:(0,l.jsxs)("div",{className:"info-content-dtl-blk",children:[(0,l.jsx)("h4",{children:"Quest Module"}),(0,l.jsx)("h2",{children:"Cybersecurity Matters Made Easy"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"}),(0,l.jsxs)("ul",{children:[(0,l.jsxs)("li",{children:["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s"," "]}),(0,l.jsx)("li",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting"})]}),(0,l.jsxs)("button",{className:"btn common-btn",children:["Read More ",(0,l.jsx)("i",{className:"fas fa-long-arrow-alt-right"})]})]})}),(0,l.jsx)("div",{className:"info-content-img-blk",children:(0,l.jsx)("figure",{style:{display:"block"},children:(0,l.jsx)("img",{src:"images/info-bg-1.png"})})})]}),(0,l.jsxs)("div",{className:"info-content-block left-img-block",children:[(0,l.jsx)("div",{className:"info-content-img-blk",children:(0,l.jsx)("figure",{style:{display:"block"},children:(0,l.jsx)("img",{src:"images/info-bg-1.png"})})}),(0,l.jsx)("div",{className:"info-content-detail",children:(0,l.jsxs)("div",{className:"info-content-dtl-blk",children:[(0,l.jsx)("h4",{children:"Awarness Module"}),(0,l.jsx)("h2",{children:"Entertaining Education For Practical Learning"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"}),(0,l.jsxs)("ul",{children:[(0,l.jsxs)("li",{children:["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s"," "]}),(0,l.jsx)("li",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting"})]}),(0,l.jsxs)("button",{className:"btn common-btn",children:["Read More ",(0,l.jsx)("i",{className:"fas fa-long-arrow-alt-right"})]})]})})]})]})}),(0,l.jsxs)("section",{className:"courses-info-detail-sec",children:[(0,l.jsx)("div",{className:"animate-shape shape-1"}),(0,l.jsx)("div",{className:"animate-shape shape-2"}),(0,l.jsxs)("div",{className:"container",children:[(0,l.jsxs)("div",{className:"courses-info-detail-sec mb-5",children:[(0,l.jsx)("h4",{children:"Sneakpeak of our coures"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"})]}),(0,l.jsxs)("div",{className:"row",children:[(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"courses-info-detail-item",children:[(0,l.jsx)("figure",{style:{display:"block"},children:(0,l.jsx)("img",{src:"images/info-bg-1.png"})}),(0,l.jsxs)("div",{className:"courses-info-detail",children:[(0,l.jsxs)("div",{className:"courses-info-nm-blk",children:[(0,l.jsx)("a",{href:"javascript:void(0);",className:"courses-nm",children:"Enter the Matrix"}),(0,l.jsx)("span",{children:"Free Course"})]}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}),(0,l.jsxs)("div",{className:"courses-info-tags",children:[(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"Advance"}),(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"Lorem Ipsum"}),(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"1 Hour"})]})]})]})}),(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"courses-info-detail-item",children:[(0,l.jsx)("figure",{style:{display:"block"},children:(0,l.jsx)("img",{src:"images/info-bg-1.png"})}),(0,l.jsxs)("div",{className:"courses-info-detail",children:[(0,l.jsxs)("div",{className:"courses-info-nm-blk",children:[(0,l.jsx)("a",{href:"javascript:void(0);",className:"courses-nm",children:"Lorem Ipsum is simply"}),(0,l.jsx)("span",{children:"Past Course"})]}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}),(0,l.jsxs)("div",{className:"courses-info-tags",children:[(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"Advance"}),(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"Lorem Ipsum"}),(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"2 Hour"})]})]})]})}),(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"courses-info-detail-item",children:[(0,l.jsx)("figure",{style:{display:"block"},children:(0,l.jsx)("img",{src:"images/info-bg-1.png"})}),(0,l.jsxs)("div",{className:"courses-info-detail",children:[(0,l.jsxs)("div",{className:"courses-info-nm-blk",children:[(0,l.jsx)("a",{href:"javascript:void(0);",className:"courses-nm",children:"Enter the Matrix"}),(0,l.jsx)("span",{children:"Free Course"})]}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}),(0,l.jsxs)("div",{className:"courses-info-tags",children:[(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"Advance"}),(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"Lorem Ipsum"}),(0,l.jsx)("a",{href:"javascript:void(0);",className:"course-tag",children:"3 Hour"})]})]})]})})]})]})]}),(0,l.jsx)("section",{className:"cyber-intelligence-section",children:(0,l.jsx)("div",{className:"container",children:(0,l.jsxs)("div",{className:"row align-items-center",children:[(0,l.jsxs)("div",{className:"col-md-6",children:[(0,l.jsxs)("div",{className:"cyber-intelligence-sec-head mb-4",children:[(0,l.jsx)("h4",{children:"Cyber Intelligence"}),(0,l.jsxs)("p",{children:["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy"," "]})]}),(0,l.jsxs)("div",{className:"cyber-intelligence-blk mb-3",children:[(0,l.jsx)("h4",{children:"Legislation Changes"}),(0,l.jsxs)("p",{children:["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s"," "]})]}),(0,l.jsxs)("div",{className:"cyber-intelligence-blk mb-3",children:[(0,l.jsx)("h4",{children:"Data Breaches"}),(0,l.jsxs)("p",{children:["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s"," "]})]}),(0,l.jsxs)("div",{className:"cyber-intelligence-blk ",children:[(0,l.jsx)("h4",{children:"Local News"}),(0,l.jsxs)("p",{children:["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s"," "]})]})]}),(0,l.jsx)("div",{className:"col-md-6",children:(0,l.jsx)("div",{className:"cyber-intelligence-img-blk",children:(0,l.jsx)("figure",{children:(0,l.jsx)("img",{src:"images/cyber-intelligence-img.png"})})})})]})})}),(0,l.jsxs)("section",{className:"upcoming-features-sec",children:[(0,l.jsx)("div",{className:"animate-shape shape-1"}),(0,l.jsx)("div",{className:"animate-shape shape-2"}),(0,l.jsxs)("div",{className:"container",children:[(0,l.jsxs)("div",{className:"upcoming-features-sec-head mb-5",children:[(0,l.jsx)("h4",{children:"Upcoming Features"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"})]}),(0,l.jsx)("div",{className:"features-list-block",children:(0,l.jsx)("div",{className:"features-list",children:(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{className:"active",children:(0,l.jsxs)("div",{className:"features-list-item",children:[(0,l.jsx)("h4",{children:"@2021"}),(0,l.jsx)("h2",{children:"Product Launch"}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content"})]})}),(0,l.jsx)("li",{children:(0,l.jsxs)("div",{className:"features-list-item",children:[(0,l.jsx)("h4",{children:"@2021"}),(0,l.jsx)("h2",{children:"Product Launch"}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content"})]})}),(0,l.jsx)("li",{children:(0,l.jsxs)("div",{className:"features-list-item",children:[(0,l.jsx)("h4",{children:"@2021"}),(0,l.jsx)("h2",{children:"Product Launch"}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content"})]})}),(0,l.jsx)("li",{children:(0,l.jsxs)("div",{className:"features-list-item",children:[(0,l.jsx)("h4",{children:"@2021"}),(0,l.jsx)("h2",{children:"Product Launch"}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content"})]})}),(0,l.jsx)("li",{children:(0,l.jsxs)("div",{className:"features-list-item",children:[(0,l.jsx)("h4",{children:"@2021"}),(0,l.jsx)("h2",{children:"Product Launch"}),(0,l.jsx)("p",{children:"It is a long established fact that a reader will be distracted by the readable content"})]})})]})})})]})]}),(0,l.jsx)("section",{className:"client-testimonials-sec",children:(0,l.jsxs)("div",{className:"container",children:[(0,l.jsxs)("div",{className:"client-testimonials-sec-head mb-5",children:[(0,l.jsx)("h4",{children:"What Our Clients say"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"})]}),s&&(0,l.jsxs)(n,{className:"owl-theme",loop:!0,margin:10,nav:!0,dots:!0,children:[(0,l.jsx)("div",{className:"item",children:(0,l.jsxs)("div",{className:"testimonials-item",children:[(0,l.jsx)("div",{className:"testimonials-desc",children:(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."})}),(0,l.jsxs)("div",{className:"testimonials-info",children:[(0,l.jsx)("figure",{children:(0,l.jsx)("img",{src:"images/say-img1.png"})}),(0,l.jsxs)("div",{className:"testimonials-info-nm",children:[(0,l.jsx)("h4",{children:"Christine Rose"}),(0,l.jsx)("p",{children:"Lorem Ipsum"})]})]})]})}),(0,l.jsx)("div",{className:"item",children:(0,l.jsxs)("div",{className:"testimonials-item",children:[(0,l.jsx)("div",{className:"testimonials-desc",children:(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."})}),(0,l.jsxs)("div",{className:"testimonials-info",children:[(0,l.jsx)("figure",{children:(0,l.jsx)("img",{src:"images/say-img1.png"})}),(0,l.jsxs)("div",{className:"testimonials-info-nm",children:[(0,l.jsx)("h4",{children:"Christine Rose"}),(0,l.jsx)("p",{children:"Lorem Ipsum"})]})]})]})})]})]})}),(0,l.jsx)("section",{className:"info-detail-sec-2",children:(0,l.jsxs)("div",{className:"container",children:[(0,l.jsxs)("div",{className:"info-detail-sec-2-head mb-5",children:[(0,l.jsx)("h4",{children:"Use Cases"}),(0,l.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown"})]}),(0,l.jsxs)("div",{className:"row",children:[(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"info-detail-item-2",children:[(0,l.jsx)("h4",{children:"Use case #1"}),(0,l.jsx)("h2",{children:"Lorem Ipsum is simply"}),(0,l.jsxs)("p",{children:["It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."," "]})]})}),(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"info-detail-item-2",children:[(0,l.jsx)("h4",{children:"Use case #1"}),(0,l.jsx)("h2",{children:"Lorem Ipsum is simply"}),(0,l.jsxs)("p",{children:["It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."," "]})]})}),(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"info-detail-item-2",children:[(0,l.jsx)("h4",{children:"Use case #1"}),(0,l.jsx)("h2",{children:"Lorem Ipsum is simply"}),(0,l.jsxs)("p",{children:["It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."," "]})]})})]})]})})]})}},5301:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2562)}])},5152:function(e,s,t){e.exports=t(8771)}},function(e){e.O(0,[774,888,179],(function(){return s=5301,e(e.s=s);var s}));var s=e.O();_N_E=s}]);