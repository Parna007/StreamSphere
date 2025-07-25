// routes/auth.js
import { Router } from 'express';
const router = Router();
import { googleLogin } from '../controllers/auth.controllers.js';

router.post('/google-login', googleLogin);

export default router;
