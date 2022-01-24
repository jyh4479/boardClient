import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {ContentServiceApi} from "../util/ApiService";
import {Button, ButtonGroup, Card} from "react-bootstrap";
import {DataService} from "../util/UtilService";
import "../style/DetailPage.scss"

const DetailPage = props => {
    const navigate = useNavigate()
    const {pageId} = useParams()
    const [contentData, setContentData] = useState([])

    useEffect(() => {
        fetchData().then(r => console.log("run fetchData"))
    }, [])

    const fetchData = async () => {
        const result = await ContentServiceApi.getContent(pageId)
        console.log(result)
        result ? setContentData(result) : setContentData([])
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

        </Card>
    )
}

export default DetailPage