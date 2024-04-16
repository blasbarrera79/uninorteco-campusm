import React, { useState } from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../common/components/GradeTextField";
import { CourseInfoModal } from "./CourseInfoModal";
import { ClickableTypography } from "../../../components/ClickableTypography";

/**
 * Props for the HowMuchResultCard component
 * @typedef {object} HowMuchResultCardProps
 * @property {string} title - The title of the card
 * @property {string} subtitle - The subtitle of the card
 * @property {number} value - The value to display in the grade text field
 * @property {(data: number) => void} onGradeChange - Callback function to handle grade changes
 * @property {string} helpMessage - The help message to display for more information
 */

/**
 * Component for displaying the how much result card.
 * @param {HowMuchResultCardProps} props - Props for the HowMuchResultCard component
 * @returns {JSX.Element} - Rendered component
 */
export function HowMuchResultCard({
  title,
  subtitle,
  value,
  onGradeChange,
  helpMessage,
}) {
  const [open, setOpen] = useState(false);

  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <ClickableTypography message={helpMessage} onClick={() => setOpen(true)} />
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <div style={{ width: 70 }}>
          <GradeTextField value={value} onGradeChange={onGradeChange} presicion={1} />
        </div>
      </Stack>
      <CourseInfoModal open={open} setOpen={setOpen} />
    </BaseCard>
  );
}
