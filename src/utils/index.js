import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=c6511bdcc961c3f7cbb80d84452b6b37`,
    formData
  );

  return data?.data?.display_url;
};



// save or update user in db
export const saveOrUpdateUser = async userData => {
  const { data } = await axios.post(
    `http://localhost:3000/user`,
    userData
  )
  return data
}