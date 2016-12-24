var Schema = mongoose.Schema;

var UserModel = new Schema({
    access_data: {
        login: {
            type: String,
            required: true,
            maxlength: 64,
            minlength: 4,
            trim: true
        },
        password: { type: String, required: true, maxlength: 64 },
        fb_key: { type: String, default: "" },
        tw_key: { type: String, default: "" },
        vk_key: { type: String, default: "" },
        gplus_key: { type: String, default: "" },

        is_confirmed: { type: Boolean, default: false },
        confirmation_key: { type: String, default: "" },
        is_approved: { type: Boolean, default: false },
        approvers: [String],
    },
    personal_data: {
        photo: {
            type: String, default: "", maxlength: 255/*,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: '{VALUE} is not a valid phone number!'
            }*/
        },
        firstname: { type: String, required: true, maxlength: 64 },
        surname: { type: String, required: true, maxlength: 64 },
        nickname: { type: String, default: "", maxlength: 64 },
        sex: { type: String, default: "", enum: ['', 'male', 'female'] },
        birthday: {
            year: { type: Number, min: 1905, max: 2010, default: null },
            month: { type: Number, min: 1, max: 12, default: null },
            day: { type: Number, min: 1, max: 31, default: null }
        }
    },
    address: {
        country: { type: String, default: "", maxlength: 255 },
        city: { type: String, default: "", maxlength: 255 },
        street: { type: String, default: "", maxlength: 255 },
    },
    contacts: {
        phone: { type: String, trim: true, maxlength: 20, default: "", trim: true },
        email: { type: String, default: "", maxlength: 64, lowercase: true, trim: true },
        website: { type: String, default: "", maxlength: 255, trim: true },
        soc_net_vk: { type: String, default: "" },
        soc_net_fb: { type: String, default: "" },
        soc_net_tw: { type: String, default: "" },
        soc_net_gplus: { type: String, default: "" },
    },
    description: { type: String, default: "", maxlength: 1024 },

    settings: {
        show_birthday: { type: Boolean, default: false },
        show_email: { type: Boolean, default: false },
        show_social_net: { type: Boolean, default: false },
        show_phone: { type: Boolean, default: false },
        show_address: { type: Boolean, default: false },
        show_website: { type: Boolean, default: false },
    },

    is_deleted: { type: Boolean, default: false },
    date_created: { type: Date, required: true, default: Date.now },
    date_last_visit: { type: Date }
});

module.exports = mongoose.model('User', UserModel);