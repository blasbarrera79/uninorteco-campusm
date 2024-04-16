import React from "react";
import Typography from "@material-ui/core/Typography";
import Stack from "../../components/Stack";
import { CardLockButton } from "../../common/components/lockIconButtons";
import BaseCard from "../../components/BaseCard";
import { GradeTextField } from "../../common/components/GradeTextField";

/**
 * Props for the PartialComponentCard component
 * @typedef {object} PartialComponentCardProps
 * @property {PartialComponent} partialComponent - The partial component data
 * @property {(id: string, grade: number) => void} onGradeChange - Callback function to handle grade changes
 * @property {(id: string) => void} [onLockIconPress] - Optional callback function to handle lock icon press
 */

/**
 * Component for displaying a partial component card.
 * @param {PartialComponentCardProps} props - Props for the PartialComponentCard component
 * @returns {JSX.Element} - Rendered component
 */
export function PartialComponentCard({
  partialComponent,
  onGradeChange,
  onLockIconPress,
}) {
  const disableTextField =
    onLockIconPress !== undefined && partialComponent.isLocked;
  const bgProps = disableTextField ? { backgroundColor: "#f8f8f8" } : {};

  return (
    <BaseCard sx={bgProps}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{partialComponent.name}</Typography>
        <Typography
          variant="body2"
          color="textSecondary">
          Peso: {partialComponent.weight}%
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <div style={{ width: 70 }}>
          <GradeTextField
            value={partialComponent.grade}
            onGradeChange={(grade) => onGradeChange(partialComponent.id, grade)}
            disabled={disableTextField}
            presicion={1}
          />
        </div>
        {onLockIconPress && (
          <CardLockButton
            onClick={() => onLockIconPress(partialComponent.id)}
            isLocked={partialComponent.isLocked}
          />
        )}
      </Stack>
    </BaseCard>
  );
}
