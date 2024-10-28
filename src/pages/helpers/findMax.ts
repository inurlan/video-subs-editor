export const findMax = (arr: number[], start: number, end: number) => {
  let max = -Infinity;
  for (let i = start; i < end; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};
