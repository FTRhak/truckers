var Schema = mongoose.Schema;

var UserModel = new Schema({
    access_data: {
        login: { type: String, required: true },
        password: { type: String, required: true },
        fb_key: { type: String, default: "" },
        tw_key: { type: String, default: "" },
        vk_key: { type: String, default: "" },
        gplus_key: { type: String, default: "" },
    },
    personal_data: {
        photo: { type: String, default: "" },
        firstname: { type: String, required: true },
        surname: { type: String, required: true },
        nickname: { type: String, default: "" },
        sex: { type: String, default: "" },
        birthday: { type: Number, default: null },
    },
    address: {
        country: { type: String, default: "" },
        city: { type: String, default: "" },
        street: { type: String, default: "" },
    },
    contacts: {
        phone: { type: String, default: "" },
        email: { type: String, default: "" },
        website: { type: String, default: "" },
        soc_net_vk: { type: String, default: "" },
        soc_net_fb: { type: String, default: "" },
        soc_net_tw: { type: String, default: "" },
        soc_net_gplus: { type: String, default: "" },
    },
    description: { type: String, default: "" },

    is_approved: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    date_created: { type: Date, required: true },
    date_last_visit: { type: Date }
});

module.exports = mongoose.model('User', UserModel);