const lib = {
  rounding: (value) => {
    return Math.floor(value * 10 ** 4) / 10 ** 4;
  },
};

export default lib;
