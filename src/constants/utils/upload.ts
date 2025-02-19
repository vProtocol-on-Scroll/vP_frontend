// import axios from "axios";

// export const upload = async (file: any, setUploadedFiles: any) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "lovesphere");
//   try {
//     const response = await axios.post(
//       "https://api.cloudinary.com/v1_1/df6pun3tr/image/upload",
//       data
//     );
//     const { url } = response.data;

//     if (url) {
//       setUploadedFiles((prev: any) => [...prev, url]);
//     }
//     return url;
//   } catch (error) {
//     return error;
//   }
// };
