import 'dotenv/config';

const config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  corsOptions: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
};

export default config;