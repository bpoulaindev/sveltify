import{s as x,f as u,l as h,a as C,g as d,h as v,m as g,d as m,c as S,i as _,A as E,n as $,E as b,C as q}from"../chunks/scheduler.e427dfb5.js";import{S as y,i as A}from"../chunks/index.51bba90f.js";import{p as H}from"../chunks/stores.14b5174e.js";function P(i){var f;let a,s=i[0].status+"",r,o,n,p=((f=i[0].error)==null?void 0:f.message)+"",c;return{c(){a=u("h1"),r=h(s),o=C(),n=u("p"),c=h(p)},l(e){a=d(e,"H1",{});var t=v(a);r=g(t,s),t.forEach(m),o=S(e),n=d(e,"P",{});var l=v(n);c=g(l,p),l.forEach(m)},m(e,t){_(e,a,t),E(a,r),_(e,o,t),_(e,n,t),E(n,c)},p(e,[t]){var l;t&1&&s!==(s=e[0].status+"")&&$(r,s),t&1&&p!==(p=((l=e[0].error)==null?void 0:l.message)+"")&&$(c,p)},i:b,o:b,d(e){e&&(m(a),m(o),m(n))}}}function j(i,a,s){let r;return q(i,H,o=>s(0,r=o)),[r]}class B extends y{constructor(a){super(),A(this,a,j,P,x,{})}}export{B as component};
