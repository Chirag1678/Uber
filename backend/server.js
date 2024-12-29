const http = require('http');
const app = require('./app.js');
const port = process.env.PORT || 3000;
const connectDB = require('./db/db.js');
const { initializeSocket } = require('./socket.js');

const server = http.createServer(app);

connectDB().then(()=>{
    initializeSocket(server);
    server.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    })
});