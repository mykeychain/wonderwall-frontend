import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/";


/** ScraperApi: class with static methods to interact with backend API */
class ScraperApi {
  static async getData(formData) {
    try {
      const resp = await axios.post(BASE_URL+"api/CAISO", {data: formData});
      console.log("NO ERROR HERE", resp)
      return resp.data;
    } catch(err) {
      console.error("API ERROR:", err.response.data.message)
      throw err.response.data.message
    }
  }
}

export default ScraperApi;