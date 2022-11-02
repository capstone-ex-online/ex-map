import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import lock_on from '../assets/lock_on.png'
import lock_off from '../assets/lock_off.png'
import zoom_in from '../assets/plus.png'
import zoom_off from '../assets/minus.png'
import exampleImg from '../assets/first_main.jpg'


const { kakao } = window;

let mappingList = {};


const MapPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const HeaderContainer = styled.div`
  width:1440px;
  height:91px;
  border: 1px solid black;
`;



const MapContainer = styled.div`
  display:flex;
  border: 1px solid black;
  width:1440px;
  height:933px;
`;

const ListBox = styled.div`

  width: 340px;
  height: 933px;
  border: 1px solid black;
  overflow-y:scroll;
  overflow-x:hidden;

`;

const MapBox = styled.div`
  width: 1100px;
  height: 933px;
  border: 1px solid black;

  #map {
    width: 1100px;
    height: 865px;
    border: 1px solid black;
  }

  #setting {
    width:1100px;
    height:68px;

    
  
    

    .MapLockButton{
      margin-top : 20px;
      margin-left : 20px;
      width : 28px;
      height : 28px;
      cursor: pointer;

    }

    .MapZoomIn{
      margin-top : 20px;
      margin-left : 20px;
      width : 28px;
      height : 28px;
      cursor: pointer;
      float : right;
    }
    
    .MapZoomOut{
      margin-top : 20px;
      margin-left : 20px;
      margin-right : 27px;
      width : 28px;
      height : 28px;
      right : 27px;
      cursor: pointer;
      float : right;
    }
  }
`

const ExhibitionList = styled.div`
  width: 500px;
  height: 500px;
`

function Map() {
  const [map, setMap] = useState(null);
  const [exhiList, setExhiList] = useState([])

  let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"

  //처음 지도 그리기
  useEffect(()=>{
      const container = document.getElementById('map');

      const options = { center: new kakao.maps.LatLng(37.5668, 126.9786), level: 7 };

      const kakaoMap = new kakao.maps.Map(container, options);

      const mapTypeControl = new kakao.maps.MapTypeControl(); // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      
      const zoomControl = new kakao.maps.ZoomControl(); // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      setMap(kakaoMap);
  },[])


  function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);   
  }

  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomIn() {
    map.setLevel(map.getLevel() - 1);
  }

  // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomOut() {
    map.setLevel(map.getLevel() + 1);
  }

  const [MapLockstate, MapLocksetState]=useState(false);

  function MapLock(){
    MapLocksetState(!MapLockstate);
    MapLockstate ? setDraggable(true) : setDraggable(false);

  }





  Axios.get('http://localhost:5000/api/exhibition')
  .then((response) => {
    console.log(response.data)
    makeMarkers(response.data)
  })

  function makeMarkers(array) {
    for(let i = 0; i < array.length; i++) {
      let imageSize = new kakao.maps.Size(24, 35)
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

      let latitude = array[i].ex_gpsy 
      let longitude = array[i].ex_gpsx
      let position = new kakao.maps.LatLng(latitude, longitude)

      let marker = new kakao.maps.Marker({
        map: map,
        position: position,
        image: markerImage,
      })

      // let object = {
      //   marker: marker,
      //   data: {
      //     seq: array[i].seq._text,
      //     title: array[i].title._text,
      //     startDate: array[i].startDate._text,
      //     endDate: array[i].endDate._text,
      //     thumbnail: array[i].thumbnail._text


      let object = {
        marker: marker,
        data: {
          seq: array[i].ex_id,
          title: array[i].ex_title,
          startDate: array[i].ex_start,
          endDate: array[i].ex_end,
          thumbnail: array[i].ex_img

        }
      }

      let temp_id = 'id' + i
      mappingList[temp_id] = object
      
      kakao.maps.event.addListener(marker, 'click', function() {    
        setExhiList([])    
        let values = Object.values(mappingList)

        for(let j = 0; j < values.length; j++) {
          if(values[j].marker === marker) {
            // if(exhiList.length === 0) {
            //   setExhiList(values[j].data)
            //   console.log(exhiList)
            // } else {
            //   let temp_arr = new Array(exhiList)
            //   temp_arr.push(values[j].data)
            //   setExhiList(temp_arr)
            //   console.log(exhiList)
            // }
            setExhiList(new Array(values[j].data))
            console.log(exhiList)
          }
        }

      })
    }

    // let values = Object.values(mappingList).data;
    
  }

  


  

  var ExhibisionList=
  [
    {
      "ex_name" : "이완개인전",
      "start_date" : "2022.09.03",
      "finish_date" : "2022.10.03",
      "location" : "Space-X",
      "img_src" : exampleImg
    },
    {
      "ex_name" : "한자 전시회",
      "start_date" : "2022.09.07",
      "finish_date" : "2022.10.24",
      "location" : "숭실대학교",
      "img_src" : exampleImg
    },
    {
      "ex_name" : "곽훈:Halaayt",
      "start_date" : "2022.09.21",
      "finish_date" : "2022.10.29",
      "location" : "Space-Z",
      "img_src" : exampleImg
    },
    {
      "ex_name" : "최은혜:Variable",
      "start_date" : "2022.09.15",
      "finish_date" : "2022.10.31",
      "location" : "Space-V",
      "img_src" : exampleImg
    },
    {
      "ex_name" : "5번째 전시회",
      "start_date" : "2022.10.03",
      "finish_date" : "2022.10.13",
      "location" : "Space-R",
      "img_src" : exampleImg
    },
    {
      "ex_name" : "6번째 전시회",
      "start_date" : "2022.11.03",
      "finish_date" : "2022.11.05",
      "location" : "Space-Y",
      "img_src" : exampleImg
    }
  ]


  



  
  




  return (
      <MapPageContainer>
        <HeaderContainer>
        </HeaderContainer>
        <MapContainer>
          <ListBox id="listbox">
            {ExhibisionList.map((exhibision,index) => {
              const list = (
                <>
                  <ul id={index}>
                    <img src={exhibision.img_src} width="100px"></img>
                    <li>Name: {exhibision.ex_name}</li>
                    <li>Start_Date:{exhibision.start_date}</li>
                    <li>Finish_Date: {exhibision.finish_date}</li>     {/* 예시데이터 출력 */}
                  </ul>
                  <hr />
                </>
              );
              return list;
            })}

            {/* {Object.values(mappingList).map((exhibision) => {
              const list = (
                <>
                  <ul>
                    <img src={exhibision.data.thumbnail._text} width="100px"></img> //api 데이터 출력 미완성
                    <li>Name: {exhibision.data.title._text}</li>
                    <li>Start_Date:{exhibision.data.startDate._text}</li>
                    <li>Finish_Date: {exhibision.data.endDate._text}</li>
                  </ul>
                  <hr />
                </>
              );
              return list;
            })} */}

          </ListBox>
          {/* <script>
            const $listbox = document.getElementById('listbox');   //미완성 부분입니다
    
            $fruits.addEventListener('click', e => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // "이벤트 단계: 3" = 버블링 단계
      console.log(`이벤트 타깃: ${e.target}`); // "이벤트 타깃: [object HTMLLIElement]"
      console.log(`커런트 타깃: ${e.currentTarget}`); // "커런트 타깃: [object HTMLUListElement]"
    });
          </script> */} 

          <MapBox>
            <div id='map'></div>
            <span id='setting'>
              <img class='MapLockButton'src={MapLockstate ? lock_on : lock_off } alt="Lock Button" onClick={MapLock}></img>
              <img class='MapZoomOut'src={zoom_off} alt="Zoom Off Button" onClick={zoomOut}></img>
              <img class='MapZoomIn'src={zoom_in} alt="Zoom In Button" onClick={zoomIn}></img>

            </span>
          </MapBox>
          
        </MapContainer>
      </MapPageContainer>


    // <MapPageContainer>
    //   <MapBox>
    //     <div id='map'></div>
    //   </MapBox>
    //   <ExhibitionList
    //     exhiList={exhiList}
    //   >
    //     {exhiList && exhiList.map((exhibition, index) => {
    //       return (
    //         <div key={index}>
    //           <h2>title: {exhibition.title}</h2>
    //           <h2>startDate: {exhibition.startDate}</h2>
    //           <h2>endDate: {exhibition.endDate}</h2>
    //           <div style={{width: 100 + 'px', 
    //             height: 100 + 'px', 
    //             backgroundImage: `url(${exhibition.thumbnail})`,
    //             backgroundSize: 100 + 'px'}}  ></div>
    //         </div>
    //       )
    //     })}
    //   </ExhibitionList>
    // </MapPageContainer>

  )
}

export default Map;