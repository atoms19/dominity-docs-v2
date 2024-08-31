import { div, h1, p,a, h2, h3, h5 } from "https://esm.sh/dominity@latest";
import { codeBlock } from "../dominityDocs.js";

export default function reactivityStates(){
    return div({class:'doc-layout'},
        h1('working with states')
        ,p('states are reactive values that are powered by signals , just like useState in react but theres a big difference they arent tied to their component they can be anywhere you can export these states between components , youll never have to worry about prop drilling to get a state through , they are very efficient and fast as they are build on top of  ',a({href:'https://github.com/preactjs/signals'},'preact signals'))
,codeBlock(`
import {state} form './dominity.js'

let name=state('yshal')
let likes=state(0)
`),
"any data that changes in your component that affects its rendering is recommended to be wrapped with the state() function to be changed into a state"
,h3('getting and setting values of states'),
"values of state is accessed by the .value property and state's value is set by setting .value propery ",
codeBlock(`
let likes=state(23)

console.log(likes.value) //outputs 23

likes.value=29 //sets states value to 29 
console.log(likes.value) //outputs 29
`),
h3('effects'),
'effects are user defined functions that re-runs every time a state changes , it works like magic ,for example in our above example we console logs the value every time its value changes we could do the same with an effect and avoid redundancy'    
,codeBlock(`import {state,effect} from "./dominity.js"
let name=state('shyam')

effect(()=>{
console.log(name.value)
})

name.value='musfar'  //upon setting this value it automattically runs the effect and console.logs the current value ie 'musfar'

`),"just like useEffect in react function returned by the userdefined function is used as a cleanup function "
,h3('derived'),
"sometimes you want other states that are dependant on another states this is where derived comes in they allow you to derive a state from another state ",
codeBlock(` import {derived,state} from "./dominity.js"
let count=state(0)
let doubledCount=derived(()=>{
    return count.value*2
})

count.value=10 //doubledCount automatically gets sets to be 2x10 ie 20
`),
"return value of the function passed in considered as the value of the derived state , also a state can be derived from multiple other states too "
,h3('displaying states in elements'),
"we can get states to be displayed with an arrow function in dominity elements "
,codeBlock(`
let time=state(0)

h1(()=>\`the time is \${time.value}\`)


setInterval(()=>{
    time.value+=1
},1000)
`),"the component will automatically update the text as the value of time changes every second"
,h5('better method'),
"altho the above method of adding reactive text does have its usecases the easier way to do this also provided by dominity which is passing in the state seperately as a parameter, this is easier as u wont need to explicitly get value "
,codeBlock(`
    let time=state(0)
    
    h1("the time is ",time)
    
    
    setInterval(()=>{
        time.value+=1
    },1000)
    `)
)}