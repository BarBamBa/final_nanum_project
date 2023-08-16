import React, { useState, useEffect } from 'react';

function VCodeSelect() {

  const [large, setLarge] = useState([]);
  const [small, setSmall] = useState([]);
  const [selected, setSelected] = useState(
    {
      large: '',
      small: '',
    }
  );
  const handleLargeSelectChange = (event) => {
    setSelected({
      ...selected,
      large: event.target.value
    });
    console.log(selected);
  };

  const handleSmallSelectChange = (event) => {
    setSelected({
      ...selected,
      small: event.target.value
    });
    console.log(selected);
  };

  useEffect(() => {
		const fetchCode = async() => {
          const res = await fetch('/api/volunteer', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          });
          const result = res.json();
          return result;
        }
        
        fetchCode().then(res => {
          const largeMap = new Map();
          const smallArr = new Array();
          res.map((item) => {
            largeMap.set(item.large, item.largeCode);
            smallArr.push([item.largeCode, item.small, item.smallCode]);
          })
          setLarge([...largeMap]);
          setSmall(smallArr);
        });
    }, []);

  return (
    <>
      {/* 상위분야코드 셀렉트 박스 */}
      <select value={params.schupperClCode} onChange={handleLargeSelectChange}>
        <option value="" disabled>
          상위분야코드
        </option>
        {large.map((option) => (
          <option key={option[0]} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </select>
      {/* 하위분야코드 셀렉트 박스 */}
      <select value={params.schnanmClCode} onChange={handleSmallSelectChange}>HY
        <option value="" disabled>
          분야코드
        </option>
        {small.map((option) => (
          option[0] == params.schupperClCode && 
          <option key={option[1]} value={option[2]}>
            {option[1]} 
          </option>
        ))}
      </select>
    </>
  );
}

export default VCodeSelect