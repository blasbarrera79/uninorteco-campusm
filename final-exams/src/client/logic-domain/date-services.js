class DateTimeService {

  static getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  static dateCompare(dateOne, dateTwo) {
    const [dayOne, monthOne, yearOne] = dateOne.split("/").map(Number);
    const [dayTwo, monthTwo, yearTwo] = dateTwo.split("/").map(Number);

    if (yearOne !== yearTwo) {
      return yearOne - yearTwo;
    }
    if (monthOne !== monthTwo) {
      return monthOne - monthTwo;
    }
    return dayOne - dayTwo;
  }

  static compareTimes(timeA, timeB) {
    const [hoursA, minutesA] = timeA.split(":").map(Number);
    const [hoursB, minutesB] = timeB.split(":").map(Number);

    if (hoursA === hoursB) {
      if (minutesA === minutesB) {
        return 0;
      }
      return minutesA - minutesB;
    }

    return hoursA - hoursB;
  }

  static formatDate(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const optionsDay = { weekday: "long" };
    const optionMonth = { month: "long" };
    const dayName = new Intl.DateTimeFormat("es-ES", optionsDay).format(dateObj);
    const formattedMonth = dateObj.toLocaleDateString("es-ES", optionMonth);
    return { day, month: formattedMonth, year, dayName };
  }
}

module.exports = { DateTimeService };
