import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

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

  //처음 지도 그리기
  useEffect(()=>{
      const container = document.getElementById('map');
      const options = { center: new kakao.maps.LatLng(37.4945067, 126.959837), level: 3 };
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



  return (
    <MapContainer>
      <MapBox>
        <div id='map'></div>
      </MapBox>
    </MapContainer>
  )
}

export default Map;