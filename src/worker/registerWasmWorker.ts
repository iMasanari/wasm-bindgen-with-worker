const INIT_KEY = 0

export default <Payload, Result>(action: (payload: Payload) => Result) => {
  addEventListener('message', ({ data }) => {
    const result = data.key === INIT_KEY ? data : {
      key: data.key,
      payload: action(data.payload),
    }
    
    postMessage(result)
  })

  postMessage({ key: INIT_KEY })
}
