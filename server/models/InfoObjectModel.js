var Schema = mongoose.Schema;

var InfoObjectModel = new Schema({
    uid: { type: String, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    type: { type: String, enum: ['help', 'question', 'jam', 'warning'], required: true },
    location: {
        type: [Number],
        index: '2d'
    },

    is_deleted: { type: Boolean, default: false },
    date_created: { type: Date },
    date_expire: { type: Date }
});

module.exports = mongoose.model('InfoObject', InfoObjectModel);