import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {ContentServiceApi} from "../util/ApiService";
import {Button, ButtonGroup, Card, FormControl} from "react-bootstrap";
import {DataService, DateService} from "../util/UtilService";
import "../style/DetailPage.scss"

const DetailPage = props => {
    const navigate = useNavigate()
    const {pageId} = useParams()
    const [contentData, setContentData] = useState([])
    const commentInput = React.createRef()

    useEffect(() => {
        fetchData().then(r => console.log("run fetchData"))
    }, [])

    const fetchData = async () => {
        const result = await ContentServiceApi.getContent(pageId)
        console.log(result)
        result ? setContentData(result) : setContentData([])
    }

    const addComment = () => {
        const writer = localStorage.getItem('user-id')
        const comment = commentInput.current.value
        const date = DateService.getCurrentDate()

        console.log(writer)
        console.log(comment)
        console.log(date)
    }

    return (
        <Card className={'detailCard'}>
            <Card.Header>상세 페이지</Card.Header>
            <Card.Body>
                <Card.Title className={'detailCardTitle'}>제목</Card.Title>
                <Card.Text className={'detailCardText'}>{DataService.nullCheck(contentData.title)}</Card.Text>
            </Card.Body>

            <Card.Body>
                <Card.Title className={'detailCardTitle'}>날짜</Card.Title>
                <Card.Text className={'detailCardText'}>{DataService.nullCheck(contentData.date)}</Card.Text>
            </Card.Body>

            <Card.Body>
                <Card.Title className={'detailCardTitle'}>작성자</Card.Title>
                <Card.Text className={'detailCardText'}>{DataService.nullCheck(contentData.writer)}</Card.Text>
            </Card.Body>

            <Card.Body>
                <Card.Title className={'detailCardTitle'}>세부내용</Card.Title>
                <Card.Text className={'detailCardText'}>{DataService.nullCheck(contentData.detail)}</Card.Text>
            </Card.Body>

            <Card.Body>
                <ButtonGroup className={'contentButtonAlign'}>
                    <Button onClick={e => {
                        navigate('/')
                        e.preventDefault()
                    }}>취소
                    </Button>
                </ButtonGroup>
                <ButtonGroup className={'me-2 contentButtonAlign'}>
                    <Button>수정</Button>
                </ButtonGroup>
            </Card.Body>
            <Card.Footer>
                <Card.Body>
                    <Card.Text>댓글입력</Card.Text>
                    <FormControl ref={commentInput} placeholder={'댓글을 입력해주세요...'}></FormControl>
                    <ButtonGroup className={'contentButtonAlign mt-2'}>
                        <Button onClick={() => addComment()}>등록</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card.Footer>
        </Card>
    )
}

export default DetailPage