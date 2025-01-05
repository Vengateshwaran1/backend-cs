import express from 'express';
import { getTotalPatientsVisited, getTotalAppointmentsBooked, getTotalRevenue } from '../controllers/reportController.js';

const router = express.Router();

router.get('/total-patients', getTotalPatientsVisited);
router.get('/total-appointments', getTotalAppointmentsBooked);
router.get('/total-revenue', getTotalRevenue);

export default router;