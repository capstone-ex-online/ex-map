import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import lock_on from '../assets/lock_on.png'
import lock_off from '../assets/lock_off.png'
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
  }
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




  Axios.get('http://localhost:5000/api/exhibition')
  .then((response) => {
    // console.log(response.data)
    makeMarkers(response.data)
  })

  function makeMarkers(array) {
    for(let i = 0; i < array.length; i++) {
      let imageSize = new kakao.maps.Size(24, 35)
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

      let latitude = parseFloat(array[i].gpsY._text) 
      let longitude = parseFloat(array[i].gpsX._text)
      let position = new kakao.maps.LatLng(latitude, longitude)

      let marker = new kakao.maps.Marker({
        map: map,
        position: position,
        image: markerImage
      })
      let object = {
        marker: marker,
        data: {
          seq: array[i].seq._text,
          title: array[i].title._text,
          startDate: array[i].startDate._text,
          endDate: array[i].endDate._text,
          thumbnail: array[i].thumbnail._text
        }
      }

      let temp_id = 'id' + i
      mappingList[temp_id] = object

      

    }

    // let values = Object.values(mappingList).data;
    
  }

  


  const [state, setState]=useState(false);


  function MapLock(){
    setState(!state);
    state ? setDraggable(true) : setDraggable(false);

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
              <button className='MapLockButton' onClick={MapLock}>
                {/* <image source= {state ? lock_on : lock_off }/> */}
                LOCK
              </button>
            </span>
          </MapBox>
          
        </MapContainer>
      </MapPageContainer>

  )
}

export default Map;