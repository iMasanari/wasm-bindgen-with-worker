import wasmWorker from './wasmWorker'

const worker = new Worker('../worker/index.ts')
const action = wasmWorker<string, string>(worker)

const input = document.getElementById('input') as HTMLInputElement
const result = document.getElementById('result')!

const greed = async () => {
  result.textContent = await action(input.value)
}

input.addEventListener('input', greed)

// 初期処理
greed()
