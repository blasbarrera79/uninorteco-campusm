import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Stack } from "../../../components/Stack";
import { SemestreInfoModal } from "./SemestreInfoModal";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../common/components/GradeTextField";
import { ClickableTypography } from "../../../components/ClickableTypography";

/**
 * Props for the HowMuchResultCard component.
 * @typedef {Object} HowMuchResultCardProps
 * @property {string} title - The title of the card.
 * @property {string} subtitle - The subtitle of the card.
 * @property {number} value - The value to display.
 * @property {(data: number) => void} onGradeChange - Function to handle grade change.
 * @property {string} helpMessage - The help message to display.
 */

/**
 * A component to display the result card for "How Much" calculation.
 * @param {HowMuchResultCardProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element.
 */
export function HowMuchResultCard(props) {
  const { title, subtitle, value, onGradeChange, helpMessage } = props;
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
          <GradeTextField value={value} onGradeChange={onGradeChange} />
        </div>
      </Stack>
      <SemestreInfoModal open={open} setOpen={setOpen} />
    </BaseCard>
  );
}
