import mongoose from 'mongoose';

const entrySchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  otherNames: String,
  birthDate: Date,
  height: String,
  weight: String,
  nationality: String,
  currentTeam: String,
  positions: [ { full: String, shorthand: String } ],
  strongerFoot: String,
  pace: String,
  about: String,
  passportPhoto: String,
  cardPhoto: String,
  otherPhotos: [String],
  media: [ { videoTitle: String, videoContent: String, description: String } ],
  creation: { author: String, creationDate: Date }
})

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;