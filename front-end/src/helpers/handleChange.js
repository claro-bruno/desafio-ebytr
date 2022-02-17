const handleChange = (...args) => ({ target: value }) => {
  args.forEach((callback) => {
    callback(value);
  });
};

export default handleChange;
