import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from '../constant/app.constant';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export { cloudinary };
