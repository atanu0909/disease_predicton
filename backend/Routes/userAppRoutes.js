import express from 'express';
import mongoose from 'mongoose';
import child_process from 'child_process';
import path from 'path';
import axios from 'axios';
import { exec } from 'child_process';
const app = express();

const router = express.Router();

router.post('/pred', async (req, res) => {
    try {
        console.log(req.body.prompt)
        // Define the URL and the data to be sent
        const url = 'http://127.0.0.1:5000/predict';
        const data = { 
          positions: req.body.prompt
        };
        
        // Send the POST request
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)
        // Log the response from the server
       return res.json({response:response.data});
        
      } catch (error) {
        console.error('Error making POST request:', error.response ? error.response.data : error.message);
      }
});
export { router as userAppRouter };