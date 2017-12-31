import { pipe } from "ramda"
import { Root } from "./pages"
import { withStore } from "./store"
import { withGlobalStyles, withServiceWorker } from "./lib"

export const App = pipe(withServiceWorker, withGlobalStyles, withStore)(Root)
