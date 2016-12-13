var Schema = mongoose.Schema;

var TruckModel = new Schema({
    uid: { type: String, default: "" },
    cid: { type: String, default: "" },//Company owner
    name: { type: String, default: "" },
    logo: { type: String, default: "" },
    
    is_deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Truck', TruckModel);