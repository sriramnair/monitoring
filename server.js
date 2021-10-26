
const express = require('express')
const path = require('path')
const rollBar = require('rollbar')

let rollbar = new rollBar({
    accessToken: 'ab4255df660648819bae1a8947eb2949',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()


console.log(__dirname, path)
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollBar.info('html file served successfully')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))