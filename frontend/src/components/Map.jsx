import { useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import '../scss/Map.scss';

const { kakao } = window;

function MapBox() {

  useEffect(() => {
    
  }, [])
  

  return (
    <Map 
        center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
        style={{ width: '1000px', height: '600px' }} // 지도 크기
        level={3}                                   // 지도 확대 레벨
      >
    </Map>
  )
}

export default MapBox