const Express = require('express');
const path = require('path')
const { GetAllTechEventsFromEventBrite } = require('./eventbrite.controller.js')
const { requestToMeetUpApi } = require('./meetup.controller.js')
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000;

const app = Express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Express.static('/'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/api/events', async (req, res) => {
    const meetupData = await requestToMeetUpApi()
    const eventbriteData = await GetAllTechEventsFromEventBrite()
    data = [...meetupData, ...eventbriteData]
    res.json(data)
    console.log(data)
})

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})