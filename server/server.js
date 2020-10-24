const express = require('express')
const app = express()

app.get('/', (req, res) => {
  let body = {
      request_headers: req.headers
  }
  res.send(body)
})

app.listen(process.env.SERVER_PUBLISHED_PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.SERVER_PUBLISHED_PORT}`)
})