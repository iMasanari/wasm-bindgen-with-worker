import { greet } from '../wasm/lib.rs'

addEventListener('message', ({ data }) => {
  const result = greet(data)

  postMessage(result)
})
