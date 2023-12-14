import express from "express"
import { 
    deleteUser,
    deleteUsers,
    getApplicants,
    getCompanies,
    getUser,
    getUsers,
    login,
    registerUser,
    updateUser,     
    initialApplicantInfo,
    getJobseekers
} from "../controllers/user.js"
import upload from "../middleware/uploads.js"
import { validateToken } from "../middleware/validateTokenHandler.js"

const router = express.Router()

router.get("/jobs/seekers", getJobseekers)
router.post("/initial/applicantinfo", initialApplicantInfo)
router.post("/register", registerUser)
router.get("/get/:id", getUser)
router.get("/get/", getUsers)
router.get("/getcompany",getCompanies)
router.get("/getapplicant", getApplicants)
router.put("/update/:id",upload.single('file'), updateUser)
router.delete("/delete/:id", deleteUser)
router.delete("/delete", deleteUsers)
router.post("/login", login)

export default router