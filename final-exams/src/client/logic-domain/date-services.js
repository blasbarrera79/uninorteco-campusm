// Class for handling dates and times
class DateTimeService {
  /**
   * Get the current date in "dd/mm/yyyy" format.
   * @returns The current date as a formatted string.
   */
  static getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Get the current time in "HH:mm" format.
   * @returns The current time as a formatted string.
   */
  static getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  /**
   * Compare two dates in "dd/mm/yyyy" format.
   * @param dateOne First date to compare.
   * @param dateTwo Second date to compare.
   * @returns A number indicating the comparison between the dates.
   */
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

  /**
   * Compare two times in "HH:mm" format.
   * @param timeA First time to compare.
   * @param timeB Second time to compare.
   * @returns 0 if the times are equal, a negative number if timeA is earlier than timeB,
   * or a positive number if timeA is later than timeB.
   */
  static compareTimes(timeA, timeB) {
    const [hoursA, minutesA] = timeA.split(":").map(Number);
    const [hoursB, minutesB] = timeB.split(":").map(Number);

    if (hoursA === hoursB) {
      if (minutesA === minutesB) {
        return 0; // The times are equal
      }
      return minutesA - minutesB; // Compare minutes if hours are equal
    }

    return hoursA - hoursB; // Compare hours
  }

  /**
   * Format a date in "dd/mm/yyyy" format into an object with separate properties.
   * @param {string} dateString - The date in "dd/mm/yyyy" format.
   * @returns {object} - An object with separate properties for day, month, year, and day name.
   */
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

// Export the DateTimeService class
module.exports = { DateTimeService };