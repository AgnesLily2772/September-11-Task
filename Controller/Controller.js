import { MentorModel, StudentModel } from "../Model/Model.js";

//1. Write API to create Mentor
export const createMentor = async (req, res) => {
    const { name, email } = req.body;
    try {
        const mentor = new MentorModel({ name, email });
        await mentor.save();
        res.status(201).json(mentor);
    } catch (error) {
        res.status(400).json({ error: "Failed to create mentor" });
    }
};

//2. Write API to create Student
export const createStudent = async (req, res) => {
    const { name, email } = req.body;
    try {
        const student = new StudentModel({ name, email });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: "Failed to create student" });
    }
};

//3. Write API to Assign a student to Mentor
export const assignMentor = async (req, res) => {
    const { mentorId } = req.params;
    const studentsToAssign = req.body.studentIds;
    try {
        await StudentModel.updateMany(
            { _id: { $in: studentsToAssign } },
            { $set: { mentor: mentorId } }
        );
        res.status(200).json({
            message: "Students assigned to mentor successfully",
        });
    } catch (error) {
        res.status(400).json({
            error: "Failed to assign students to mentor",
        });
    }
};

//4. Write API to Assign or Change Mentor for particular Student
export const updateMentor = async (req, res) => {
    const { studentId } = req.params;
    const { newMentorId } = req.body;
    try {
        const student = await StudentModel.findById(studentId);
        if (!student)
            return res.status(404).json({ error: "Student not found" });
        const currentMentor = student.mentor;
        await StudentModel.updateOne(
            { _id: studentId },
            {
                $set: {
                    mentor: newMentorId,
                    previousMentor: currentMentor,
                },
            }
        );
        res.status(200).json({
            message: "Student assigned to a new mentor successfully",
        });
    } catch (error) {
        res.status(400).json({
            error: "Failed to assign a new mentor to the student",
        });
    }
};

//5. Write API to show all students for a particular mentor
export const getAllStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const students = await StudentModel.find({
            mentor: mentorId,
        });
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({
            error: "Failed to fetch students for the mentor",
        });
    }
};

//6. Write an API to show the previously assigned mentor for a particular student.
export const getPreviousMentor = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await StudentModel.findById(studentId);
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        const previousMentor = await MentorModel.findById(
            student.previousMentor
        );
        if (previousMentor) res.status(200).json(previousMentor);
        else res.status(200).json({ message: "No previous mentor" });
    } catch (error) {
        res.status(400).json({
            error: "Failed to fetch the previous mentor",
        });
    }
};
