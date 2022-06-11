import axios from "axios"

export const comment = async (postId, comment, image, token) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        {
          postId,
          comment,
          image,
        },
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };
 

  export const deletePost = async (postId,  token) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/deletePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };
 