import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ContentServiceApi} from '../util/ApiService'
import {FormatService} from '../util/UtilService'
import '../style/HomePage.scss'

const HomePage = props => {
    const navigate = useNavigate()
    const [contentList, setContentList] = useState([])

    const [idSelector, setIdSelector] = useState('true')
    const [titleSelector, setTitleSelector] = useState('true')
    const [writerSelector, setWriterSelector] = useState('true')
    const [dateSelector, setDateSelector] = useState('true')

    const inputId = React.createRef()
    const inputTitle = React.createRef()
    const inputWriter = React.createRef()
    const inputDate = React.createRef()

    useEffect(() => {
        fetchData().then(r => {
            console.log("run fetchData")
        })
    }, [])

    const fetchData = async () => {
        const responseData = await ContentServiceApi.getContentList();
        setContentList(responseData)
    }

    const searchData = async () => {

        const id = idSelector === 'false' ? FormatService.spaceCheck(inputId.current.value) : null
        const title = titleSelector === 'false' ? FormatService.spaceCheck(inputTitle.current.value) : null
        const writer = writerSelector === 'false' ? FormatService.spaceCheck(inputWriter.current.value) : null
        const date = dateSelector === 'false' ? FormatService.spaceCheck(inputDate.current.value) : null

        const responseData = await ContentServiceApi.getSearchContentList(id, title, writer, date);
        setContentList(responseData)
        console.log('clickTest')
    }

    const idSelectorChange = e => {
        setIdSelector(e.target.value)
        e.preventDefault()
    }
    const titleSelectorChange = e => {
        setTitleSelector(e.target.value)
        e.preventDefault()
    }
    const writerSelectorChange = e => {
        setWriterSelector(e.target.value)
        e.preventDefault()
    }
    const dateSelectorChange = e => {
        setDateSelector(e.target.value)
        e.preventDefault()
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
                    <th>
                        <select name={idSelector} onChange={idSelectorChange}>
                            <option value={true}>전체</option>
                            <option value={false}>직접입력</option>
                        </select>
                        <input ref={inputId} disabled={idSelector === 'true' ? true : false}/>
                    </th>
                    <th>
                        <select name={titleSelector} onChange={titleSelectorChange}>
                            <option value={true}>전체</option>
                            <option value={false}>직접입력</option>
                        </select>
                        <input ref={inputTitle} disabled={titleSelector === 'true' ? true : false}></input>
                    </th>
                    <th>
                        <select name={writerSelector} onChange={writerSelectorChange}>
                            <option value={true}>전체</option>
                            <option value={false}>직접입력</option>
                        </select>
                        <input ref={inputWriter} disabled={writerSelector === 'true' ? true : false}></input>
                    </th>
                    <th>
                        <select value={dateSelector} onChange={dateSelectorChange}>
                            <option value={true}>전체</option>
                            <option value={false}>직접입력</option>
                        </select>
                        <input ref={inputDate} disabled={dateSelector === 'true' ? true : false}/>
                    </th>
                    <th>
                        <button onClick={searchData}>검색</button>
                    </th>
                </tr>
                </thead>

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