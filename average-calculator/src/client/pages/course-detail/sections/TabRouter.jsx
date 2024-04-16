import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FinalGradeCourse } from "./FinalGradeCourse";
import HowMuchCourse from "./HowMuchCourse/HowMuchCourse";
import Stack from "../../components/Stack";

export function TabRouter({ index, course }) {
  if (index === 0) {
    return <FinalGradeCourse course={course} />;
  }

  if (index === 1) {
    return <HowMuchCourse course={course} />;
  }

  // The CircularProgress will never be rendered because of the loading state of
  // loading status of ellucian hook setLoadingStatus
  return (
    <Stack sx={{ alignItems: "center" }}>
      <CircularProgress />
    </Stack>
  );
}
