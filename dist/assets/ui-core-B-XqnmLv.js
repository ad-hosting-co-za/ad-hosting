import{c as O}from"./vendor-DOw0iJrS.js";const m=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,y=O,j=(e,l)=>n=>{var u;if((l==null?void 0:l.variants)==null)return y(e,n==null?void 0:n.class,n==null?void 0:n.className);const{variants:r,defaultVariants:d}=l,V=Object.keys(r).map(t=>{const a=n==null?void 0:n[t],s=d==null?void 0:d[t];if(a===null)return null;const i=m(a)||m(s);return r[t][i]}),v=n&&Object.entries(n).reduce((t,a)=>{let[s,i]=a;return i===void 0||(t[s]=i),t},{}),N=l==null||(u=l.compoundVariants)===null||u===void 0?void 0:u.reduce((t,a)=>{let{class:s,className:i,...f}=a;return Object.entries(f).every(C=>{let[c,o]=C;return Array.isArray(o)?o.includes({...d,...v}[c]):{...d,...v}[c]===o})?[...t,s,i]:t},[]);return y(e,V,N,n==null?void 0:n.class,n==null?void 0:n.className)};export{j as c};
