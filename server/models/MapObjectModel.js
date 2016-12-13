var Schema = mongoose.Schema;

var MapObjectModel = new Schema({
    uid: { type: String, required: true },
    owner_id: { type: String, default: "" },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    type: { type: String, enum: ['Coffee', 'Tea'], required: true },
    is_service_company: { type: Boolean, default: false },
    location: {
        type: [Number],
        index: '2d'
    },

    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
    logo: { type: String, default: "" },

    is_deleted: { type: Boolean, default: false },
    date_created: { type: Date }
});

module.exports = mongoose.model('MapObject', MapObjectModel);