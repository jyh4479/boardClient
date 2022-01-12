import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
})

const BoardServiceApi = {
    getContentList: () => {
        return api.post(`/contentlist`)
    }
}
export default BoardServiceApi