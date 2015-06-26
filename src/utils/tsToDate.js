export default function tsToDate(ts) {
  return new Date(parseInt(ts) / 1000);
}
