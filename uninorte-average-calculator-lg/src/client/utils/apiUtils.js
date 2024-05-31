// apiUtils.js
import { getUser } from "../services/userService"
import { getTerm } from "../services/termService"
import { getRegistration } from "../services/registrationService"
import { getGrades } from "../services/gradeService"
import { calculateCurrentGradeAverage } from "./partial-grades"

export async function fetchUserData() {
  try {
    const userResponse = await getUser()
    const username = userResponse.split("@")[0]
    return username
  } catch (error) {
    throw error
  }
}

export async function fetchUserTerms(user) {
  try {
    const termsResponse = await getTerm(user)
    return termsResponse
  } catch (error) {
    throw error
  }
}

export async function fetchUserGrades(selectedTerm, user) {
  try {
    const registration = await getRegistration(selectedTerm, user)
    const promises = registration.map(async (element) => {
      const grades = await getGrades(user, element.SFRSTCR_CRN, selectedTerm)
      const averageGrade = calculateCurrentGradeAverage(grades)
      
      return {
        ...element,
        NOTAA: averageGrade,
        items: grades,
      }
    })

    return await Promise.all(promises)
  } catch (error) {
    throw error
  }
}
