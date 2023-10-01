const express = require('express');
const cors = require('cors');   // whitelist same origin 
const app = express();

app.use(express.json());
app.use(cors());

const db = require('./models');

// Express Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on 3001 !");
    })
});

