import { useState, useEffect } from "react";

const getInitialCounter = () =>
  new Promise((res) => {
    setTimeout(() => res(10), 1000);
  });

export const useApi = () => {
  const [initialCounter, setInitialCounter] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInitialCounter().then((initialCount) => {
      setInitialCounter(initialCount);
      setLoading(false);
    });
  }, []);
  return { loading, initialCounter, setInitialCounter };
};

// ========================= if call endpoint api =========================
// export const useApi = (url) => {
//     const [data, setData] = useState(null);

//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//       setLoading(true);
// fetch(url)
//   .then((resp) => resp.json())
//   .then((data) => {
//     setLoading(data);
//     setData(data);
//   });
//     }, []);
//     return { loading, data  };
//   };

// ========================= When use this hook =========================
// const {loading, data} = useApi("http://.....")

