const milisecond = 1000;
const delay = async (second: number) => {
  await new Promise((resolve) => setTimeout(resolve, second * milisecond));
  return true;
};

export default delay;
