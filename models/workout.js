const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    description: String,
});

module.exports = mongoose.model('Workout', workoutSchema);
