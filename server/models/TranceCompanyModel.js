var Schema = mongoose.Schema;

var TranceCompanyModel = new Schema({
    uid: { type: String, default: "" },
    name: { type: String, default: "" },
    logo: { type: String, default: "" },
    location: {
        type: [Number],
        index: '2d'
    },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    is_deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('TranceCompany', TranceCompanyModel);