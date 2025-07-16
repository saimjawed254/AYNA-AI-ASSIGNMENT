import express from 'express';
import { createForm, getFormByPublicId, submitResponse, getFormResponses, getAllFormsForAdmin } from '../controllers/form.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getAllFormsForAdmin);
router.post('/', verifyToken, createForm); // Admin creates form
router.get('/:publicId', getFormByPublicId); // Public access
router.post('/:publicId/submit', submitResponse);
router.get('/:formId/responses', verifyToken, getFormResponses);

const formRoutes = router;
export default formRoutes;