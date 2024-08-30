require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const indexRouter = require('./routes/index')

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to PG Manager');
});

app.use((req, res, next) => {
    res.status(404).send('Sorry, we could not find that!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
});

process.on('SIGTERM', () => {
    app.close(() => {
        console.log('Process terminated');
    });
});