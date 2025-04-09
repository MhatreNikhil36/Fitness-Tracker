import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  origin: 'http://localhost:3000', // your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      return result instanceof Error ? reject(result) : resolve(result);
    });
  });
}

export default function withCors(handler) {
  return async (req, res) => {
    await runMiddleware(req, res, cors);
    return handler(req, res);
  };
}