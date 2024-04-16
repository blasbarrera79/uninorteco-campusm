import { useHistory } from "react-router-dom";

export function usePageToolbar(
  { primaryCommands = [], menuCommands = [] } = {
    primaryCommands: [],
    menuCommands: [],
  }
) {
  const history = useHistory();

  setPageToolbar({
    primaryCommands: [
      {
        icon: "arrow-left",
        label: "Regresar a las asignaturas",
        callback: () => {
          history.push("/");
        },
      },
      {
        icon: "graduation",
        label: "PGA",
        callback: () => {
          history.push("/pga");
        },
      },
      ...primaryCommands,
    ],
    menuCommands,
  });
}
