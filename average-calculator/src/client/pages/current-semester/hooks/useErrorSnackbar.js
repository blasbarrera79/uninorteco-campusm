import { useState } from "react";

export function useErrorSnackbar() {
  const [errorSnackbarOptions, setErrorSnackbarOptions] = useState({
    open: false,
    message: "",
  });

  const onCloseSnackbar = () => {
    setErrorSnackbarOptions({
      open: false,
      message: "",
    });
  };

  const onError = (message) => {
    setErrorSnackbarOptions({
      open: true,
      message,
    });
  };

  return {
    onError,
    onCloseSnackbar,
    errorSnackbarOptions,
  };
}
