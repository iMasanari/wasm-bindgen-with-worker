let messageIndexs = 0
const INIT_KEY = 0

const createWorkerPromise = <Result>(worker: Worker, key: number) =>
  new Promise<Result>((resolve) => {
    const listener = ({ data }: MessageEvent) => {
      if (data.key === key) {
        resolve(data.payload)
        worker.removeEventListener('message', listener)
      }
    }

    worker.addEventListener('message', listener)
  })

export default <Payload, Result>(worker: Worker) => {
  const initalize = createWorkerPromise<void>(worker, INIT_KEY)

  worker.postMessage({ key: INIT_KEY })

  return (payload: Payload) => {
    const key = ++messageIndexs

    initalize.then(() =>
      worker.postMessage({ key, payload })
    )

    return createWorkerPromise<Result>(worker, key)
  }
}
