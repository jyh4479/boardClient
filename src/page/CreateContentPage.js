import React from 'react'
import {useNavigate} from 'react-router-dom'
import {DateService} from '../util/UtilService'
import '../style/Content.scss'
import {ContentServiceApi} from "../util/ApiService";

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
        <div>
            <form onSubmit={createContent}>
                <div>
                    <div>작성자</div>
                    <input ref={writerInput} value={userId}/>
                </div>

                <div>
                    <div>날짜</div>
                    <input ref={dateInput} value={DateService.getCurrentDate()}/>
                </div>

                <div>
                    <div>제목</div>
                    <input ref={titleInput} placeholder={'제목을 입력해주세요...'}/>
                </div>

                <div>
                    <div>내용</div>
                    <textarea ref={detailInput} className={'contentArea'} placeholder={'내용을 입력해주세요...'}/>
                </div>
            </form>

            <button type={'submit'} onClick={createContent}>등록</button>
            <button onClick={e => {
                navigate('/')
                e.preventDefault()
            }}>취소
            </button>
        </div>
    )
}

export default CreateContentPage