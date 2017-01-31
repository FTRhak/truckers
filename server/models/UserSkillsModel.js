var Schema = mongoose.Schema;

var SkillModel = new Schema({
    name: { type: String, required: true },
    experience: { type: String, default: "driver", enum: ['beginner', 'familiar', 'intermediate', 'proficient', 'advanced', 'expert'] },
});

var UserSkillsModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        unique: true
    },
    skills: [SkillModel]
});


module.exports = mongoose.model('UserSkills', UserSkillsModel);