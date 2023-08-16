import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import '../scss/Map.scss';

const { kakao } = window;

function MapBox({ data }) {

  const [marker, setMarker] = useState([]);

  useEffect(() => {
    const fetchMarker = async() => {
      const res = await fetch('/api/marker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: data,
        })
      });
      const result = res.json();
      return result;
    };

    fetchMarker()
      .then(res => {
        setMarker(res);
        console.log(res);
      });
  }, []);

  return (
    <Map 
        //  center={marker[0].latlng}   // 지도의 중심 좌표
        // center={{ lat: marker[0].latlng.lat,
        //    lng: marker[0].latlng.lng }}   // 지도의 중심 좌표
        center={{ lat: '37.48682', lng: '126.89082' }}   // 지도의 중심 좌표
        style={{ width: '1000px', height: '600px' }} // 지도 크기
        level={3}                                   // 지도 확대 레벨
        onLoad={console.log(marker)}
      >
        {marker.map((pos) => {
          <MapMarker 
            key={`${pos.title}-${pos.latlng}`}
            position={pos.latlng}
            // image={{
            //   src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            //   size: { width: 24, height: 35 },
            // }}
            title={pos.title}
          />
        })}
    </Map>
  )
}

export default MapBox