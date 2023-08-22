import { useEffect, useCallback, useRef } from 'react';


/* intersection observer */
/* 관찰자(observer), 관찰 대상(entry), 옵션(조건), 콜백함수(로직) 로 구성 */

// 기본 옵션
const defOptions  = {
  root: null,
  threshold: 0.3,
  rootMargin: '0px',
};

// 커스텀 훅, 관찰 대상을 ref로 가져와 관찰자를 생성한다.
/*컴포넌트 렌더가 완료됨에 따라 observer가 생성되어야 하므로 useEffect를 활용해야 한다. 
  또한 관찰 대상이 생성되기 전에 observe를 시작할 수 없으므로 조건문을 넣어준다.*/
  const useIntersectionObserver = (onIntersect) => {
    const targetRef = useRef(null);
  
    const checkIntersect = useCallback(([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        onIntersect(entry, observer);
      }
    }, [onIntersect]);

  // 관찰자의 행동로직을 구현
  useEffect(() => {
    let observer;

    if (targetRef.current) {
      observer = new IntersectionObserver(checkIntersect, defOptions);
      observer.observe(targetRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [checkIntersect]);

  return targetRef;
};

export default useIntersectionObserver