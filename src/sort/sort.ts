export function sortByDate<Type extends { date: string }>(records: Type[]){
  const sorted = records.filter(() => true).sort((recordA, recordB) => {
    const dateA = dateToYear(recordA.date);
    const dateB = dateToYear(recordB.date);

    return dateA - dateB;
  })

  return sorted;
}

const dateToYear = (date: string) => {
  const [days, months, years] = date.split("/");
  const dayToYear = 1 / 360;
  const monthToYear = 1 / 12;

  return Number(years) + Number(months) * monthToYear + Number(days) * dayToYear;
}
