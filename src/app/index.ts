const worker = new Worker('./worker.ts')

const input = document.getElementById('input') as HTMLInputElement
const result = document.getElementById('result')!

input.addEventListener('input', () => {
  worker.postMessage(input.value)
})

worker.addEventListener('message', ({ data }) => {
  result.textContent = data.output
})
