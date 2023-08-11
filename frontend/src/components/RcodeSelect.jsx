import React, { useEffect, useState } from 'react';

function RcodeSelect() {

  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selected, setSelected] = useState(
    {
      city: '',
      district: '',
    }
  );
  const handleCitySelectChange = (event) => {
    setSelected({
      ...selected,
      city: event.target.value
    });
    console.log(selected);
  };

  const handleDistrictSelectChange = (event) => {
    setSelected({
      ...selected,
      district: event.target.value
    });
    console.log(selected);
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
      <select value={selected.city} onChange={handleCitySelectChange}>
        <option value="" disabled>
          시/도
        </option>
        {city.map((option) => (
          <option key={option[0]} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </select>
      <select value={selected.district} onChange={handleDistrictSelectChange}>
        <option value="" disabled>
          시/군/구
        </option>
        {district.map((option) => (
          option[0] == selected.city && 
          <option key={option[1]} value={option[2]}>
            {option[1]} 
          </option>
        ))}
      </select>
    </>
  );
}

export default RcodeSelect