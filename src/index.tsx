import { StrictMode } from "react"
import { render } from "react-dom"
import "./index.scss"
import App from "./App"

import { register } from "./serviceWorkerRegistration"

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
)

register()
