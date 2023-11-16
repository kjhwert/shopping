const apiFetch = <T>(url: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then(resolve);
  });
};

export default apiFetch;
