import Doctor from '../models/doctors.js';
import Bill from '../models/bills.js';
import Patient from '../models/patients.js';

export const getTotalPatientsVisited = async (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
    }

    console.log('Received Dates:', startDate, endDate);

    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include the entire end date

        const totalPatients = await Patient.countDocuments({
            lastVisit: {
                $gte: start,
                $lte: end
            }
        });

        console.log('Total Patients:', totalPatients); // Log the result

        res.status(200).json({
            reportName: 'Total Patients Visited',
            dateRange: { startDate, endDate },
            totalPatients
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total patients', error });
        console.log('Error details:', error);
    }
};

export const getTotalAppointmentsBooked = async (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
    }

    try {
        const doctors = await Doctor.find({
            'appointments.date': {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        const tableContent = doctors.map((doctor, index) => ({
            slNumber: index + 1,
            departmentName: doctor.dept_name,
            doctorName: doctor.name,
            appointmentCount: doctor.appointments.filter(appointment => 
                new Date(appointment.date) >= new Date(startDate) && 
                new Date(appointment.date) <= new Date(endDate)
            ).length
        }));

        res.status(200).json({
            reportName: 'Total Appointments Booked',
            dateRange: { startDate, endDate },
            tableContent
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total appointments', error });
        console.log(error);
    }
};

export const getTotalRevenue = async (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
    }

    try {
        const bills = await Bill.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).populate('doctor');

        console.log('Bills fetched:', bills); 

        const tableContent = bills.map((bill, index) => ({
            slNumber: index + 1,
            departmentName: bill.doctor.dept_name,
            doctorName: bill.doctor.name,
            revenueDetails: bill.total
        }));
        console.log('Table content:', tableContent); 

        res.status(200).json({
            reportName: 'Total Revenue',
            dateRange: { startDate, endDate },
            tableContent
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total revenue', error });
        console.log(error);
    }
};