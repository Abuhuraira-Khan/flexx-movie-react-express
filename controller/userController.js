import os from 'os';

export const getUser = async (req,res)=>{
      // Get the user's IP address
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.json(ip)

}