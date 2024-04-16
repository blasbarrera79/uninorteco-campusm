import React from "react";
import Button from '@material-ui/core/Button';
import { Snackbar } from "@material-ui/core/Snackbar";
import { useHowMuchPGA } from "./useHowMuchPGA";
import { CoursesContainer } from "../../../common/components/CoursesContainer";
import { PGASemesterCard } from "../../components/PGASemesterCard";

export function HowMuchPGA({ academicInfo }) {
  const {
    desiredPGA,
    onGradeChange,
    semesterAverage,
    onNeededSemesterAverage,
    errorSnackbarOptions,
    onCloseSnackbar,
  } = useHowMuchPGA({
    academicInfo,
  });

  return (
    <>
      <CoursesContainer>
        <PGASemesterCard
          title="Promedio acumulado"
          subtitle={`Créditos aprobados: ${academicInfo.creditsSoFar}`}
          explanation="Sí deseo un promedio acumulado de"
          onGradeChange={onGradeChange}
          value={desiredPGA}
        />
        <PGASemesterCard
          title="Promedio semestral"
          subtitle={`Créditos semestrales: ${academicInfo.currentCredits}`}
          explanation="Necesitas un promedio semestral de"
          value={semesterAverage}
        />
      </CoursesContainer>
      <Snackbar
        variant="error"
        open={errorSnackbarOptions.open}
        onClose={onCloseSnackbar}
        message={errorSnackbarOptions.message}
      />
      <Button
        sx={{
          width: "100%",
          maxWidth: "800px",
          alignSelf: "center",
          my: 6,
        }}
        onClick={onNeededSemesterAverage}
      >
        Calcular lo que necesito!
      </Button>
    </>
  );
}
