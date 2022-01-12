import React, {useEffect, useState} from 'react'
import {ContentServiceApi} from '../util/ApiService'

const HomePage = props => {

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
            <div id={item.id}>{item.title}</div>
        ))
    }

    return (
        <div>{viewData(contentList)}</div>
    )
}
export default HomePage