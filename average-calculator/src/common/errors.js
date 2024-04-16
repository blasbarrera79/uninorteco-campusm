const ErrorLevel = ["domain", "repository", "presentation"];

const ErrorCode = {
  INVALID_INPUT: "invalid-input",
  INVALID_ID: "invalid-id",
  INVALID_LOGIC: "invalid-logic",
  INVALID_OPERATION: "invalid-operation",
  DUPLICATED_RECORD: "duplicated-record",
  ID_NOT_PROVIDED: "id-not-provided",
  NOT_FOUND: "not-found",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  APPLICATION_INTEGRITY_ERROR: "application-integrity-error",
};

class BaseError extends Error {
  constructor(
    userMessage,
    errorCode,
    level,
    errorParams = {}
  ) {
    super(`[${new Date().toISOString()}] - [${level}] ${userMessage}`);

    this.userMessage = userMessage;
    this.errorCode = errorCode;
    this.level = level;
    this.errorParams = errorParams;
  }
}

class RepositoryError extends BaseError {
  constructor(
    message,
    errorCode,
    errorParams = {}
  ) {
    super(message, errorCode, "repository", errorParams);
  }
}

class DomainError extends BaseError {
  constructor(
    message,
    errorCode,
    errorParams = {}
  ) {
    super(message, errorCode, "domain", errorParams);
  }
}

class InvalidInputError extends DomainError {
  constructor(message, errorParams = {}) {
    super(message, ErrorCode.INVALID_INPUT, errorParams);
  }
}

module.exports = {
  ErrorLevel,
  ErrorCode,
  BaseError,
  RepositoryError,
  DomainError,
  InvalidInputError,
};
