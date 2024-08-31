import { code, div, h1, h3, p } from "https://esm.sh/dominity@latest"
import { codeBlock, note } from "../dominityDocs.js"



export default function creatingComponents(){
    return div({class:'doc-layout'},
      h1('creating components')
      ,p('Components makes our work easier by allowing you to reuse parts of code ,in Dominity any function that returns Dominity element functions are considered a component')
    
    ,codeBlock(`
  function mycomponent(){
      return div(
        h1('heading'),
        h4('sub heading'),
        p('lorem ipsum dolor sit amet constrie skorn')
      )
  }
      `),
      "when calling the function ie component , it is added directly to body to add the component to another element you must pass the function as a parameter to it",
      codeBlock(`
  function searchfield(){
        return div(
              input({type:'search',placeholder:'search...'}),button("search")
        )
  }
        
  main(
  header(
  h1('woah woah'),
  searchfield()
  
  )
  
  )
  `),
  "as you can see just like elements you can composition components to make them children of other elements"
  ,
  "unlike react dominity doesnt actually have a fixed system of props or naming convention functions doesnt have to start with a capital letter for it to be a component and it just have to return dominity element functions "
  ,note('dominity elements can only return one element function at a time just like react jsx , fragments arent a thing so just wrap everything in a container element for time being ')
    ,
    h3('adding props and other logic'),
    p(` components can have their own logic data and props , props doesnt have any limitations they can be whatever you want to be passed into the function as arguments , you can have other elements passed in , again its totally upto you what you do with it theres no limitation for props nor a system `)
,codeBlock(`
    
function code(codeTxt){
    return pre(
    code({class:'code-dark'},codeTxt)
)

}


function note({type},...children){
    let background='var(--primary)'

    switch (type){
    case 'danger':
        background='var(--red-500)'
        break
    case 'success':
        background='var(--green-500)'
        break
    }

    return div({class:'note-block'},
        h1('note:',type)
        ...children  
        ).css("background",background)

}

note({type:'success'},
"very insanely useful code",
    code(\`print('hello world')\`)
)
    

`) 
,note(
'very useful code',
codeBlock(`print('hello world')`)
).css({
    background:'#abdea095',
    color:'#044e30',
    borderColor:'#044e30'
})

)}

  