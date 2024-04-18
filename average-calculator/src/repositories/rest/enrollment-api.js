const { ErrorCode, RepositoryError } = require("../../common/errors");
const { axiosClient } = require("./axios-client");


class EnrollmentAPI {
  constructor() {
    this.username = undefined;
    this.period = undefined;
    this.academicEnrollment = undefined;
    this.nrcToPartialGradeResponse = {};
  }

  async fetchAcademicEnrollement() {
    const url = this.getCoursesUrl();
    try {
      const { data } = await axiosClient.get(url);
      this.academicEnrollment = data;
    } catch (error) {
      throw new RepositoryError(
        "cannot get academic enrollment",
        ErrorCode.APPLICATION_INTEGRITY_ERROR
      );
    }
  }

  async fetchPartialGrades(nrc) {
    const url = "/notas-parciales";
    const body = this.getPartiaGradeBody(nrc);
    try {
      const { data } = await axiosClient.post(url, body);
      this.nrcToPartialGradeResponse[nrc] = data;
    } catch (error) {
      throw new RepositoryError(
        "cannot get partial grades",
        ErrorCode.APPLICATION_INTEGRITY_ERROR,
        { nrc: nrc }
      );
    }
  }

  getCoursesUrl() {
    if (this.username && this.period) {
      return `/matricula/user/${this.username}/periodo/${this.period}`;
    }
    throw new RepositoryError(
      "username and period must be set",
      ErrorCode.APPLICATION_INTEGRITY_ERROR
    );
  }

  getPartiaGradeBody(nrc) {
    if (this.username && this.period) {
      return {
        user: this.username,
        periodo: this.period,
        nrc,
      };
    }
    throw new RepositoryError(
      "username and period must be set",
      ErrorCode.APPLICATION_INTEGRITY_ERROR
    );
  }

  async getAcademicEnrollment() {
    if (!this.academicEnrollment) {
      await this.fetchAcademicEnrollement();
    }
    return this.academicEnrollment;
  }

  async getPartialGradeResponseOfNrc(nrc) {
    if (!this.nrcToPartialGradeResponse[nrc]) {
      await this.fetchPartialGrades(nrc);
    }
    return this.nrcToPartialGradeResponse[nrc];
  }

  setUserName(username) {
    this.username = username;
  }

  setPeriod(period) {
    this.period = period;
  }
}

module.exports = { EnrollmentAPI };
