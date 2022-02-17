const saveStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default saveStorage;
