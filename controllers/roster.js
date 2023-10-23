import mongoose from "mongoose";
import Entry from "../models/entry.js";


// READ all
export const getEntries = async ( req, res ) => {

  try {
    const entries = await Entry.find();

    res.status(200).json(entries);
    console.log(entries);
  }
  catch (error) {
    res.status(404).json( { message: error.message } );

    console.log(error.message);
  }
}

export const getEntry = async ( req, res ) => {

  const { id } = req.params;
  try {
    const entry = await Entry.findById(id);

    res.status(200).json(entry);
  }
  catch (error) {
    res.status(404).json( { message: error.message } );

    console.log(error.message);
  }
}

//  CREATE
export const createEntry = async ( req, res ) => {

  const entry = req.body;

  const newEntry = new Entry(entry);
  
  try {
    await newEntry.save();

    res.status(201).json( { message: 'Successful Creation' } );
  }
  catch (error) {
    res.status(409).json( { message: error.message } );
    console.log(error);
  }
}

// UPDATE
export const updateEntry = async ( req, res ) => {

  const { id: _id } = req.params;
  const entry = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No entery with that ID');

  const updatedEntry = await Entry.findByIdAndUpdate(_id, { ...entry, _id }, { new: true });

  res.json(updatedEntry);
}

export const deleteEntry = async ( req, res ) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await Entry.findByIdAndRemove(id);

  res.json( { message: 'Post deleted successfully' } );
}