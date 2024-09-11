import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)

const URL='http://localhost:8000';

export const authenticate=async (data)=>{
    try{
      return await axios.post(`${URL}/signup`,data)

    }catch(err){
        console.log("Error in api",err.message)
        return { error: 'Failed to register. Email Id is already Exist.' };
    }
}


export const authenticateLogin=async(data)=>{
  try{
    return await axios.post(`${URL}/login`,data)

  }catch(err){
      console.log("Error in api",err.message)
      return { error: 'Failed to Login' };
  }
}


