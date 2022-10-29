import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'

const { kakao } = window;

let mappingList = {};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const MapBox = styled.div`
  width: 1099px;
  height: 865px;

  #map {
    width: 1099px;
    height: 865px;
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
      setMap(kakaoMap);
  },[])

  Axios.get('http://localhost:5000/api/exhibition')
  .then((response) => {
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
        image: markerImage,
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
  }
  
  return (
    <MapContainer>
      <MapBox>
        <div id='map'></div>
      </MapBox>
      <ExhibitionList
        exhiList={exhiList}
      >
        {exhiList && exhiList.map((exhibition, index) => {
          return (
            <div key={index}>
              <h2>title: {exhibition.title}</h2>
              <h2>startDate: {exhibition.startDate}</h2>
              <h2>endDate: {exhibition.endDate}</h2>
              <div style={{width: 100 + 'px', 
                height: 100 + 'px', 
                backgroundImage: `url(${exhibition.thumbnail})`,
                backgroundSize: 100 + 'px'}}  ></div>
            </div>
          )
        })}
      </ExhibitionList>
    </MapContainer>
  )
}

export default Map;