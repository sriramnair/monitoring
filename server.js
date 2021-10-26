
const express = require('express')
const path = require('path')
const rollBar = require('rollbar')

let rollbar = new rollBar({
    accessToken: 'ab4255df660648819bae1a8947eb2949',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()


//console.log(__dirname, path)

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})


app.get('/style', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/styles.css'))
})

let students = []

app.post('/api/student', (req, res)=> {
    const {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentsName => studentsName === name)

    if(index === -1 && name !== '') {
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if( name === ''){
        rollbar.error('No name given')
        res.status(400).send('Must provide a name.')
    } else {
        rollbar.critical('Student already exists')
        res.status(400).send('that student already exists')
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))