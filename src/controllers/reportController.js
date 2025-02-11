import Doctor from '../models/doctors.js';
import Bill from '../models/bills.js';
import Patient from '../models/patients.js';

export const getTotalPatientsVisited = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
    }
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        console.log(start,end);
        console.log('Counting patients with lastVisit between', start.toISOString(), 'and', end.toISOString());
        const totalPatients = await Patient.countDocuments({
            lastVisit: {
                $gte: start,
                $lte: end
            }
        });
        console.log('Total patients:', totalPatients);
        res.status(200).json({
            reportName: 'Total Patients Visited',
            dateRange: { startDate, endDate },
            totalPatients
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total patients', error: error.message });
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

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }
    console.log("start date",start);
    try {
        const bills = await Bill.find({
            date: {
                $gte: start,
                $lte: end
            }
        }).populate('doctor');

        if (bills.length === 0) {
            return res.status(200).json({
                reportName: 'Total Revenue',
                dateRange: { startDate, endDate },
                tableContent: []
            });
        }
        console.log("Fetching total revenue for bills between", start.toISOString(), 'and', end.toISOString());
        const tableContent = bills.map((bill, index) => ({
            slNumber: index + 1,
            departmentName: bill.doctor.dept_name,
            doctorName: bill.doctor.name,
            revenueDetails: bill.total
        }));

        const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);
        console.log("total Revenue :",totalRevenue);


        res.status(200).json({
            reportName: 'Total Revenue',
            dateRange: { startDate, endDate },
            tableContent,
            totalRevenue
        });
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        res.status(500).json({ message: 'Error fetching total revenue', error: error.message });
    }
};