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
        this.finalExamResponse = await request
          .action("get-user")
          .end((e, res) => {
            if (e) {
              console.error(e)
              return
            }
            return res.body
          })
        this.examsLoaded = true
      }
    } catch (error) {
      console.error("Error initializing finalExamResponse:", error)
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
    } catch (error) {
      console.error("Error fetching exams:", error)
      return null
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

    for (const date in groupedExams) {
      if (Object.prototype.hasOwnProperty.call(groupedExams, date)) {
        const exams = groupedExams[date]
        for (const exam of exams) {
          if (DateTimeService.dateCompare(exam.FECHA, currentDate) === 0) {
            if (DateTimeService.compareTimes(exam.HORA, currentTime) > 0) {
              return exam
            }
          } else if (DateTimeService.dateCompare(exam.FECHA, currentDate) > 0) {
            return exam
          }
        }
      }
    }

    return null
  }
}

export default FinalExamService
