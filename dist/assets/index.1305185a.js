import{R as e,D as f,C as c,B as d,I as E,a as y,S as g,b as h}from"./vendor.cd7ee9da.js";const v=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}};v();async function p(l,r,n){let a={method:n!=null?n:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json;charset=utf-8"}};return n==="POST"&&(a.body=JSON.stringify(r)),await(await fetch(document.baseURI+l,a)).json()}function S({users:l,useData:r}){return e.createElement("div",null,e.createElement(f,{value:l,responsiveLayout:"scroll"},e.createElement(c,{style:{color:"#57575766"},header:"Avatar",body:n=>e.createElement("img",{src:n.avatar_url,style:{width:"60px",color:"#57575766"}})}),e.createElement(c,{header:e.createElement("div",{style:{color:"#57575766"}},"UserName"),body:n=>{var a;return e.createElement("var",null,(a=n.name)!=null?a:"null")}}),e.createElement(c,{style:{color:"#57575766"},header:"Repo",body:n=>e.createElement(d,{className:"p-button-warning",label:"repo",onClick:()=>r(n)})})))}function b({login:l}){const[r,n]=e.useState(),[a,t]=e.useState([]),[s,o]=e.useState([]),u=i=>{o(i.filter(m=>{if(r&&m.name.search(r)!==-1)return m;if(!r)return m}))};return e.useEffect(()=>{p("repo",{login:l},"POST").then(i=>{u(i),t(i)})},[l]),e.createElement("div",null,e.createElement(f,{value:s,header:e.createElement("span",{className:"p-float-label",style:{width:"90%",marginLeft:"10%"}},e.createElement(E,{id:"in",style:{width:"90%"},value:r,onChange:i=>{n(i.target.value),u(a)}}),e.createElement("label",{htmlFor:"in"},"Search for users Repositories")),responsiveLayout:"scroll"},e.createElement(c,{header:"RepoName",body:i=>e.createElement("var",null,i.name)}),e.createElement(c,{header:"Info",body:i=>e.createElement("div",{style:{display:"flex",flexDirection:"column",fontSize:"14px"}},e.createElement("var",null,i.forks," Forks"),e.createElement("var",null,i.stars," Stars"))})))}function w({data:l}){var n,a,t;const r=s=>{if(s)return s.split("T")[0]};return e.createElement(e.Fragment,null,l&&e.createElement("div",{style:{display:"flex",flexDirection:"row"}},e.createElement("img",{src:l.avatar_url,style:{width:"160px",height:"120px"}}),e.createElement("div",{style:{flexDirection:"column",marginLeft:"5%"}},e.createElement("div",null,"name: ",(n=l.name)!=null?n:"null"),e.createElement("div",null,"email: ",(a=l.email)!=null?a:"null"),e.createElement("div",null,"location: ",(t=l.location)!=null?t:"null"),e.createElement("div",null,"join date: ",r(l.created_at)),e.createElement("div",null,"folowers: ",l.followers),e.createElement("div",null,"folowing: ",l.following))))}const L=({useData:l})=>{const[r,n]=e.useState(),[a,t]=e.useState([]),s=()=>{p("users",{name:r},"POST").then(o=>{o&&o.login&&!a.find(u=>u.login===o.login&&!0)&&(localStorage.setItem("users",JSON.stringify([...a,o])),t([...a,o]))})};return e.useEffect(()=>{let o=localStorage.getItem("users");o&&o!==null&&t(JSON.parse(o))},[]),e.createElement(e.Fragment,null,e.createElement("div",{style:{width:"80%",marginLeft:"35%",marginBottom:"5%"}},"Github searcher"),e.createElement("div",{style:{display:"flex",flexDirection:"row"}},e.createElement("span",{className:"p-float-label",style:{width:"80%",marginLeft:"10%"}},e.createElement(E,{id:"in",style:{width:"90%"},value:r,onChange:o=>n(o.target.value)}),e.createElement("label",{htmlFor:"in"},"Search for Users")),e.createElement(d,{icon:"pi pi-search",onClick:()=>s()})),e.createElement(S,{users:a,useData:l}))},x=({userData:l})=>e.createElement(e.Fragment,null,e.createElement("div",{style:{marginLeft:"35%",marginBottom:"5%"}},"Github searcher"),e.createElement(w,{data:l}),e.createElement(b,{login:l.login})),D=()=>{const[l,r]=e.useState({});return e.createElement(g,{style:{height:"100%"}},e.createElement(h,null,e.createElement(L,{useData:r})),e.createElement(h,null,e.createElement(x,{userData:l})))};y.render(e.createElement(D,null),document.querySelector(".root"));