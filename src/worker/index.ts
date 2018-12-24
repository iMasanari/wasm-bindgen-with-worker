import registerWasmWorker from './registerWasmWorker'
import { action } from '/wasm/lib.rs'

registerWasmWorker(action)
