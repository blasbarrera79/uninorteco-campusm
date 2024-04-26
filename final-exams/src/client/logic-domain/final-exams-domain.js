import { request } from "@ombiel/aek-lib"
import { DateTimeService } from "./date-services"
import { ExamSortingService } from "./sort-services"

class FinalExamService {
  constructor() {
    this.finalExamResponse = null
    this.examsLoaded = false
  }

  async initializeFinalExamResponse() {
    try {
      if (!this.examsLoaded) {
        const { error, body } = await new Promise((resolve, reject) => {
          request.action("get-user").end((e, res) => {
            if (e) {
              reject(new Error(e.message));
              return;
            }
            resolve({ error: null, body: res });
          });
        });

        if (error) {
          throw new Error(`Error fetching exams: ${error}`);
        }

        this.finalExamResponse = body;
        this.examsLoaded = true;
      }
    }
    catch (error) {
      throw new Error(`Error fetching exams: ${error}`);
    }
  }

  async ensureFinalExamsLoaded() {
    if (!this.examsLoaded) {
      await this.initializeFinalExamResponse()
    }
  }

  async getGroupExamByDate() {
    await this.ensureFinalExamsLoaded()

    try {
      if (!this.finalExamResponse) {
        return null
      }
      const allExams = this.finalExamResponse.body.resultado
      if (allExams.length === 0) {
        return null
      }

      const sortedExams = ExamSortingService.sortExamsByDate(allExams)

      const examsByDate = {}

      sortedExams.forEach((item) => {
        const date = item.FECHA
        if (!examsByDate[date]) {
          examsByDate[date] = []
        }
        examsByDate[date].push(item)
      })
      return ExamSortingService.sortExamsByHour(examsByDate)
    }
    catch (error) {
      throw new Error(`Error grouping exams by date: ${error}`)
    }
  }

  async getNextExam() {
    await this.ensureFinalExamsLoaded()
    const groupedExams = await this.getGroupExamByDate()
    if (!groupedExams) {
      return null
    }

    const currentDate = DateTimeService.getCurrentDate()
    const currentTime = DateTimeService.getCurrentTime()

    Object.keys(groupedExams).forEach((date) => {
      const exams = groupedExams[date]
      exams.forEach((exam) => {
        if (DateTimeService.dateCompare(exam.FECHA, currentDate) === 0) {
          if (DateTimeService.compareTimes(exam.HORA, currentTime) > 0) {
            return exam
          }
        }
        else if (DateTimeService.dateCompare(exam.FECHA, currentDate) > 0) {
          return exam
        }
        return null
      })
    })

    return null
  }
}

export default FinalExamService
