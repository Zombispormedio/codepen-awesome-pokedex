import React from "react"
import { render } from "react-dom"
import { App } from "./app"

navigator.serviceWorker.register(process.env.SW_PATH)

render(<App />, document.getElementById("root"))
