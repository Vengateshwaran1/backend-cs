import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dept_name: {
        type: String,
        required: true,
    },
    ph_no: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    reg_no: {
        type: String,
        required: true,
    },
    appointments: {
        type: Array,
        default: [],
    }
}, {
    collection: 'doctors',
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;