const milisecond = 1000;
const delay = (second: number) =>
  new Promise((resolve) => setTimeout(resolve, second * milisecond));

export default delay;
