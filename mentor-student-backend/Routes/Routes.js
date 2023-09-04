import express from "express"
import { assignMentor, createMentor, createStudent, getAllStudentsForMentor, getPreviousMentor, updateMentor } from "../Controller/Controller.js"

const router = express.Router()
router.post("/createMentor",createMentor)
router.post("/createStudent",createStudent)
router.post("/assign-mentor/:mentorId",assignMentor)
router.get("/students-for-mentor/:mentorId",getAllStudentsForMentor)
router.put("/assign-mentor/:studentId",updateMentor)
router.get("/previous-mentor/:studentId",getPreviousMentor)

export default router