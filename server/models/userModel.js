
const mongoose = require("mongoose");

// schema for skills array
const skillSchema = mongoose.Schema(
    {
        skillName: {
            type: String,
            required: [true, 'please enter a skill name'],
            unique: true,
        },
        skillLevel: {type: String},
    }, {_id: false} // no id needed, use skillname as unique id
)

// schema for job contacts array
const contactSchema = mongoose.Schema(
    {
        contactName: {
            type: String,
            required: [true, 'please add a name'],
            unique: true,
        },
        contactCompany: {type: String},
        contactJobTitle: { type: String},
        contactPhone: {type: String},
        contactEmail: {type: String},
    }, {_id: false} // no id needed, use contactName as unique id
)

// schema for jobs array
const jobSchema = mongoose.Schema(
    {
        job: {type: Object},
        jobTitle: {
            type: String,
            required: [true, 'please add a title']
        },
        jobCompany: {
            type: String,
            required: [true, 'please add a company']
        },
        appLink: {type: String},
        jobType: {
            type: String,
            enum : ['FULLTIME', 'INTERNSHIP'],
            required: [true, 'please add if this is a fulltime or internship']
        },
        jobSkills: {type: [String]},
        jobBenefits: {type: [String]},
        dateApplied: {type: Date},
        dateResponse: {type: Date},
        dateInterview: {type: Date},
        dateOffer: {type: Date},
        appStatus: {
            type: String,
            enum: ['APPLIED', 'WAITING', 'INTERVIEW SCHEDULED', 'INTERVIEW DONE'],
        },
        nextSteps: {type: String},
        decision: {type: String},
        jobContacts: {type: [contactSchema]}
    }
      
)

// schema for users
const userSchema = mongoose.Schema(
    {
        account: {type: Object},
        email: {
            type: String,
            required: [true, 'please add an email'],
            unique: true,
        },
        userName: {
            type: String,
            required: [true, 'please add a username'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'please add a password']
        },
        gradDate: {type: Date},
        realName: {type: String},
        jobs: {type: [jobSchema]},
        userSkills: {type: [skillSchema]}
    }
      
)


module.exports = mongoose.model('User', userSchema)