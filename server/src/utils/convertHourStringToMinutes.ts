export function convertHourStringToMinutes(hourString: string) {
  if (!hourString) return 0;
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutesAmount = hours * 60 + minutes;
  return minutesAmount;
}
