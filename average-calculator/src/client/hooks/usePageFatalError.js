const DEFAULT_MUI_OPTIONS = {
  headerMessage: "Lo sentimos",
  iconName: "error",
  iconColor: "red",
};

const DEFAULT_USER_MESSAGE = "Ocurrió un error inesperado";

export function usePageFatalError() {

  const setFatalError = ({ error, ...rest }) => {
    const { userMessage: userMessageOption, ...muiErrorOptions } = rest;

    let userMessage = DEFAULT_USER_MESSAGE;
    if (error) {
      userMessage = error.userMessage;
    }
    if (userMessageOption) {
      userMessage = userMessageOption;
    }

    if (error) {
      console.error(userMessage);
    }
  };

  return {
    setFatalError,
  };
}
