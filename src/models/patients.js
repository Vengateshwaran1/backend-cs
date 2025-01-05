import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  UHID: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  totalAppointments: {
    type: Number,
    required: true,
  },
  lastVisit: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'patients',
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;