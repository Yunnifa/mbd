const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const Kamar = require('./src/routes/kamarRoutes');
const reservasi = require('./src/routes/reservasiRoutes');
const payment = require('./src/routes/pembayaranRoutes');
const feedback = require('./src/routes/feedbackRoutes');
const viewRoute = require('./src/routes/viewRoute');

const app = express();

app.use(express.json()); // Parsing JSON
app.use('/api', userRoutes);
app.use('/kamar', Kamar);
app.use('/reservasi', reservasi);
app.use('/payment', payment);
app.use('/feedback', feedback);
app.use('/view', viewRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});