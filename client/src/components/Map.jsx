import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'

const { kakao } = window;



const MapContainer = styled.div`
  width: 90%;
  height: 90%;
  display: inline-block;
`;

const MapBox = styled.div`
  width: 1300px;
  height: 765px;

  #map {
    width: 1300px;
    height: 765px;
  }
`

function Map() {
  const [map, setMap] = useState(null);

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
    kakaoMap.setDraggable(draggable);    
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
    }
  }
  

  return (
    <MapContainer>
      <MapBox>
        <div id='map'></div>
      </MapBox>
    </MapContainer>
  )
}

export default Map;