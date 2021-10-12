const express = require('express')

const app = express()

//Create API endpoint
app.get('/', (req, res) => {
    res.send('Welcome to our todos api!!!')
} )

app.listen(5000, () => {
    console.log('Server running on port 5000')
})