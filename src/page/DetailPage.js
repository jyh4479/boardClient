import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {ContentServiceApi} from "../util/ApiService";
import {Button, ButtonGroup, Card, Container, FormControl, Row} from "react-bootstrap";
import {DataService, DateService} from "../util/UtilService";
import "../style/DetailPage.scss"

const DetailPage = props => {
    const navigate = useNavigate()
    const {pageId} = useParams()
    const [contentData, setContentData] = useState([])
    const [commentData, setCommentData] = useState([])
    const commentInput = React.createRef()

    useEffect(() => {
        fetchContentData().then(r => console.log("run fetchContentData"))
        fetchCommentData().then(r => console.log("run fetchCommentData"))
    }, [])

    const fetchContentData = async () => {
        const result = await ContentServiceApi.getContent(pageId)
        result ? setContentData(result) : setContentData([])
    }

    const fetchCommentData = async () => {
        const result = await ContentServiceApi.getCommentList(pageId)
        console.log(result)
        result ? setCommentData(result) : setCommentData([])
    }

    const deleteComment = async (id, commentNumber) => {
        const result = await ContentServiceApi.deleteComment(id, commentNumber)
        result ? alert('삭제 성공') : alert('삭제 실패')
        await fetchCommentData()
    }

    const viewCommentList = dataList => {
        const view = []
        dataList.forEach(item => {
            view.push(
                <Container className={'commentBubble mt-2'}>
                    <Row className={'commentTitle'}>
                        <span className={'commentName'}>{item.writer}</span>
                        <span className={'commentDate col-2'}>{item.date}</span>
                    </Row>
                    <Row>
                        <div className={'detailMargin'}>{item.detail}</div>
                    </Row>
                    <Row className={'optionContainer'}>
                        <span className={'commentOption'}>수정</span>
                        <span className={'commentOption'}
                              onClick={() => deleteComment(localStorage.getItem('user-id'), item.id)}>삭제</span>
                    </Row>
                </Container>
            )
        })
        return view
    }

    const addComment = async () => {
        const writer = localStorage.getItem('user-id')
        const detail = commentInput.current.value
        const date = DateService.getCurrentDate()

        const result = await ContentServiceApi.postComment(Number(pageId), writer, detail, date)
        result ? alert("댓글 등록 성공") : alert("댓글 등록 실패")
        fetchCommentData().then(r => console.log("run fetchCommentData"))

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


            <Card.Body>
                {viewCommentList(commentData)}
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