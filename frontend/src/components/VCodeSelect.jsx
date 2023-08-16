import { useState, useEffect } from 'react';

function VCodeSelect({ params, setParams }) {

  const [large, setLarge] = useState([]);
  const [small, setSmall] = useState([]);

  // 상위분야코드 선택 이벤트
  const handleLargeSelectChange = (event) => {
    setParams({
      ...params,
      schupperClCode: event.target.value,
    });
  };

  // 하위분야코드 선택 이벤트
  const handleSmallSelectChange = (event) => {
    setParams({
      ...params,
      schnanmClCode: event.target.value,
    });
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
      <select value={params.schnanmClCode} onChange={handleSmallSelectChange}>
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