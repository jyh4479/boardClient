import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
})

const MemberServiceApi = {
    getLoginToken: async (id, password) => {
        const data = {id: id, password: password}

        try {
            console.log(data)
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
    },

    getSearchContentList: async (id, title, writer, date) => {
        console.log(id, title, writer, date)
        const response = await api.get(`/searchcontentlist`, {
            params: {
                id: id,
                title: title,
                writer: writer,
                date: date
            }
        })
        console.log(response.data)
        return response.data
    },

    postContent: async (writer, title, detail, date) => {
        const data = {writer: writer, title: title, detail: detail, date: date}
        console.log(data)
        const response = await api.post(`/content`, data)
        return response.data
    },

    //Axios delete 메서드로 body 전달 불가 이슈 url 변경 필수
    deleteContent: async (writer, contentNumber) => {
        const data = {writer: writer, contentNumber: contentNumber}
        // const response = await api.delete(`/content`, data)
        console.log(data)
        const response = await api.post(`/contentDeleteTest`, data)
        return response.data
    }
}
export {ContentServiceApi, MemberServiceApi}