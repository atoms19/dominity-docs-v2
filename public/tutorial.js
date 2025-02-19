import {
   a,
   b,
   button,
   derived,
   div,
   effect,
   h1,
   img,
   li,
   p,
   span,
   state,
   ul
} from "dominity";

export function counter() {
   let count = state(0);

   return button({ class: "btn" }, "the count is ", count).on(
      "click",
      () => (count.value += 1)
   );
}

export function dropdown({ isOpen }) {
   let open = state(isOpen || false);
   return div(
      button({ class: "btn" }, "menu dropdown").on("click", () => {
         open.value = !open.value;
      }),
      div(
         ul(
            li("menu item 1").css({ padding: "0.5rem" }),
            li("menu item 2").css({ padding: "0.5rem" }),
            li("menu item 3").css({ padding: "0.5rem" })
         ).css({
            listStyle: "none",
            margin: "0",
            padding: "0"
         })
      )
         .css({
            padding: "1rem",
            boxShadow: "0 0 5px rgba(0,0,0,0.5)",
            borderRadius: "4px",
            position: "absolute",
            background: "white",
            marginTop: "-1rem"
         })
         .showIf(open)
   ).css({
      position: "relative",
      zIndex: "100"
   });
}

export function githubCard({ name }) {
   let avatar = state("");
   let repoName = state("");
   let description = state("");

   effect(() => {
      fetch(`https://api.github.com/repos/${name}`, {
         mode: "cors"
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
         img({ src: avatar, height: "48", width: "48" }).css({
            borderRadius: "50%"
         })
      ).css({
         padding: "1rem"
      }),
      div(h1(repoName), p(description)).css({
         display: "flex",
         flexDirection: "column"
      })
   ).css({
      padding: "0.5rem 1rem",
      margin: "1rem",
      border: "2px solid var(--primary)",
      borderRadius: "4px",
      display: "flex"
   });
}

export function trafficLIghtComponent() {
   const trafficLights = ["red", "orange", "green"];
   let lightIndex = state(0);

   let light = derived(() => trafficLights[lightIndex.value]);
   let action = derived(() => {
      switch (light.value) {
         case "red":
            return "stop";
         case "green":
            return "go";
         case "orange":
            return "pause";
      }
   });
   const nextLight = () => {
      lightIndex.value = (lightIndex.value + 1) % trafficLights.length;
   };

   return div(
      button({ class: "btn" }, "next light").on("click", nextLight),
      p(b("light is ", light, "🚦")),
      p("you must ", action)
   );
}
