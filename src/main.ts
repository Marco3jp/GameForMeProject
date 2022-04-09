import * as PIXI from 'pixi.js'

const root = document.querySelector<HTMLDivElement>('#app')!
const pixiApp = new PIXI.Application({ width: 640, height: 360 })

root.innerHTML = `
  <h1>Hello Vite x Pixi.js!</h1>
`

root.appendChild(pixiApp.view)

const pixiGreetingText = new PIXI.Text("Hello, I'm Pixi.js", {
    fill: "#4DB6AC"
})

pixiApp.stage.addChild(pixiGreetingText)