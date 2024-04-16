import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import SchoolIcon from '@material-ui/icons/School';

export function usePageToolbar(
  { primaryCommands = [], menuCommands = [] } = {
    primaryCommands: [],
    menuCommands: [],
  }
) {
  const navigate = useNavigate();

  const setPageToolbar = ({ primaryCommands: customPrimaryCommands = [], menuCommands: customMenuCommands = [] }) => {
    const defaultPrimaryCommands = [
      {
        icon: <ArrowLeftIcon />,
        label: "Regresar a las asignaturas",
        callback: () => {
          navigate("/");
        },
      },
      {
        icon: <SchoolIcon />,
        label: "PGA",
        callback: () => {
          navigate("/pga");
        },
      },
    ];

    const finalPrimaryCommands = [...defaultPrimaryCommands, ...customPrimaryCommands];

    // Assuming setPageToolbar is a function to set toolbar commands
    setPageToolbar({ primaryCommands: finalPrimaryCommands, menuCommands: customMenuCommands });
  };

  return setPageToolbar;
}
