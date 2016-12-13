var Schema = mongoose.Schema;

var ChatMessageModel = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },

    text: { type: String, default: "" },

    location: {
        type: [Number],
        index: '2d'
    },

    is_deleted: { type: Boolean, default: false },
    date_created: { type: Date }
});

module.exports = mongoose.model('ChatMessage', ChatMessageModel);