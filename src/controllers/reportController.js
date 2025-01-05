import Doctor from '../models/doctors.js';
import Bill from '../models/bills.js';
import Patient from '../models/patients.js';

export const getTotalPatientsVisited = async (req, res) => {
    try {
        const totalPatients = await Patient.countDocuments();
        res.status(200).json({ totalPatients });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total patients', error });
    }
};

export const getTotalAppointmentsBooked = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        const totalAppointments = doctors.reduce((acc, doctor) => acc + doctor.appointments.length, 0);
        res.status(200).json({ totalAppointments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total appointments', error });
    }
};

export const getTotalRevenue = async (req, res) => {
    try {
        const totalRevenue = await Bill.aggregate([
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]);
        res.status(200).json({ totalRevenue: totalRevenue[0].total });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total revenue', error });
    }
};