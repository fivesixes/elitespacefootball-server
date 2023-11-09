import mongoose from 'mongoose';
import AdminEntry from '../models/admin.js';
import { generateRandomToken } from '../customFunctionality/admin.js';

export const createAdmin = async (req, res) => {

  console.log('Request was made');
  const adminEntry = req.body;

  const newAdminEntry = new AdminEntry(adminEntry);

  try {
    const adminEntries = await AdminEntry.find();
    console.log('New test');
    if (!adminEntries.length) {
      await newAdminEntry.save();
    }
    else {
      
      let validAdmin = undefined;

      for (let i = 0; i < adminEntries.length; i++){
        if (adminEntries[i].referralToken === newAdminEntry.referralToken) {
          validAdmin = adminEntries[i];
        }
      }

      if (validAdmin) {

        console.log(`validAdmin.email: ${validAdmin.email}`);
        console.log(`adminEntry.email: ${newAdminEntry.email}`);

        for (let i = 0; i < adminEntries.length; i++) {
          if (adminEntries[i].email === newAdminEntry.email){
            throw new Error('User already exists');
          } 
        }

        await newAdminEntry.save();
    
        const newToken = generateRandomToken(20);
        await AdminEntry.updateOne( {referralToken: adminEntry.referralToken}, { ...adminEntry, referralToken: newToken }, { new: true } );
      }
      else {
        throw new Error('Your referral token is invalid');
      }
    }

    res.status(200).json( { message: 'Successful Creation' } );
    const logAdmin = await AdminEntry.find( {email: newAdminEntry.email} );
    console.log(`This the updated admin: ${logAdmin}`);
  } 
  catch (error) {
    console.log(error.message);
    switch(error.message) {
      case 'Your referral token is invalid':
        res.status(401).json( { message: error.message } );
        break;

      case 'User already exists':
        res.status(409).json( { message: error.message } );
        break;

      default:
        res.status(400).json( { message: error.message } );
        break;
    }
  }
}

export const adminAuth = async (req, res) => {
  
  const { email, password } = req.body;
  console.log(email, password);

  console.log(`Trying to auth this email: ${email}`);

  try {
    const admin = await AdminEntry.findOne( { email: email } );
    console.log(admin);
  }
  catch (error) {
    res.status(404).json( { message: error.message } )
  }
}