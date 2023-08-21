import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import CalendarReserve from '../../components/CalenderReserve'

function Reserve() {
  const [receivedData, setReceivedData] = useState(null);

  const handleReceiveData = (sendData) => {
    setReceivedData(sendData);
  }
  
  function stringFormat(str) {
    const string = str + "";
    const year = string.substring(0, 4);
    const month = string.substring(4, 6);
    const date = string.substring(6, string.length);
    return year + "-" + month + "-" + date;
}

  return (
  <>
    <div className='pageTitle'><span>봉사활동 신청하기</span></div>
    <main>
      {
        receivedData === null ? 
          <CalendarReserve sendDataToReserve={handleReceiveData} />
          : 
          <div className='reserveConfirm'>
            <div className='reserveInfo'>
              <div className='reserveDetail1'>
                  <span><strong>모집기관</strong> : {receivedData.data.nanmmbyNm + "  "}</span>
                  <span><strong>활동명</strong> : {receivedData.data.progrmSj + "  "}</span>
                  <span><strong>장소</strong> : {receivedData.data.actPlace + "  "}</span>                      
              </div>
              <div className='reserveDetail2'>
                  <span><strong>봉사기간</strong> : {stringFormat(receivedData.data.progrmBgnde)} ~ {stringFormat(receivedData.data.progrmEndde)}</span>
                  <span><strong>봉사시간</strong> : {receivedData.data.actBeginTm}시 ~ {receivedData.data.actEndTm}시</span>
                  <span><strong>봉사분야</strong> : {receivedData.data.srvcClCode}</span>
              </div>
              <div className='reserveDetail3'>
                <span><strong>선택일자</strong> : {format(receivedData.selectedDay, 'yyyy-MM-dd')}</span>
              </div>
              <div className='reserveChoose'>
                <span><strong>선택하신 일자가 맞습니까?</strong></span>
              </div>
              <div className='btnChoose'>
                <button id='btnConfirm'>네</button>
                <button id='btnDeny' onClick={() => setReceivedData(null)}>아니오</button>
              </div>
            </div>
          </div>
      }
    </main>
  </>
  )
}

export default Reserve