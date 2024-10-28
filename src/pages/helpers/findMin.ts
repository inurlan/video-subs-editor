export const findMin = (arr: number[], start: number, end: number) => {
  let min = Infinity;
  for (let i = start; i < end; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
};
