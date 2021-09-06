const express = require('express')
const app = express()

app.use('/static', express.static('views'))
app.use('/api/timer', require('./timer/api'));
// Redirect root to /books
app.get('/', (req, res) => {
    res.redirect('/timer');
});
// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = app;