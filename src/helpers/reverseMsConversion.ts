export default function reverseMsConversion(time: string) {
  const [hours, minutes, seconds]: number[] = time
    .split(':')
    .map((t) => Number(t));
  const millis: number = (hours * 3600 + minutes * 60 + seconds) * 1000;
  return millis;
}
