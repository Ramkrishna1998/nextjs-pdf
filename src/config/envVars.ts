import { ENV_MODE } from './enums';

const prod = (process.env.NODE_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV) === ENV_MODE.PRODUCTION;
const envVars = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  prod,
  baseUrl: prod
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`
    : process.env.NEXT_PUBLIC_BASE_URL,
  screenDebugger: process.env.NEXT_PUBLIC_CSS_SCREEN_DEBUGGER,
  uploadDir: prod
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/images-endpoint`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/images-endpoint`,
  log: {
    level: process.env.NEXT_PUBLIC_LOGGER_LEVEL,
  },
  cloudinary: {
    url: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
  },
  googleAnalytics: {
    key: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    isEnabled: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_ANALYTICS,
  },
  drive: {
    url: process.env.NEXT_PUBLIC_DRIVE_URL,
  },
};
export { envVars };
