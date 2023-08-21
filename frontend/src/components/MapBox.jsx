import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { TfiClose } from 'react-icons/Tfi';
import '../scss/Map.scss';

function MapBox({ data }) {
  const { kakao } = window;
  const [marker, setMarker] = useState([]);
  const [check, setCheck] = useState('');
  // 모집상태 체크박스 선택시 true/false
  function handleCheck(key) {
    if(key === check) {
      setCheck("");
    } else {
      setCheck(key);
    }
  }

  // const locations = [
	// 	{ title: '민원실 내 업무 보조(민원안내 및 서식작성 지원)', latlng: { lat: 37.495506, lng: 126.88829 } },
	// 	{ title: '[구로종합사회복지관] 구로구를 깨끗하게 해줄 자원봉사자 모집', latlng: { lat: 37.48682, lng: 126.89082 } },
	// 	{ title: '[사단법인 따뜻한마음] 8월 초등학교 방과 후 돌봄', latlng: { lat: 37.497753, lng: 126.84349 } },
	// 	{ title: '시각장애인 도서낭독 자원 봉사 모집', latlng: { lat: 37.496624, lng: 126.89219 } },
	// ];

  useEffect(() => {
    const fetchMarker = async () => {
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

    fetchMarker().then(res => {
      setMarker(res);
      // console.log('markerList1:' + res);
      // console.log('markerList2:' + marker);
    });
    
  }, [data]);

  return (
    <Map
      // center={{ lat: marker[0].latlng.lat, lng: marker[0].latlng.lng }}
      // center={{ lat: 37.495506, lng: 126.88829 }}
      center={ marker.length > 0 ? { lat: marker[0].latlng.lat, lng: marker[0].latlng.lng } : { lat: 37.495506, lng: 126.88829 }} // 조건문을 이용해 setState 동작 전에 Map이 로드되어도 기본 값을 할당해 에러 방지, setState 동작 후 동적으로 중앙 위치 조정
      style={{ width: "1000px", height: "600px" }}
      level={6}
    >
      {marker.map((position, index) => (
        <>
          <MapMarker onClick={() => handleCheck(index)}
            key={`${position.title}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
          />
          { check === index && <CustomOverlayMap
            key={`${position.title}-${position.latlng}`}
            position={position.latlng}
          >
            <div className="wrap">
              <div className="info">
                <div className="close"
                  onClick={() => handleCheck(index)}
                  title="닫기">
                      <TfiClose className='TfiClose'/>
                    </div>
                <div className="title">{position.title}</div>
                <div className="body">
                  <div className="desc">{position.postAdres}</div>
                  <Link to={'/vdetail/' + `${position.progrmRegistNo}`} state={{ progrmRegistNo : position.progrmRegistNo }}
                  title="상세보기" className='goToVolunteer'>
                    상세보기
                    <IoIosArrowForward className='arrowFoward'/>
                  </Link>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        }
        </>
      ))}
    </Map>
  )
}

export default MapBox