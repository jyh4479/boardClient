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

    getContent: async (id) => {
        const response = await api.get(`/content`,
            {
                params: {
                    id: id,
                }
            }
        )
        return response.data
    },

    getCommentList: async (id) => {
        const response = await api.get(`/commentList`,
            {
                params: {
                    id: id,
                }
            }
        )
        return response.data
    },

    getContentList: async (pageNumber, id, title, writer, date) => {
        const response = await api.get(`/contentlist`, {
            params: {
                pageNumber: pageNumber,
                id: id,
                title: title,
                writer: writer,
                date: date
            }
        })

        // PageRequest 에 의한 return 형식
        return response.data
    },

    getContentSize: async (id, title, writer, date) => {
        const response = await api.get(`/contentsize`, {
            params: {
                id: id,
                title: title,
                writer: writer,
                date: date
            }
        })
        return response.data
    },

    postContent: async (writer, title, detail, date) => {
        const data = {writer: writer, title: title, detail: detail, date: date}
        const response = await api.post(`/content`, data)
        return response.data
    },

    postComment: async (contentId, writer, detail, date) => {
        const data = {contentId: contentId, writer: writer, detail: detail, date: date}
        const response = await api.post(`/comment`, data)
        console.log(response)
        return response.data
    },

    //Axios delete 메서드로 body 전달 불가 이슈 url 변경 필수
    deleteContent: async (writer, contentNumber) => {
        const data = {writer: writer, contentNumber: contentNumber}
        // const response = await api.delete(`/content`, data)
        const response = await api.post(`/contentDeleteTest`, data)
        return response.data
    },

    deleteComment: async (writer, commentNumber) => {
        const data = {writer: writer, contentNumber: commentNumber}
        const response = await api.post(`/commentDelete`, data)
        return response.data
    }
}
export {ContentServiceApi, MemberServiceApi}