// models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  uid: { 
    type: String, 
    required: true, 
    unique: true 
  }, // Firebase UID
  name: String,
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  photoURL: String
  
});

export default model('User', userSchema);

