import { useNavigate } from "react-router-dom";

export function usePageToolbar(
  { primaryCommands = [], menuCommands = [] } = {
    primaryCommands: [],
    menuCommands: [],
  }
) {
  const navigate = useNavigate();

  setPageToolbar({
    primaryCommands: [
      {
        icon: "arrow-left",
        label: "Regresar a las asignaturas",
        callback: () => {
          navigate("/");
        },
      },
      {
        icon: "graduation",
        label: "PGA",
        callback: () => {
          navigate("/pga");
        },
      },
      ...primaryCommands,
    ],
    menuCommands,
  });
}
