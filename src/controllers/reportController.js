import Doctor from '../models/doctors.js';
import Bill from '../models/bills.js';
import Patient from '../models/patients.js';

const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
};

export const getTotalPatientsVisited = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Start date and end date are required' });
    }
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid date format' });
        }
        
        const totalPatients = await Patient.countDocuments({
            lastVisit: {
                $gte: start,
                $lte: end
            }
        });
        res.status(HTTP_STATUS.OK).json({
            reportName: 'Total Patients Visited',
            dateRange: { startDate, endDate },
            totalPatients
        });
    } catch (error) {
        console.error('Error fetching total patients:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching total patients', error: error.message });
    }
};

export const getTotalAppointmentsBooked = async (req, res) => {
    const { startDate, endDate } = req.query; 

    if (!startDate || !endDate) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Start date and end date are required' });
    }
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid date format' });
        }

        const doctors = await Doctor.find({
            'appointments.date': {
                $gte: start,
                $lte: end
            }
        });

        const tableContent = doctors.map((doctor, index) => ({
            slNumber: index + 1,
            departmentName: doctor.dept_name,
            doctorName: doctor.name,
            appointmentCount: doctor.appointments.filter(appointment => 
                new Date(appointment.date) >= start && 
                new Date(appointment.date) <= end
            ).length
        }));

        res.status(HTTP_STATUS.OK).json({
            reportName: 'Total Appointments Booked',
            dateRange: { startDate, endDate },
            tableContent
        });
    } catch (error) {
        console.error('Error fetching total appointments:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching total appointments', error: error.message });
    }
};

export const getTotalRevenue = async (req, res) => {
    const { startDate, endDate } = req.query; 

    if (!startDate || !endDate) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid date format' });
    }

    try {
        const bills = await Bill.find({
            date: {
                $gte: start,
                $lte: end
            }
        }).populate('doctor');

        const tableContent = bills.map((bill, index) => ({
            slNumber: index + 1,
            departmentName: bill.doctor.dept_name,
            doctorName: bill.doctor.name,
            revenueDetails: bill.total
        }));

        const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);

        res.status(HTTP_STATUS.OK).json({
            reportName: 'Total Revenue',
            dateRange: { startDate, endDate },
            tableContent,
            totalRevenue
        });
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching total revenue', error: error.message });
    }
};