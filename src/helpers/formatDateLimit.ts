export default function formatDateLimit(date: Date | string) {
  const currentDate = new Date(date);
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formatedDate = `${month < 10 ? '0' : ''}${month}/${year}`;
  return formatedDate;
}
