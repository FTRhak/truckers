var Schema = mongoose.Schema;

var MObjectCommentModel = new Schema({
    uid: { type: String, required: true },
    text: { type: String, default: "" },

    is_deleted: { type: Boolean, default: false },
    date_created: { type: Date }
});

module.exports = mongoose.model('MObjectComment', MObjectCommentModel);