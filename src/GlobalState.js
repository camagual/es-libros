const testState = { needsLogin: true }

const serverRenderedState = window.__PRELOADED_STATE__
console.log(JSON.stringify(serverRenderedState))

if (serverRenderedState)
  module.exports = serverRenderedState
else
  module.exports = testState
