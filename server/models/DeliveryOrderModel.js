var Schema = mongoose.Schema;

var DeliveryOrderModel = new Schema({
    cid: { type: String, required: true }, //Company ID
    uid: { type: String, required: true }, //Driver
    tid: { type: String, required: true }, //Car
    title: { type: String, default: "" },
    //TODO add types
    cargo_types: {type: String, enum: ['explosive', 'toxic', 'organic'], default: ""},
    description: { type: String, default: "" },
    location_start: {
        type: [Number],
        index: '2d'
    },
    location_end: {
        type: [Number],
        index: '2d'
    },
    location: {
        type: [Number],
        index: '2d'
    },



    is_deleted: { type: Boolean, default: false },
    date_created: { type: Date },
    date_start: { type: Date },
    date_end: { type: Date }
});

module.exports = mongoose.model('DeliveryOrder', DeliveryOrderModel);