const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return localStorage.getItem(key);
  }
};

export default getStorage;
