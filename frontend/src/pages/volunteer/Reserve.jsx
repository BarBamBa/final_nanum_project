import React, { useState } from 'react'
import CalendarReserve from '../../components/CalendarReserve'

function Reserve() {
  const [receivedData, setReceivedData] = useState(null);

  const handleReceiveData = (sendData) => {
    setReceivedData(sendData);
  }
  console.log(receivedData);

  return (
  <>
    <div className='pageTitle'><span>봉사활동 신청하기</span></div>
    <main>
      {
        receivedData === null ? 
          <CalendarReserve sendDataToReserve={handleReceiveData} />
          : <div>정보받았다!</div>
      }
    </main>
  </>
  )
}

export default Reserve