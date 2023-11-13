import express from "express"
import { deleteAllapplicants, 
    deleteApplicant, 
    getAllapplicants, 
    getApplicant, 
    login, 
    logout, 
    registerApplicant, 
    updateApplicant 
} from "../controllers/applicant.js"
import upload from "../middleware/uploads.js"

const router = express.Router()

router.post("/register", registerApplicant)
router.get("/getAllapplicants", getAllapplicants)
router.get("/getApplicant/:appId", getApplicant)
router.delete("/delete/:appId", deleteApplicant)
router.delete("/delete/all/applicants", deleteAllapplicants)
router.put("/update/:appId",upload.single('file'), updateApplicant)
router.post("/login/applicant", login)
router.get("/logout/applicant", logout)

export default router