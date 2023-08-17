
const pauseFunction = async (timeOut = 100) => {
  await new Promise((resolve) => setTimeout(resolve, timeOut));
}

export default pauseFunction;