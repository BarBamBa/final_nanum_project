import { useState, useEffect, useCallback } from 'react';

// 기본 옵션
const defOption = {
  root: null,
  threshold: 1.0,
  rootMargin: '0px',
};

// 커스텀 훅, 관찰 대상을 ref 값으로 가져와 state로 관리한다.
const IntersectionObserver = (onIntersect, option) => {
  const [ref, setRef] = useState(null);
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);

  // 관찰자의 행동로직을 구현
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defOption,
        ...option
      });
      observer.observe(ref);
    }
    return () => observer  && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
}

export default IntersectionObserver