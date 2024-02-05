export default function Reduce(valueArray: number[]) {
  const totalSum = valueArray.reduce((sum, value) => sum + value, 0);

  return totalSum;
}
