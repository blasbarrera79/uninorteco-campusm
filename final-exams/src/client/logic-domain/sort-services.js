const { DateTimeService } = require("./date-services");

// Class for sorting exams
class ExamSortingService {
  /**
   * Sort exams by date.
   * @param exams Array of exams to be sorted.
   * @returns An array of exams sorted by date.
   */
  static sortExamsByDate(exams) {
    exams.sort((examA, examB) => DateTimeService.dateCompare(examA.FECHA, examB.FECHA));
    return exams;
  }

  /**
   * Sort exams by hour within each date.
   * @param examsByDate Object containing exams grouped by date.
   * @returns An object with exams sorted by date and time.
   */
  static sortExamsByHour(examsByDate) {
    const sortedExamsObj = {};

    // Use Object.keys to iterate over object properties
    Object.keys(examsByDate).forEach((fecha) => {
      const exams = examsByDate[fecha];

      // Sort exams by hour
      exams.sort(
        (examA, examB) =>
          parseInt(examA.HORA.replace(":", ""), 10) -
          parseInt(examB.HORA.replace(":", ""), 10)
      );
      sortedExamsObj[fecha] = exams;
    });

    return sortedExamsObj;
  }
}

// Export the ExamSortingService class
module.exports = { ExamSortingService };
