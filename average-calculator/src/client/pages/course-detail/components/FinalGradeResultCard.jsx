import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import Stack from "../../components/Stack";
import BaseCard from "../../components/BaseCard";
import { CourseInfoModal } from "./CourseInfoModal";
import ClickableTypography from "../../components/ClickableTypography";

/**
 * Props for the FinalGradeResultCard component
 * @typedef {object} FinalGradeResultCardProps
 * @property {string} title - The title of the card
 * @property {string} subtitle - The subtitle of the card
 * @property {number} result - The final grade result to display
 * @property {string} helpMessage - The help message to display for more information
 */

/**
 * Component for displaying the final grade result card.
 * @param {FinalGradeResultCardProps} props - Props for the FinalGradeResultCard component
 * @returns {JSX.Element} - Rendered component
 */
export function FinalGradeResultCard({
  title,
  subtitle,
  result,
  helpMessage,
}) {
  const [open, setOpen] = useState(false);

  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <ClickableTypography message={helpMessage} onClick={() => setOpen(true)} />
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {result}
        </Typography>
      </Stack>
      <CourseInfoModal open={open} setOpen={setOpen} />
    </BaseCard>
  );
}
