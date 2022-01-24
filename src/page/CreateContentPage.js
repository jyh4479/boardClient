import React from 'react'
import {useNavigate} from 'react-router-dom'
import {DateService} from '../util/UtilService'
import '../style/Content.scss'
import {ContentServiceApi} from "../util/ApiService";
import {Button, ButtonGroup, Card, FormControl, FormGroup, FormLabel} from 'react-bootstrap'

const CreateContentPage = () => {

    const navigate = useNavigate()

    const writerInput = React.createRef()
    const titleInput = React.createRef()
    const dateInput = React.createRef()
    const detailInput = React.createRef()

    const userId = localStorage.getItem('user-id')

    const createContent = () => {
        if (ContentServiceApi.postContent(
            writerInput.current.value,
            titleInput.current.value,
            detailInput.current.value,
            dateInput.current.value
        )) {
            alert('등록 성공')
            navigate('/')
        } else {
            alert('등록 실패')
        }

    }

    return (
        <Card className={'contentCard'}>
            <Card.Header>게시판 등록</Card.Header>
            <Card.Body>
                <FormGroup onSubmit={createContent}>
                    <div>
                        <FormLabel>작성자</FormLabel>
                        <FormControl ref={writerInput} value={userId}/>
                    </div>

                    <div>
                        <FormLabel>날짜</FormLabel>
                        <FormControl ref={dateInput} value={DateService.getCurrentDate()}/>
                    </div>

                    <div>
                        <FormLabel>제목</FormLabel>
                        <FormControl ref={titleInput} placeholder={'제목을 입력해주세요...'}/>
                    </div>

                    <div>
                        <FormLabel>내용</FormLabel>
                        <FormControl as={'textarea'} row={5} ref={detailInput} className={'contentArea'}
                                     placeholder={'내용을 입력해주세요...'}/>
                    </div>
                </FormGroup>
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
                    <Button type={'submit'} onClick={createContent}>등록</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default CreateContentPage