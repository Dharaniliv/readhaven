
import User from './models/User';
import connectToDatabase from './db/mongo';


export const checkUserExists = async (email) => {
  await connectToDatabase(); 


  const user = await User.findOne({ email }); 
  return user !== null; 
};
