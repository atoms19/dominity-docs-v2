import { b, button, div, h1, h3, li, p, span, ul } from "./dominity.js";
import { codeBlock, note } from "../dominityDocs.js";




export default function creatingElements() {
    return div(
      { class: "doc-layout" },
      h1("creating elements"),
      p(
        "dominity elements are functions that are simple to use , they behave almost exactly like a normal html elment would and is pretty much self explanatory ",
        codeBlock(`
  import {h1,span} from "./dominity.js"
  
  /*<h1> hello <span>world</span> </h1>*/
  h2("hello",span("world"))
                  `),
        "dominity element functions treat the values or literals passed in to it as arguments differently depending on their data type "
      ),
      ul(
        { class: "showcase-list" },
        li(
          b(" string", { class: "tag" }),
          span("- string passed in considered as textnode inside element ")
        ),
        li(
          b(" other dominity element functions", { class: "tag" }),
          span("- treated as child Nodes ")
        ),
        li(
          b(" objects with key value pairs", { class: "tag" }),
          span("- treated as attributes for the element")
        ),
        li(
          b("functions that returns strings or template literals ", {
            class: "tag",
          }),
          span(
            "- text nodes that will be updated if state values inside template litteral changes"
          )
        ),
        li(
          b("directly passing in reactive states ", { class: "tag" }),
          span("- textnodes that will be updated based on state")
        )
      ),
      h3("examples"),
      codeBlock(`
  ul({class:'menu-list'},
      li('list item 1'),
      li('list item 2'),
      li('list item 3')
  )
  
  input({type:'text', placeholder:'enter your name' ,'aria-label':'form-input'})
  
  main(
  h1('interesting facts'),
  'humans are evolved from monkeys or are they',
  {class:'fact-box'} //you can declare attributes whereever you want within the component theres no importance to order
  )
                              
                              `),
      h3("adding events to elements"),
      "one of the main reasons we bring our html elements to js is to attach eventListeners to it , in dominity its super easy to attach events cause they are done inline with the element with the .on() method",
      codeBlock(`import {main,h1,button} from './dominity.js'
  main(
  h1('press the button to alert')
  button('press me').on('click',(e)=>{
      alert('button pressed')
      console.log(e) //you can access the event just like with normal addEventListeners()
  })
  
  )                       `),
      "you just have to chain .on() method to a dominity element to add the event , you can even chain more .on() methods again to add multiple events",
      codeBlock(`
  button('click me').on('click',()=>alert('clicked')).on('keydown',()=>alert('pressed'))
                          `),
      button("click me")
        .on("click", () => alert("clicked"))
        .on("keydown", () => alert("pressed"))
    ,h3('adding inline like css to elements'),
    p('dominity has a method called .css() which allows you to directy add css to an element from js itself')
    ,codeBlock(`
button("click me").css({
    background:'var(--primary)',
    color:'white',
    borderRadius:'50px',
    padding:'1rem 3rem',
    fontSize:'1rem',
    border:'none'
})
        `)
        ,button("click me").css({
            background:'var(--primary)',
            color:'white',
            borderRadius:'50px',
            padding:'0.25rem 0.5rem',
            fontSize:'1rem',
            border:'none'
        })
        ,note('however pseudo classes and other things like :hover :after ,@media arent suppourted might be done in the future also its better to move css to a seperate file or use smthn like tailwind or synxia ')
    ,'you can also chain .css() with .on() and on ....');
  } 
  