import { div, h1, li,h3, p,state, ul, code, input } from "./dominity.js";
import { codeBlock, note } from "./dominityDocs.js";

export default function renderingLists(){
    return div(
        {class:'doc-layout'},
        h1('helper methods in dominity'),
        p('helper methods are methods that u chain to element to get something done , they make development so much easier and they are useful for many things like'),

        ul(
        li('rendering a component/element for each list item'),
        li('hiding and showing components/elements'),
        li('2 way data binding of values of input and data in forms'),
        li('getting reference of the element or doing smthn with the reference '),
        li('animating elements'),
        "and way more ... lets get to know some helper methods one by one ",
        note('we already know about .on() and .css()  which are helper methods too')
        ),
        h3("showIf method"),
        p("show if method is used to hide or show an element using css depending on wether a state or condition based on the state is truthy or not")
        ,codeBlock(`let showMenu=state(true)
div({class:'menu'},...).showIf(showMenu)

div({class:"menu-2"},...).showIf(()=>!showMenu)
            `),
            h3("forEvery method")
            ,p("this method is used to render a component for an iterable state ")
    ,codeBlock(`let tasks=state(['eat chapati','find curry','leave india'])
ul().forEvery(tasks,task=>taskItem(task))

function taskItem(t){
    return li(t)
}
        `),
        h3('html method')
        ,"used to set innerHtml of an element",
        codeBlock(`button().html(\`<svg....>\`)            
p().html(\`i am cool block <b>wow</b>\`)
`),
h3('model method'),
"used to model value of an input to a state , it binds the value to the provided state ie when input updates the value of the state also changes and also vice versa , it works for checkboxes , select text inputs text areas etc"
,codeBlock(`let username=state('')
    
input({type:'text'}).model(username) //value of input is reflected to username

//to show that username state changes along with value of input lets display it
h3(username)
`),usernameExample(),h3('storing references with giveRef method'),"giveRef  method shares the elements reference to a state and sets that state's value to the reference this allows you to do various actions with these elements later even in another files as these states can be exproted "
 ,codeBlock(`
let downloadButton=state()

    div(
        h3({}....),
        section(
            div(
                button().giveRef(downloadBUtton)
            )
        )
    )

    //now u can work on the thing out of the component tree and do whatever u want with button
    
    `)
)
}

function usernameExample(){
    let username=state('')
    
return div(input({type:'text'}).model(username) //value of input is reflected to username
,
//to show that username state changes along with value of input lets display it
h3(username))
}