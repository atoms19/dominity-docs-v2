import {
    div,
    p,
    h1,
    h3,
    button, 
    strong,
    br,
  } from "https://esm.sh/dominity@latest";
  import { codeBlock } from "../dominityDocs.js";
  

export default function getStarted(r) {
    return div(
      { class: "doc-layout" },
      h1("getting started"),
      p(
        `getting started with dominity is really simple theres no setup build setup or anything just pop in the cdn and you are good to go`
      ),
      codeBlock(`<script type='module' src='https://[cdn]/dist/dominityWindow.js'></script> <!--for development-->
  
  <script type='module' src='https://[cdn]/dist/dominityWindow.min.js'></script> <!--for production-->
  `)
        .css("margin", "1rem")
        .css("padding-top", "0"),
      p(
        "when u are building the app use the cdn for development as it includes comments for each methods etc and some dev utilities but while publishing the app please do change the cdn to production one as its more smaller and will help for smaller load times  "
      ),
      h3("installing"),
      `if cdns arent your thing then just install the Dominity js file and add it to your project and start using dominity in your js modules directly`,
      codeBlock(`import {p} from 'https://esm.sh/dominity@latest'
  
  p("hello world")
      `),
     r.Link({href:'/home'},button("click here to install", { class: "btn" })),
      h3("html starter template"),
      codeBlock(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dominity app</title>
  </head>
  <body>
      
  
      
      <script type="module">
          import D from 'https://esm.sh/dominity@latest'
  
          D.h1("hello world")
      </script>
  </body>
  </html>`),
      h3("speacial versions"),
      "listed below are speacial versions of dominity",
      br(),
      strong("window version"),
      "   this version exposes all the methods,objects and functions imported by normal dominity to the window object as an object named D this is useful if you are lazy to import dominity methods and functions in each component you make",
      codeBlock(
        `<script src='https://cdn/dominityWindow.js'></script> <!--use min js for productin-->`
      )
    );
  }