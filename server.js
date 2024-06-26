const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require("dotenv").config()

const Workout = require('./models/workout');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// MongoDB connection
const mongoURI = process.env.MONGOURI;
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI)
        console.log('I am connected to mongo db')
    } catch (err) {
        console.error(err);
    }
}

connectToMongo();

// Routes
app.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.render('index.ejs', { workouts });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/workouts/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/workouts', async (req, res) => {
    try {
        const { description } = req.body;
        await Workout.create({ description });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/workouts/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        res.render('show.ejs', { workout });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Route
app.put('/workouts/:id', async (req, res) => {
    try {
        const { description } = req.body;
        await Workout.findByIdAndUpdate(req.params.id, { description });
        res.redirect(`/workouts/${req.params.id}`);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete Route
app.delete('/workouts/:id', async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
