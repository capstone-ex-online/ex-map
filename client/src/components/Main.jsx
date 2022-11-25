import styled from 'styled-components'
import React,{useState} from 'react'
import MainHeader from './MainHeader'
import first_main from '../assets/first_main.jpg'
import second_main from '../assets/second_main.png'
import third_main from '../assets/third_main.jpg'
import forth_main from '../assets/forth_main.png'
import fifth_main from '../assets/fifth_main.jpg'

const MainContainer=styled.div`
    display: flex;
    flex-direction: column;
    width: 1440;
    height: 1024;
`;

const Slide=styled.div`
    display: flex;
    flex-direction: column;
    height:933px;
`;

const BigText=styled.div`
  font-family:'Inter';
  font-size: 50px;
  font-weight: 700;
  line-height: 61px;
  letter-spacing: 0em;
  text-align: center;
  color: white;
`;

const SmallText=styled.div`
  font-family: 'Inter';
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
  color: white;
`;

const PrevNext=styled.div`
  position:absolute;
  color:white;
  text-align: center;
  top:350px;
  font-size: 40px;
  cursor: pointer;
`;

const Prev=styled.div`
  position:absolute;
  left:20px;
`;

const Next=styled.div`
  position:absolute;
  left:1420px;
`;

function SlideImg(props){
  const imgstyle={
    "height":"630px",
    "padding":"0",
    "margin":"0",
    "filter":props.imgInfo.filter
  };
  return <img src={props.imgInfo.src} alt="" style={imgstyle}></img>
}

const Circle=styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  left: 520px;
  top: 200px;
  background: white;
  border-radius: 50%;
`;

function SlideImgText(props){
  const textstyle={
    "position":"absolute",
    "top":props.imgtextInfo.top,
    "left":props.imgtextInfo.left,
    "width":props.imgtextInfo.width, 
    "height":props.imgtextInfo.height,

    "fontFamily":"Inter",
    "fontSize": props.imgtextInfo.fsize,
    "fontWeight": props.imgtextInfo.weight,
    "lineHeight": "97px",
    "color":props.imgtextInfo.color,
    "textAlign":props.imgtextInfo.align,
    "whiteSpace":"pre-wrap"
  };
  if(props.imgtextInfo.id===0)
    return <Circle><div style={textstyle}>{props.imgtextInfo.text}</div></Circle>
  return <div style={textstyle}>{props.imgtextInfo.text}</div>
}

function SlideText(props){
  
  const textboxstyle={
    "display": "flex",
    "height":"305px",
    "flexDirection": "column",
    "justifyContent" : "center",
    "backgroundColor": "#EDCB98"
  }
  return <div style={textboxstyle}>
    <BigText>{props.textInfo.t1}</BigText>
    <br></br>
    <SmallText>{props.textInfo.t2}</SmallText>
    <SmallText>{props.textInfo.t3}</SmallText>
  </div>
}

function Controller(props){
  return <PrevNext>
    <Prev onClick={()=>{
      if(props.id===0)
        props.onChangeMode(4);
      else
        props.onChangeMode(props.id-1);
    }
    }>&lang;</Prev>
    <Next onClick={()=>{
      if(props.id===4)
        props.onChangeMode(0);
      else
      props.onChangeMode(props.id+1)
    }}>&rang;</Next>
  </PrevNext>
}

function Main({...loginUserProps}) {

  const imgInfo=[
    {id:0,src:first_main, filter:"brightness(100%)"},
    {id:1,src:second_main, filter:"brightness(50%)"},
    {id:2,src:third_main, filter:"brightness(60%)"},
    {id:3,src:forth_main, filter:"brightness(60%)"},
    {id:4,src:fifth_main, filter:"brightness(60%)"}
  ]

  const imgtextInfo=[
    {id:0,text:"나 만 의\n미술 · 전시\n아카이브", fsize:"60px", weight:"400",width:"400px", height:"400px", top:"53px",left:"0px", color:"black",align:"center"},
    {id:1,text:"지도 뷰를 통해\n전국 전시회를 한눈에!", fsize:"80px", weight:"700", width:"830px", height:"214px", top:"307px", left:"331px", color:"white",align:"center"},
    {id:2,text:"별점·후기를\n공유하자!", fsize:"80px", weight:"700",width:"430px", height:"385px", top:"194px", left:"929px", color:"black",align:"right"},
    {id:3,text:"나만의\n개인전을\n알릴 기회!", fsize:"80px", weight:"700", width:"400px", height:"385px", top:"265px", left:"200px", color:"black",align:"left"},
    {id:4,text:"전문 도슨트와의\nQ&A를 주고받자!", fsize:"80px", weight:"700", width:"728px", height:"436px", top:"211px", left:"659px", color:"white",align:"right"}
  ]

  const textInfo=[
    {id:0,t1:'지도 뷰를 통해 전국 전시회를 한눈에!',t2:'나만의 개인전을 홍보하고',t3:'전문 도슨트와의 Q&A를 주고받자!'},
    {id:1,t1:'VIEW THE MAP',t2:'지도를 통해 인극 전시회를 확인하고',t3:'해당 전시회장으로 가는 길을 알 수 있습니다.'},
    {id:2,t1:'RATING & REVIEW',t2:'전시회의 별점·후기를 등록하고',t3:'다른 사람들과 공유할 수 있습니다.'},
    {id:3,t1:'EXHIBITION PROMOTION',t2:'신인 문화·예술인들에게',t3:'개인전을 홍보할 수 있는 기회를 제공합니다.'},
    {id:4,t1:'Q&A WITH DOCENT',t2:'작품에 대해 궁금한 점을 질문하면,',t3:'전문 도슨트가 답변해주는 서비스를 제공합니다.'}
  ]
  
  const [id,setId]=useState(0);

  return (
    <MainContainer>
      <MainHeader {...loginUserProps} ></MainHeader>
      <Slide>
        <SlideImg imgInfo={imgInfo[id]}></SlideImg>
        <SlideImgText imgtextInfo={imgtextInfo[id]}></SlideImgText>
        <SlideText textInfo={textInfo[id]}></SlideText>
        <Controller id={id} onChangeMode={(id)=>{
          setId(id);
        }}></Controller>
      </Slide>
    </MainContainer>
  );
}
  
  export default Main;