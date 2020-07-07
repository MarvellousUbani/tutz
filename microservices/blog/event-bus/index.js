const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const events = [];

try{
    app.post('/events', (req, res) => {
        const event = req.body;
        events.push(event);
        axios.post("http://localhost:4000/events", event);
        axios.post("http://localhost:4001/events", event);
        axios.post("http://localhost:4002/events", event);
        axios.post("http://localhost:4003/events", event);

        res.send({status: "OK"});
    });
}
catch(e) {
    console.log('Catch an error: ', e)
  }

app.get("/events", (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log("Listening on 4005");
})