(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(1),c=n.n(a),i=n(10),o=n.n(i),s=n(3),u=n(2),l=n(4),f=n.n(l),d=n(8),p=n(7);n(17);function m(e){return j.apply(this,arguments)}function j(){return(j=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/artist/".concat(t,"/songs/4"));case 2:if(404!==(n=e.sent).status){e.next=5;break}throw new Error("artist not found");case 5:if(500!==n.status){e.next=7;break}throw new Error("server error");case 7:return e.next=9,n.json();case 9:return e.abrupt("return",e.sent);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){var t=/\(|\||\bfeat\b|\bfeaturing\b|\//;return e.map((function(e){var n=e.toLowerCase(),r=n.search(t);return-1!==r&&(n=n.slice(0,r)),n.trim()}))}function b(e,t,n){return h.apply(this,arguments)}function h(){return(h=Object(p.a)(f.a.mark((function e(t,n,r){var a,c,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[],c=Object(d.a)(t),i=0;case 3:if(!(a.length<r&&c.length>0)){e.next=13;break}return e.prev=4,e.delegateYield(f.a.mark((function e(){var r,o,s,u,l;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t[i],c=c.filter((function(e,t,n){return t!==n.indexOf(r)})),e.next=4,fetch("https://api.lyrics.ovh/v1/".concat(n,"/").concat(r));case 4:if((o=e.sent).ok){e.next=7;break}throw new Error;case 7:return e.next=9,o.json();case 9:if(s=e.sent,""!==s.lyrics&&"[Instrumental]"!==s.lyrics){e.next=13;break}throw new Error;case 13:u=s.lyrics.split(/\n/).filter((function(e){return""!==e})),l=Math.floor(Math.random()*(u.length-3)),a.push({lyrics:['"'.concat(u[l]),u[l+1],"".concat(u[l+2],'"')],song:r});case 16:case"end":return e.stop()}}),e)}))(),"t0",6);case 6:e.next=10;break;case 8:e.prev=8,e.t1=e.catch(4);case 10:i++,e.next=3;break;case 13:if(!(a.length<r)){e.next=15;break}throw new Error("insufficient lyrics");case 15:return e.abrupt("return",a);case 16:case"end":return e.stop()}}),e,null,[[4,8]])})))).apply(this,arguments)}function v(e,t){var n=x(t,3).map((function(e){return{song:e}}));return y([].concat(Object(d.a)(n),[e]))}function x(e,t){return function(e,t){return y(Array.from(Array(t),(function(e,t){return t}))).slice(0,e)}(t,e.length-1).map((function(t){return e[t]}))}function y(e){for(var t=Object(d.a)(e),n=0;n<e.length-2;n++){var r=Math.floor(Math.random()*(e.length-n)+n),a=[t[n],t[r]];t[r]=a[0],t[n]=a[1]}return t}var g=function(e){var t=e.appDispatch,n=e.setFormSubmitted,c=Object(a.useState)(""),i=Object(s.a)(c,2),o=i[0],u=i[1];function l(){return(l=Object(p.a)(f.a.mark((function e(t,n){var r,a,c,i,o,s,u;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m(t.replace(" ","%20"));case 3:return r=e.sent,a=O(r),c=x(a,12),e.next=8,b(c,t.replace(" ","-"),5);case 8:i=e.sent,o=i.map((function(e){return e.song})),s=a.filter((function(e){return!1===o.includes(e)})),u=i.map((function(e){return v(e,s)})),n({type:"OPTIONS_READY",payload:{gameOptions:u,artistName:t}}),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),n({type:"OPTIONS_ERROR",payload:{error:e.t0,artistName:t}});case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))).apply(this,arguments)}return Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault(),0!==o.replace(/\s/g,"").length&&(n(!0),function(e,t){l.apply(this,arguments)}(o,t))},className:"artist-form",children:[Object(r.jsx)("h2",{className:"artist-form__title",children:"Trivia App"}),Object(r.jsx)("label",{className:"artist-form__label",htmlFor:"artist-input",children:"Introduce un artista"}),Object(r.jsx)("input",{id:"artist-input",className:"artist-form__input",type:"text",value:o,onChange:function(e){return u(e.target.value)}}),Object(r.jsx)("button",{className:"artist-form__submit",children:"Jugar!"})]})},N=(n(18),function(e){var t=e.currentRound,n=e.roundsQuantity,a=Array.from(Array(n),(function(e,t){return t+1}));return Object(r.jsx)("div",{className:"round-indicator",children:a.map((function(e){return Object(r.jsx)("div",{className:e===t?"round-indicator__round--active":"round-indicator__round",children:e},e)}))})}),w=(n(19),function(e){var t=e.children,n=e.info;return Object(r.jsxs)("div",{className:"round-info",children:[t,Object(r.jsx)("div",{className:"round-info__info",children:n})]})});function R(){return(R=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function E(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var _=a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),S=a.createElement("circle",{cx:12,cy:13,r:7}),k=a.createElement("polyline",{points:"12 10 12 13 14 13"}),I=a.createElement("line",{x1:7,y1:4,x2:4.25,y2:6}),D=a.createElement("line",{x1:17,y1:4,x2:19.75,y2:6});function T(e,t){var n=e.title,r=e.titleId,c=E(e,["title","titleId"]);return a.createElement("svg",R({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-alarm",width:32,height:32,viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"#ffffff",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",ref:t,"aria-labelledby":r},c),n?a.createElement("title",{id:r},n):null,_,S,k,I,D)}var P=a.forwardRef(T);n.p;function A(){return(A=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function M(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var L=a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),C=a.createElement("path",{d:"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"});function U(e,t){var n=e.title,r=e.titleId,c=M(e,["title","titleId"]);return a.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-star",width:32,height:32,viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"#ffffff",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",ref:t,"aria-labelledby":r},c),n?a.createElement("title",{id:r},n):null,L,C)}var z=a.forwardRef(U);n.p,n(20);function B(e,t){switch(t.type){case"TICK":return Object(u.a)(Object(u.a)({},e),{},{secondsRemaining:e.secondsRemaining-1});case"ROUND_STARTS":return Object(u.a)({},F);case"OPTION_SELECTED":return Object(u.a)(Object(u.a)({},e),{},{attempts:e.attempts+1,selectedOptions:e.selectedOptions.concat(t.payload.optionIndex)});default:throw new Error("invalid action in round reducer")}}var F={attempts:0,secondsRemaining:45,selectedOptions:[]};function J(e,t){return t?0:0!==e||t?10-2*e:10}var Y=function(e){var t=e.currentRound,n=e.gameDispatch,c=e.gameScore,i=e.roundOptions,o=e.correctOption,u=Object(a.useReducer)(B,F),l=Object(s.a)(u,2),f=l[0],d=l[1],p=Object(a.useRef)(0);function m(e){var t=e.target.value;if(t!==o.song)d({type:"OPTION_SELECTED",payload:{optionIndex:i.findIndex((function(e){return e.song===t}))}});else{var r=J(p.current,!1);n({type:"ENDED_ROUND",payload:{roundScore:r}})}}return p.current=f.attempts,Object(a.useEffect)((function(){d({type:"ROUND_STARTS"});var e=setInterval((function(){d({type:"TICK"})}),1e3);return function(){clearInterval(e)}}),[t]),Object(a.useEffect)((function(){if(0===f.secondsRemaining){var e=J(p.current,!0);n({type:"ENDED_ROUND",payload:{roundScore:e}})}}),[f.secondsRemaining,n]),Object(r.jsxs)("div",{className:"round",children:[Object(r.jsx)(N,{currentRound:t,roundsQuantity:5}),Object(r.jsxs)("div",{className:"round__round-info-container",children:[Object(r.jsx)(w,{info:c,children:Object(r.jsx)(z,{})}),Object(r.jsx)(w,{info:f.secondsRemaining,children:Object(r.jsx)(P,{})})]}),Object(r.jsx)("div",{className:"round__lyrics",children:o.lyrics.map((function(e,t){return Object(r.jsx)("p",{children:e},t)}))}),Object(r.jsx)("div",{className:"round__options-container",children:i.map((function(e,t){return Object(r.jsx)("button",{value:e.song,disabled:f.selectedOptions.includes(t),onClick:m,className:"round__option",style:{"--animation-order":t+1},children:e.song},t)}))})]})},q=(n(21),function(e){var t=e.gameScore;return Object(r.jsxs)("div",{className:"final-results",children:[Object(r.jsx)("div",{className:"final-results__star-container",children:Object(r.jsx)(z,{})}),Object(r.jsx)("h2",{children:"Termin\xf3 el juego"}),Object(r.jsxs)("h3",{children:["Obtuviste ",t," puntos"]}),Object(r.jsx)("h3",{children:"Refresca la p\xe1gina para jugar de nuevo"})]})});n(22);function H(e,t){switch(t.type){case"ENDED_ROUND":return{currentRound:e.currentRound+1,gameScore:e.gameScore+t.payload.roundScore};default:throw new Error}}var K={currentRound:1,gameScore:0},Q=function(e){var t=e.artistName,n=e.gameOptions,c=Object(a.useReducer)(H,K),i=Object(s.a)(c,2),o=i[0],u=i[1];return Object(r.jsx)("div",{className:"game",children:o.currentRound<=5?Object(r.jsx)(Y,{currentRound:o.currentRound,gameDispatch:u,gameScore:o.gameScore,roundOptions:n[o.currentRound-1],correctOption:n[o.currentRound-1].find((function(e){return"lyrics"in e}))},o.currentRound):Object(r.jsx)(q,{gameScore:o.gameScore,artistName:t})})},W=(n(23),function(e){var t=e.artistName,n=e.type,a='Mmm... parece que no hemos encontrado un artista con el nombre "'.concat(t,'". \n\tVerifica que lo hayas escrito correctamente o refresca la p\xe1gina e intenta con otro artista!');return Object(r.jsx)("div",{className:"error-screen",children:Object(r.jsx)("h2",{className:"error-screen__text",children:"artist not found"===n?a:"insufficient lyrics"===n?"Lamentablemente no contamos con suficiente informaci\xf3n sobre el artista. \n\t\tRefresca la p\xe1gina e intenta con otro artista!":"Momentaneamente el servicio no est\xe1 disponible, intenta nuevamente m\xe1s tarde"})})}),V=(n(24),function(){return Object(r.jsxs)("div",{className:"loader",children:[Object(r.jsx)("div",{}),Object(r.jsx)("div",{}),Object(r.jsx)("div",{}),Object(r.jsx)("div",{})]})});n(25);function G(e,t){switch(t.type){case"OPTIONS_READY":return Object(u.a)(Object(u.a)({},e),{},{gameOptions:t.payload.gameOptions,artistName:t.payload.artistName});case"OPTIONS_ERROR":return Object(u.a)(Object(u.a)({},e),{},{error:t.payload.error,artistName:t.payload.artistName});default:throw new Error("invalid action in appReducer")}}var X={artistName:null,gameOptions:null,error:null};var Z=function(){var e=Object(a.useReducer)(G,X),t=Object(s.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!1),o=Object(s.a)(i,2),u=o[0],l=o[1];return Object(r.jsx)("div",{className:"App",children:n.gameOptions?Object(r.jsx)(Q,{artistName:n.artistName,gameOptions:n.gameOptions}):n.error?Object(r.jsx)(W,{artistName:n.artistName,type:n.error.message}):u?Object(r.jsx)(V,{}):Object(r.jsx)(g,{appDispatch:c,setFormSubmitted:l})})};o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(Z,{})}),document.getElementById("root"))}],[[26,1,2]]]);
//# sourceMappingURL=main.1387e814.chunk.js.map