(this.webpackJsonpreactapp=this.webpackJsonpreactapp||[]).push([[0],{24:function(e,t,n){},53:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),s=n(6),r=n.n(s),i=(n(24),n(12)),o=n.n(i),u=n(18),l=n(19),p=n(13),d=(n(51),n(52),n(53),n(4));var h=function(){var e,t=Object(c.useState)([]),n=Object(l.a)(t,2),a=n[0],s=n[1];return Object(c.useEffect)((function(){function e(){return(e=Object(u.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://127.0.0.1:8000/api/consultant/");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,console.log(n),s(n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}(),console.log(window.sessionStorage.getItem("user"))}),[]),Object(d.jsx)("div",{className:"App",children:Object(d.jsx)("header",{className:"App-header",children:Object(d.jsx)("div",{className:"ag-theme-alpine",style:{width:"100%",height:"1000px"},children:Object(d.jsx)(p.AgGridReact,{rowData:a,children:a&&a.length>0&&(null===(e=Object.keys(a[0]))||void 0===e?void 0:e.map((function(e){return Object(d.jsx)(p.AgGridColumn,{field:e,pinned:"id"===e||"consultant_name"===e?"left":null})})))})})})})},j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,56)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))};r.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(h,{})}),document.getElementById("root")),j()}},[[55,1,2]]]);
//# sourceMappingURL=main.chunk.js.map