import{s as p,h as l,o as f}from"../chunks/scheduler.cd2d310a.js";import{S as u,i as g}from"../chunks/index.bc6dd192.js";import{p as h}from"../chunks/stores.439da365.js";import{j as k}from"../chunks/singletons.e6de1a6e.js";import{d as T}from"../chunks/dayjs.min.a35c91f3.js";import{u as d,a as S}from"../chunks/hooks.client.46f5bdbb.js";const c=k("goto");function y(t,n,i){let s;return l(t,h,o=>i(0,s=o)),f(async()=>{const o=s.url.searchParams.get("code"),m=localStorage.getItem("code_verifier")??"";await fetch("/login/callback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:o,codeVerifier:m})}).then(e=>e.json()).then(e=>{if(e!=null&&e.error){c("/login/error");return}const r=T().valueOf(),a={accessToken:{token:e.accessToken,timestamp:r},refreshToken:{token:e.refreshToken,timestamp:r}};d(a),S.set(a),c("/home")})}),[]}class $ extends u{constructor(n){super(),g(this,n,y,null,p,{})}}export{$ as component};
