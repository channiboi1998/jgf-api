// pages/api/_middleware.js
import Cors from 'cors';

// Initialize CORS
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*', // Allow all origins; adjust as needed
});

// Helper function to run middleware
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
}
