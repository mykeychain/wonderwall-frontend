import axios from "axios";

const BASE_URL = "http://localhost:5000/api/CAISO";

class ScraperApi {
    static async getData(formData) {
        const resp = await axios.post(BASE_URL, {data: formData});
        console.log("RESP HERE", resp);
        return resp.data;
    }
}

export default ScraperApi;