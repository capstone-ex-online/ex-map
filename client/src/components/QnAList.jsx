import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Item from './QuestionItem'
import styled from 'styled-components'
import Pagination from "./Pagination";
import axios from 'axios';

const QnAListContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #EDEDED;
  overflow: auto;
`;

const QnAListForm = styled.div`
  position: absolute;
  height: 100vh;
  width: 900px;
  left: 50%;
  transform: translateX(-50%);

  .write-question-btn {
    position: absolute;
    width: 100px;
    height: 35px;
    right: 10px;
    margin-top: 35px;

    border-radius: 40px;
    border: none;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    text-align: center;
    color: #ffffff;
    background-color: #BA9F77;
  }

  .write-question-btn:hover {
    background: #BA9F77;
    cursor: pointer;
    transform: translateY(-1px);
  }

  .question-pagination {
    position: absolute;
    margin-top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }

  .no-question {
    position: relative;
    width: 500px;
    height: 50px;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 4px 4px 4px rgba(0,0,0,0.25);
    border-radius: 10px;
    border: none;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    background-color: #BA9F77;
  }
`;


function QnAList() {
  const [qnaList, setQnAList] = useState([])
  const [limit] = useState(3);  //한 페이지에 질문 몇개씩 나오는지
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const offset = (page - 1) * limit;
  
  axios.post('http://localhost:5000/api/qna')
    .then((response) => {
      if(qnaList.length == 0) {
        setQnAList(response.data);
      }
    })

  const clickPostQuestion = (e) => {
    navigate('/question/post');
  }

  return (
    <QnAListContainer>
        <QnAListForm>
          {qnaList.length !== 0 ?
            qnaList.slice(offset, offset+limit).map((item, idx) =>
              <div key={idx}>
                <Item item = {item}/>
              </div>
            )
            :
            <div className='no-question'>작성된 글이 없습니다.</div>
          }
          <button className='write-question-btn' onClick={clickPostQuestion}>글쓰기</button>
          <div className='question-pagination'>
            <Pagination
              total={qnaList.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        </QnAListForm>
    </QnAListContainer>
  );
}

export default QnAList;