//To get day/month from a date

function dayAndMonthFormat(currentDate) {
  const date = new Date(currentDate);

  const day =
    date.getUTCDate() > 9 ? `${date.getUTCDate()}` : `0${date.getUTCDate()}`;
  const month =
    date.getUTCMonth() + 1 > 9
      ? `${date.getUTCMonth() + 1}`
      : `0${date.getUTCMonth() + 1}`;
  return `${day}/${month}`;
}

function fullDateFormat(date) {
  const currentDate = new Date(date);

  const day =
    currentDate.getUTCDate() < 10
      ? `0${currentDate.getUTCDate()}`
      : `${currentDate.getUTCDate()}`;

  const month =
    currentDate.getUTCMonth() + 1 < 10
      ? `0${currentDate.getUTCMonth() + 1}`
      : `${currentDate.getUTCMonth() + 1}`;

  const year = currentDate.getFullYear();

  return `${year}-${month}-${day}`;
}

function getDateFromSelect(key) {
  let currentDate = new Date();

  switch (key) {
    case "Ayer":
      currentDate.setDate(currentDate.getDate() - 1);

      break;

    case "Semana":
      currentDate.setDate(currentDate.getDate() - 7);
      break;

    case "Mes":
      currentDate.setDate(currentDate.getDate() - 30);
      break;

    case "Este mes":
      const initialDate = () => {
        const date = new Date();
        const initialDate = new Date(date.getFullYear(), date.getMonth(), 1);
        return initialDate
      };
      currentDate = initialDate()
      break;

    case "Año":
      currentDate.setDate(currentDate.getDate() - 365);
      break;

    default:
      break;
  }

  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
}

module.exports = { dayAndMonthFormat, fullDateFormat, getDateFromSelect };
