import { Router } from 'express';
import upload from '../middleware/uploads.js';
import { uploadCompanyFormhandler } from '../controllers/company.js';


const router = Router();


/*router.post("/uploadcv",upload.single("file"), uploadCvhandler)*/
router.post("/data", upload.single("file"), uploadCompanyFormhandler)



export default router;
