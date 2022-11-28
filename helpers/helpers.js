export function formatDateToDefault(dt) {
    const newDt = new Date(dt);
    return `${newDt.getFullYear()}-${
      newDt.getMonth() + 1 < 10
        ? `0${newDt.getMonth() + 1}`
        : newDt.getMonth() + 1
    }-${newDt.getDate() < 10 ? `0${newDt.getDate()}` : newDt.getDate()}`;}