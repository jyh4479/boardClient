import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
})

const MemberServiceApi = {
    getLoginToken: async (id, password) => {
        const data = {id: id, password: password}

        try {
            const response = await api.post(`/login`, data)
            return response.data
        } catch (e) {
            return false
        }

    }
}

const ContentServiceApi = {
    getContentList: async () => {
        const response = await api.get(`/contentlist`)
        return response.data
    }
}
export {ContentServiceApi, MemberServiceApi}