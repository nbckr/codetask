const express = require('express')

const app = express()
const port = process.env.PORT || 3003
const router = express.Router()

app.use(express.static(`${__dirname}/dist`)) // set the static files location for the static html

app.engine('.html', require('ejs').renderFile)

app.set('views', `${__dirname}/dist`)

router.get('/*', (req, res, next) => {
  console.log(process.env)
  console.log(process.env.FIREBASE_API_KEY)

  res.sendFile(`${__dirname}/dist/index.html`)
})

app.use('/', router)

app.listen(port)
console.log('App running on port', port)
console.log('something: ', process.env.SOMETHING)
console.log('key: ', process.env.FIREBASE_API_KEY)
