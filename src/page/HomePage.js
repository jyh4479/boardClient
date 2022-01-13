import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ContentServiceApi} from '../util/ApiService'
import '../style/HomePage.scss'

const HomePage = props => {
    const navigate = useNavigate()
    const [contentList, setContentList] = useState([])

    useEffect(() => {
        fetchData().then(r => {
            console.log("run fetchData")
        })
    }, [])

    const fetchData = async () => {
        const responseData = await ContentServiceApi.getContentList();
        setContentList(responseData)
    }

    const viewData = dataList => {
        return dataList.map(item => (
            <tr id={item.id} className={'contentList'}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.writer}</td>
                <td>{item.date}</td>
                <td>
                    <button onClick={() => deleteContent(localStorage.getItem('user-id'), item.id)}>삭제</button>
                </td>
            </tr>
        ))
    }

    const deleteContent = async (id, contentNumber) => {
        const result = await ContentServiceApi.deleteContent(id, contentNumber)
        result ? alert('삭제 성공') : alert('삭제 실패')
        await fetchData()
    }

    return (
        <div>
            <div>게시판 목록</div>
            <table>

                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>비고</th>
                </tr>
                </thead>

                <tbody>
                {viewData(contentList)}
                </tbody>

            </table>

            <button className={'alignRight button'}
                    onClick={e => {
                        navigate("/contentform")
                        e.preventDefault()
                    }}
            >등록
            </button>

        </div>
    )
}
export default HomePage