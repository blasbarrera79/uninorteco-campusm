const { RestCalculatorRepository } = require("./rest/repo.rest");
const { EnrollmentAPI } = require("./rest/enrollment-api");

function getRepository(name) {
  if (name === "rest") {
    const enrollmentAPI = new EnrollmentAPI();
    return new RestCalculatorRepository(enrollmentAPI);
  }

  throw new Error("Repository not found");
}

exports.calculatorRepository = getRepository("rest");
