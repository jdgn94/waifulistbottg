const getRamdomIntegerNumber = (min: number, max: number) => {
  const ramdomNumber = Math.round(Math.random() * (max - min) + min);

  return ramdomNumber;
};

export default { getRamdomIntegerNumber };
