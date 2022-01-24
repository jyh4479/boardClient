import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ContentServiceApi} from '../util/ApiService'
import {FormatService} from '../util/UtilService'
import {Button, ButtonGroup, Card, FormControl, FormSelect, PageItem, Pagination, Table} from 'react-bootstrap'
import '../style/HomePage.scss'

const HomePage = props => {
    const navigate = useNavigate()
    const [contentList, setContentList] = useState([])
    const [pagingCount, setPagingCount] = useState(0)
    const [curPage, setCurPage] = useState(0)

    const [idSelector, setIdSelector] = useState('true')
    const [titleSelector, setTitleSelector] = useState('true')
    const [writerSelector, setWriterSelector] = useState('true')
    const [dateSelector, setDateSelector] = useState('true')

    const inputId = React.createRef()
    const inputTitle = React.createRef()
    const inputWriter = React.createRef()
    const inputDate = React.createRef()

    useEffect(() => {
        fetchData(curPage).then(r => {
            console.log("run fetchData")
        })
        getPagingCount().then(r => {
            console.log("run getPagingNumber: ")
        })
    }, [])

    const fetchData = async (pageNumber) => {
        // 삭제하고 페이징 view 수정필요
        const loadPage = pagingCount < pageNumber ? pagingCount : pageNumber
        console.log("loadPage")
        console.log(loadPage)
        console.log("pagingCount")
        console.log(pagingCount)
        setCurPage(loadPage)

        const id = idSelector === 'false' ? FormatService.spaceCheck(inputId.current.value) : null
        const title = titleSelector === 'false' ? FormatService.spaceCheck(inputTitle.current.value) : null
        const writer = writerSelector === 'false' ? FormatService.spaceCheck(inputWriter.current.value) : null
        const date = dateSelector === 'false' ? FormatService.spaceCheck(inputDate.current.value) : null

        const responseData = await ContentServiceApi.getContentList(loadPage, id, title, writer, date);
        responseData ? setContentList(responseData) : setContentList([])
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
                <td onClick={() => navigate(`/detail/${item.id}`
                )}>{item.title}</td>
                <td>{item.writer}</td>
                <td>{item.date}</td>
                <td>
                    <Button onClick={() => deleteContent(localStorage.getItem('user-id'), item.id)}>삭제</Button>
                </td>
            </tr>
        ))
    }

    const deleteContent = async (id, contentNumber) => {
        const result = await ContentServiceApi.deleteContent(id, contentNumber)
        result ? alert('삭제 성공') : alert('삭제 실패')
        await getPagingCount()
        await fetchData(curPage)
    }

    const getPagingCount = async () => {
        const id = idSelector === 'false' ? FormatService.spaceCheck(inputId.current.value) : null
        const title = titleSelector === 'false' ? FormatService.spaceCheck(inputTitle.current.value) : null
        const writer = writerSelector === 'false' ? FormatService.spaceCheck(inputWriter.current.value) : null
        const date = dateSelector === 'false' ? FormatService.spaceCheck(inputDate.current.value) : null

        const result = await ContentServiceApi.getContentSize(id, title, writer, date)
        result ? setPagingCount(result) : setPagingCount(1)
    }

    const makePagingBar = now => {
        const view = []
        for (let num = 0; num < pagingCount; num++) {
            view.push(
                <PageItem key={num} active={now === num} onClick={() => fetchData(num)}>{num + 1}</PageItem>
            )
        }
        return view
    }

    return (
        <Card>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>
                            <FormSelect name={idSelector} onChange={idSelectorChange}>
                                <option value={true}>전체</option>
                                <option value={false}>직접입력</option>
                            </FormSelect>
                            <FormControl ref={inputId} disabled={idSelector === 'true' ? true : false}/>
                        </th>
                        <th>
                            <FormSelect name={titleSelector} onChange={titleSelectorChange}>
                                <option value={true}>전체</option>
                                <option value={false}>직접입력</option>
                            </FormSelect>
                            <FormControl ref={inputTitle}
                                         disabled={titleSelector === 'true' ? true : false}></FormControl>
                        </th>
                        <th>
                            <FormSelect name={writerSelector} onChange={writerSelectorChange}>
                                <option value={true}>전체</option>
                                <option value={false}>직접입력</option>
                            </FormSelect>
                            <FormControl ref={inputWriter}
                                         disabled={writerSelector === 'true' ? true : false}></FormControl>
                        </th>
                        <th>
                            <FormSelect value={dateSelector} onChange={dateSelectorChange}>
                                <option value={true}>전체</option>
                                <option value={false}>직접입력</option>
                            </FormSelect>
                            <FormControl ref={inputDate} disabled={dateSelector === 'true' ? true : false}/>
                        </th>
                        <th>
                            <Button onClick={() => {
                                fetchData(0).then(r => console.log("Search Data"))
                                getPagingCount().then(r => console.log("Search Page Count"))
                            }}>검색</Button>
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
                </Table>
            </Card.Body>

            <Card.Body>
                <ButtonGroup className={'alignRight'}>
                    <Button
                        onClick={e => {
                            navigate("/contentform")
                            e.preventDefault()
                        }}
                    >등록
                    </Button>
                </ButtonGroup>
            </Card.Body>

            <Pagination className={'pagingButton'}>{makePagingBar(curPage)}</Pagination>

        </Card>
    )
}
export default HomePage