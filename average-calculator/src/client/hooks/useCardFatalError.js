import { useCardControl } from "@material-ui/core";

const myLogger = AppLogger.getAppLogger().createContextLogger("fatal-error-hook");

const DEFAULT_MUI_OPTIONS = {
  headerMessage: "Lo sentimos",
  iconName: "error",
  iconColor: "red",
};

const DEFAULT_USER_MESSAGE = "Ocurrió un error inesperado";

export function useCardFatalError() {
  const { setErrorMessage } = useCardControl();

  const setFatalError = ({ error, ...rest }) => {
    const { userMessage: userMessageOption, ...muiErrorOptions } = rest;

    let userMessage = DEFAULT_USER_MESSAGE;
    if (error) {
      userMessage = error.userMessage;
    }
    if (userMessageOption) {
      userMessage = userMessageOption;
    }

    const finalMuiErrorOptions = {
      ...DEFAULT_MUI_OPTIONS,
      ...muiErrorOptions,
    };

    if (error) {
      myLogger.error(error.message, {
        errorMessage: error.message,
        errorCode: error.errorCode,
        errorLevel: error.level,
      });
    }

    setErrorMessage({
      textMessage: userMessage,
      ...finalMuiErrorOptions,
    });
  };

  return {
    setFatalError,
  };
}
