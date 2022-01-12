import React, {useState} from 'react'
import BoardServiceApi from "../util/ApiService";

import {HomePage} from "../page";


const Home = props => {

    const [contentList, setContentList] = useState([])

    const fetchData = () => {
        BoardServiceApi.getContentList().then(r => console.log("get content list"));
    }

    return <HomePage/>
}

export default Home