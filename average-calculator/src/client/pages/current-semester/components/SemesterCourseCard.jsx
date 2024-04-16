import React from "react";
import Typography from '@material-ui/core/Typography';
import { Link as MuiLink } from "@material-ui/core";
import { Link } from "react-router-dom";
import Stack from "../../components/Stack";
import { CardLockButton } from "../../common/components/lockIconButtons";
import BaseCard from "../../components/BaseCard";
import { GradeTextField } from "../../common/components/GradeTextField";
import {
  containOnlyValidGrades,
  getCourseParcelacionMessage,
} from "../../../../domain-logic/course-utils";

/**
 * Props for the ParcelacionTypography component.
 * @typedef {Object} ParcelacionTypographyProps
 * @property {boolean} isSpecialCourse - Indicates if the course is special.
 * @property {string} parcelacionUrl - The URL for the course.
 * @property {string} message - The message to display.
 */

/**
 * Component to display parcelacion typography.
 * @param {ParcelacionTypographyProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element.
 */
function ParcelacionTypography({ isSpecialCourse, parcelacionUrl, message }) {
  if (isSpecialCourse) {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ display: "flex", alignItems: "center", width: "fit-content" }}>
        {message}
      </Typography>
    );
  }

  return (
    <MuiLink
      variant="body2"
      color="textSecondary"
      component={Link}
      to={parcelacionUrl}
      style={{ textDecoration: "none" }}>
      {message}
    </MuiLink>
  );
}

/**
 * Props for the SemesterCourseCard component.
 * @typedef {Object} SemesterCourseCardProps
 * @property {SemesterCourse} semesterCourse - The semester course.
 * @property {(id: string, grade: number) => void} onGradeChange - Callback function for grade change.
 * @property {(id: string) => void} [onLockIconPress] - Callback function for lock icon press.
 */

/**
 * Component to display semester course card.
 * @param {SemesterCourseCardProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element.
 */
export function SemesterCourseCard({
  semesterCourse,
  onGradeChange,
  onLockIconPress,
}) {
  const disableTextField =
    onLockIconPress !== undefined && semesterCourse.isLocked;
  const bgProps = disableTextField ? { backgroundColor: "#f8f8f8" } : {};

  const isSpecialCourse = !containOnlyValidGrades(semesterCourse);
  const message = getCourseParcelacionMessage(semesterCourse);

  const parcelacionUrl = `/courses/${semesterCourse.id}`;

  return (
    <BaseCard sx={bgProps}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{semesterCourse.name}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 3 }}>
          Créditos: {semesterCourse.credits}
        </Typography>
        <ParcelacionTypography
          isSpecialCourse={isSpecialCourse}
          parcelacionUrl={parcelacionUrl}
          message={message}
        />
      </Stack>
      {!isSpecialCourse && (
        <Stack sx={{ flexDirection: "row" }}>
          <div style={{ width: 70 }}>
            <GradeTextField
              value={semesterCourse.grade}
              onGradeChange={(grade) => onGradeChange(semesterCourse.id, grade)}
              disabled={disableTextField}
              presicion={1}
            />
          </div>
          {onLockIconPress && (
            <CardLockButton
              onClick={() => onLockIconPress(semesterCourse.id)}
              isLocked={semesterCourse.isLocked}
            />
          )}
        </Stack>
      )}
    </BaseCard>
  );
}
