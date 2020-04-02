const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/omar', (req,res) => {
    res.json("Hi Omar");
})

const responses = {};

app.get('/subscribe', (req,res) => {
    const id = Math.ceil(Math.random()*100000);
    console.log('New Subscriber', id);
    req.on('close', () => delete responses[id]);
    res.writeHead(200,{
        'Content-Type' : 'text/event-stream',
        'Cash-Control' : 'no-cache',
        'Connection' : 'keep-alive',
    });
    responses[id] = res;
});

app.post('/helloSubscriber', (req,res) => {
    const { body } = req;
    Object.keys(responses).forEach((subId) => {
        responses[subId].write(`data: ${JSON.stringify(body)}\n\n`);
        console.log(subId);
        console.log(body);
    }); 
    res.status(204).end();
});

app.listen(4000,() => {
    console.info('server listning on port 4000');
});
