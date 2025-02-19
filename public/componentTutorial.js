import {
   div,
   h1,
   h3,
   p,
   state,
   button,
   img,
   effect,
   h2,
   derived,
   DominityReactive,
   code,
   span,
   b,
   ul,
   label,
   li,
   input,
   form
} from "dominity";
import { codeBlock } from "../components/blocks";
import {
   counter,
   dropdown,
   githubCard,
   trafficLIghtComponent
} from "../components/tutorial";

export default function componentTutorial() {
   return div(
      { class: "doc-layout" },
      h1("lets make some components"),
      p(
         "finally its time to chill lets start by making some cool components using the stuff we have learnt "
      ),
      h3("counter"),
      p(
         "a counter is pretty simple to make all it needs is a count state to keep track off the count and to increment that state on press event "
      ),
      codeBlock(`import {button,state} from "./dominity.js"
export function counter(){
    let count=state(0)

    return button("the count is ",count).on("click",()=>count.value+=1)

}
    `),
      div(counter()).css({
         width: "100%",
         display: "flex",
         justifyContent: "center"
      }),
      h3("dropdown"),
      p(
         "this dropdown uses states and attributes to hide and show the elment , we will see how its done with helper methods in the next chapter"
      ),
      codeBlock(`
function dropdown({isOpen}){
    let open=state(isOpen||false)
    let hideClass=derived(()=>open.value?'hide':'') //.hide class has to exist in a css file that sets display:none
    return div(
        button({class:'btn'},'menu dropdown').on("click",()=>open.value!=open.value)
        div({class:hideClass},
            ul(
                li("menu item 1"),
                li("menu item 2"),
                li("menu item 3")
            )
        
        )
        )
}        
        
`),
      div(dropdown({ isOpen: false })).css({
         width: "100%",
         display: "flex",
         justifyContent: "center"
      }),
      h3("github repo list component"),
      p(
         "this component is slightly more demanding as it fetches data provided to it , effect is run when the component is mounted , in this compoent we fetch the data and sets it to the states and component data updates "
      ),
      codeBlock(`function githubCard({ name }) {
  let avatar = state("");
  let repoName = state("");
  let description = state("");

  effect(() => {
    fetch(\`https://api.github.com/repos/\${name}\`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        avatar.value = data.owner.avatar_url;
        repoName.value = data.full_name;
        description.value = data.description;
      });
  });

  return div(
    div(
      img({ height: "48", width: "48" ,src:avatar }), //passing in a state directly without calling .value makes it a automatically reactive 
    div(h1(repoName), p(description))
  )
}
  
githubCard({ name: "atoms19/dominity.js" })
  
`),
      githubCard({ name: "atoms19/dominity.js" }),
      h3("traffic lights"),
      p(
         "this is an implementation of traffic lights wihtout using helper methods we will learn about helper methods in next chapter and make this same example easy ,here we are using derived to get actions"
      ),
      codeBlock(`

function trafficLIghtComponent(){
    const trafficLights = ["red", "orange", "green"];
    let lightIndex =state(0);

    let light=derived(()=>trafficLights[lightIndex.value]);

    let action=derived(()=>{
        switch(light.value){
            case "red":
                return "stop"
            case "green":
                return "go"
            case "orange":
                return "pause"
        }

    })

    const nextLight=()=> {
        lightIndex.value = (lightIndex.value + 1) % trafficLights.length;
        }

    return div(
        button("next light").on('click',nextLight),
        p("light is ",light),
        p("you must ",action)
    
    )
}
`),
      trafficLIghtComponent(),

      h3("todo list "),
      codeBlock(`
function todoList() {
   let todos = state([]);
   let todoName = state("");

   return form(
      label(span("add todo"), input().model(todoName)),
      button("submit"),
      ul().forEvery(todos, (t) => li(t))
   ).on("submit", () => {
      todos.value = [...todos.value, todoName.value];
      todoName.value = "";
   });
}`),
      todoList()
   );
}

function todoList() {
   let todos = state([]);
   let todoName = state("");

   return form(
      label(span("add todo"), input().model(todoName)),
      button("submit"),
      ul().forEvery(todos, (t) => li(t))
   ).on("submit", (e) => {
      e.preventDefault();
      todos.value = [...todos.value, todoName.value];
      todoName.value = "";
   });
}
