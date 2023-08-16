import React, { useState, useEffect } from 'react';

function RcodeSelect({ params, setParams }) {

  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);

  // 시/군 선택 이벤트
  const handleCitySelectChange = (event) => {
    setParams({
      ...params,
      schSido: event.target.value,
    });
  };

  // 시/군/구 선택 이벤트
  const handleDistrictSelectChange = (event) => {
    setParams({
      ...params,
      schSign1: event.target.value,
    });
  };

  useEffect(() => {
		const fetchRegion = async() => {
          const res = await fetch('/api/region', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          });
          const result = res.json();
          return result;
        }
        
        fetchRegion().then(res => {
          const cityMap = new Map();
          const districtArr = new Array();
          res.map((item) => {
            cityMap.set(item.city, item.cityCode);
            districtArr.push([item.cityCode, item.district, item.districtCode]);
          })
          setCity([...cityMap]);
          setDistrict(districtArr);
        });
    }, []);

  return (
    <>
      <select value={params.schSido} onChange={handleCitySelectChange}>
        <option value="" disabled>
          시/도
        </option>
        {city.map((option) => (
          <option key={option[0]} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </select>
      <select value={params.schSign1} onChange={handleDistrictSelectChange}>
        <option value="" disabled>
          시/군/구
        </option>
        {district.map((option) => (
          option[0] == params.schSido && 
          <option key={option[1]} value={option[2]}>
            {option[1]} 
          </option>
        ))}
      </select>
    </>
  );
}

export default RcodeSelect