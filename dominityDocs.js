import {
  state,
  div,
  main,
  nav,
  p,
  b,
  iframe,
  img,
  a,
  h1,
  h2,
  h3,
  footer,
  button,
  pre,
  code,
  derived,
  small,
  ul,
  li,
  span,
  DominityRouter,
  aside,
  strong,
  br,
  
} from "./dominity.js";

import { $el, lazy } from "./dominity.js";
let r = new DominityRouter();
r.onLoad=()=>{
    hljs.highlightAll()
}
r.setRoutes({
  "/home": {
    component: Home(),
    isDefault:true  
  },
  "/docs/gettingStarted": {
    getComponent:lazy('/getStarted.js'),
    layout(s){
        return docLayout({pos:1},s)
    }
    },
  "/docs/creatingElements": {
    getComponent:lazy('/creatingElements.js'),
    layout(s){
        return docLayout({pos:2},s)
    }
  },
  "/docs/creatingComponents":{
    getComponent:lazy('./creatingComponents.js'),
    layout(s){
      return docLayout({pos:3},s)
    }
  },
  "/docs/reactivityStates":{
    getComponent:lazy('./reactivityStates.js'),
    layout(s){
      return docLayout({pos:4},s)
    }
  },
  "/docs/componentTutorial":{
    getComponent:lazy('./componentTutorial.js'),
    layout(s){
      return docLayout({pos:5},s)
    }
  },
  "/docs/renderingLists":{
    
    getComponent:lazy('./renderingLists.js'),
    layout(s){
      return docLayout({pos:6},s)
    }
  }
  
});


let sideBarshow=state(false)

r.start(document.body);
function docSideNav(pos) {
  return aside(
    ul(
      { class: "sidenav" },
      li(r.Link({ href: "/docs/gettingStarted" }, "getting started")),
      li(r.Link({ href: "/docs/creatingElements" }, "creating elements")),
      li(r.Link({href:'/docs/creatingComponents'},"creating components")),
      li(r.Link({href:'/docs/reactivityStates'},"reactivity with states")),
      li(r.Link({href:'/docs/componentTutorial'},'tutorial on components')),
      li(r.Link({href:'/docs/renderingLists'},"helper methods")),
      li(a("routing")),
      li(a("route layouts and queries")),
      li(a("routing setups in servers"))
    ).withRef(ul=>{
      ul.children[pos-1].classList.add('active')
    })
  );
}

function Home() {
  return div(
    { class: "app home" },
    navbar(),
    main(
      { class: "hero block-snap" },
      div(
        { class: "title-box " },

        img({ src: "./Dominity.svg", width: 100, height: 150 }),
        h1("Dominity js"),
        p("minimalist frontend framework"),
        div(
          { class: "star-box" },
          iframe({
            class: "",
            src: "https://ghbtns.com/github-btn.html?user=atoms19&repo=dominity.js&type=star&count=true",
            frameborder: "0",
            scrolling: "0",
            width: "80",
            height: "20",
            title: "GitHub",
          })
        ),
        div(
          r
            .Link(
              { href: "/docs/gettingStarted" },
              button("get started", { class: "btn" })
            )
            .on("click", (e) => {}),
          button("install", { class: "btn outlined" })
        ).css({
          display: "flex",
        })
      ),

      pre(
        code(`let count = state(0);

function increment() {
  count.value += 1;
}

 div(
     span("the count is :", count), 
     button("add count").on("click",increment)
    );
`).css({
  marginTop:'3rem'
})
      )
    ),
    textShowcase(),

    div(
      h3(`what's dominity`),
      p(
        `
    Dominity is a framework for getting a fast SPA up in a static file hosting service (githubpages ,vercel ,etc),
it handles the rest of the stuff like`,
        b("routing,components"),
        "&",
        b("states"),
        ` on the client side
meanwhile giving you a build tool free development experience`
      ),
      { class: "wrap" }
    ),
    div(
      { class: "block-snap" },
      div(
        h3("use states to manage data efficiently"),
        div(
          "dominity has a powerful reactivity system at its core capable of updating elements and other dependend code whenver its values changes"
        ),
        p(
          "reactive states built with ",
          a("preact signals", {
            href: "https://github.com/preactjs/signals",
          })
        ),

        ul(
          { class: "showcase-list" },
          li(
            b(" state()", { class: "tag" }),
            span("- to declare a reactive state ")
          ),
          li(
            b(" derived()", { class: "tag" }),
            span(
              "- to declare a reactive state thats derived from another state"
            )
          ),
          li(
            b(" effect()", { class: "tag" }),
            span(
              "- to run a function that automatically reruns when its dependend states change"
            )
          )
        )
      ).css({
        marginRight: "1rem",
      }),
      codeBlock(`
let count= state(0)
let doubled= derived(()=>count*2)

console.log(count.value) //outputs 0


count.value= 5 //sets count value to 5 
console.log(double.value) //outputs 10

        `)
    ).css({ display: "flex", alignItems: "", marginTop: "2rem" }),

    div(
      { class: "block-snap" },
      div(
        h3("easily bind data from elements to states"),
        div("dominity elements can easily be linked with its states "),
        ul(
          { class: "showcase-list" },
          li(
            b(".model()", { class: "tag" }),
            span(
              "- 2 way databinding between input fields and state (throttle and debounce too) "
            )
          ),
          li(
            b(".showIf()", { class: "tag" }),
            span("- conditional rendering depending on truthiness of a state")
          ),
          li(
            b(".forEvery()", { class: "tag" }),
            span(
              "- to loop through a iterable state and create elements for it"
            )
          ),
          li(
            b(".withRef()", { class: "tag" }),
            span(
              "- run a fuunction that operates with the elements ref directly while building it"
            )
          )
        )
      ).css({
        marginRight: "1rem",
      }),
      codeBlock(`
let todos= state(['eat','sleep','code'])
let search= state('')

let searchedTodos= derived(()=>{
    return todos.value.filter(t=>t.startsWith(search.value))}
    ))

 div(
     input({type:'search',placeholder:'search todos'}).model(search),

     ul().forEvery(todos,todo=>todoItem(todo))
)

function todoItem(itemName){
    return  div(
         input({type:'checkbox'}),
         span(itemName),
         button('x')
    )

}

        `)
    ).css({ display: "flex", alignItems: "", marginTop: "2rem" }),

    div(
      { class: "block-snap" },
      div(
        h3("easily route across all the pages"),
        div(
          "dominity has an inbuilt router to handle all the routing related stuff "
        ),
        ul(
          { class: "showcase-list" },
          li(
            b("router.Link()", { class: "tag" }),
            span("- anchor tag equivalent for clientside routing ")
          ),
          li(
            b("router.queries", { class: "tag" }),
            span("- gets all the search params as a neat object")
          ),
          li(
            b("router.routeTo()", { class: "tag" }),
            span("- routes to a new path ")
          )
        )
      ).css({
        marginRight: "1rem",
      }),
      codeBlock(`
let router= new DominityRouter()
router.setRoutes({
  '/about':{
      component:about()
  },
  '/movie':{
      component:movie()
  }
})    
router.start()  //initialises it 


function movie(){
    let movieID=router.queries.q //easily get search queries ?q
    return  h1('you are watching ',movieId),
              

}

        `)
    ).css({ display: "flex", alignItems: "", marginTop: "2rem" }),

    Footer()
  );
}

function counterBtn() {
  let count = state(0);

  return button({ class: "btn outlined" }, "count :", count).on(
    "click",
    () => (count.value += 1)
  );
}

export function codeBlock(coe) {
  return pre({ class: "code" }, code(coe, { class: "code-aside" }));
}

function textShowcase() {
  let ads = [
    "Reusable components with ease",
    "Reactive states based on signals",
    "SPA routing",
    "Host anywhere",
    "learn in minutes,create powerful SPAs",
    "no build step",
    "just 15kb",
    "thats Dominity",
  ];
  let index = state(0);
  let text = derived(() => state(ads[index]));

  let interval = setInterval(() => {
    index.value += 1;
    ref.animate(
      {
        transform: ["translateY(-100%)", "translateY(0%)"],
        opacity: ["0", "1"],
      },
      0.2,
      "ease-in"
    );
    if (index.value == ads.length - 1) clearInterval(interval);
  }, 2500);

  let ref = div(h2(text)).css({
    margin: "3rem 2rem",

    textAlign: "center",
  });
  return ref;
}



function navbar() {
  return nav(
    div(r.Link({href:'/home'},"dominity.js")),
div({class:'menu-btn'}).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>`).on("click",()=>{

 $el('.sidenav').elem.classList.toggle('visible')

 
}),  
    div(
      
      a("github", { href: "#" }),
      a("docs", { href: "#" }),
      a("expamples", { href: "#" }),
      a("repl", { href: "#" })
    ),
    { class: "navbar" }
  );
}

function Footer() {
  let hid = state(false);
  return footer(
    { class: "footer" },

    div(
      { class: "block-snap" },
      p("built with ❤️ by atoms19"),

      div("i am not hidden ").showIf(hid),
      button({ class: "btn" }, "unhide/hide").on("click", () => {
        hid.value = !hid.value;
      })
    )
  );
}



function docLayout({pos},content) {
  return div(
    navbar(),
    div({ class: "app" }, div({ class: "layout" }, docSideNav(pos), content))
  );
}

export function note(...args){
  return div(
    h3("note:"),
    p(...args)
    ).css({
      padding:'0.5rem 3rem',
      paddingLeft:'0.5rem',
      margin:'1rem 0rem',
      borderRadius:'4px',
      background:'#c37be94a',
      color:'#661d8c',
      borderLeft:'4px solid #661d8c'
    })
}

//docs---------------------------------------



