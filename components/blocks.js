import { code, div, h3, p, pre } from "../dominity.manyin.js";

export function codeBlock(coe) {
    return pre({ class: "code" }, code(coe, { class: "code-aside" }));
 }
 
 

 export function note(...args) {
    return div(h3("note:"), p(...args)).css({
       padding: "0.5rem 3rem",
       paddingLeft: "0.5rem",
       margin: "1rem 0rem",
       borderRadius: "4px",
       background: "#c37be94a",
       color: "#661d8c",
       borderLeft: "4px solid #661d8c",
    });
 }

