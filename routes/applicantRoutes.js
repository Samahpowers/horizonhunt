import express from "express"
import { deleteAllapplicants, deleteApplicant, getAllapplicants, getApplicant, registerApplicant, updateApplicant } from "../controllers/applicant.js"
import upload from "../middleware/uploads.js"

const router = express.Router()

router.post("/register", registerApplicant)
router.get("/getAllapplicants", getAllapplicants)
router.get("/getApplicant/:appId", getApplicant)
router.delete("/delete/:appId", deleteApplicant),
router.delete("/delete/all/applicants", deleteAllapplicants)
router.put("/update/:appId",upload.single('file'), updateApplicant)

export default router