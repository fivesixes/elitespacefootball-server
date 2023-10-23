import mongoose from 'mongoose';

const adminEntrySchema = mongoose.Schema({
  email: String,
  password: String,
  referralToken: String
});

const AdminEntry = mongoose.model('AdminEntry', adminEntrySchema);

export default AdminEntry;