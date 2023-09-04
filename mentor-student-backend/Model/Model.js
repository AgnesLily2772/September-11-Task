import mongoose from "mongoose"
const mentorSchema = mongoose.Schema({
          name: String,
          email: String,
})
export const MentorModel = mongoose.model("Mentors",mentorSchema)

const studentSchema = mongoose.Schema({
          name: String,
          email: String,
          previousMentor:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Mentor',
                    },
          mentor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Mentor',
          },
})
export const StudentModel = mongoose.model("Students",studentSchema)