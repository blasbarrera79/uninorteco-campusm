import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import Stack from "../../components/Stack";
import { SemestreInfoModal } from "./SemestreInfoModal";
import BaseCard from "../../components/BaseCard";
import ClickableTypography from "../../components/ClickableTypography";

/**
 * Props for the FinalGradeResultCard component.
 * @typedef {Object} FinalGradeResultCardProps
 * @property {string} title - The title of the card.
 * @property {string} subtitle - The subtitle of the card.
 * @property {number} result - The result to display.
 * @property {string} helpMessage - The help message to display.
 */

/**
 * A component to display the final grade result card.
 * @param {FinalGradeResultCardProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element.
 */
export function FinalGradeResultCard(props) {
  const { title, subtitle, result, helpMessage } = props;
  const [open, setOpen] = useState(false);

  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <ClickableTypography
          message={helpMessage}
          onClick={() => setOpen(true)}
        />
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <Typography
          variant="body1"
          sx={{ mr: 2 }}>
          {result}
        </Typography>
      </Stack>
      <SemestreInfoModal
        open={open}
        setOpen={setOpen}
      />
    </BaseCard>
  );
}
