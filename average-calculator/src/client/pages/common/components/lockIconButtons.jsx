import React from "react";
import Icon from "@material-ui/core/Icon";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

export function BaseLockIconButton({ onClick, toolTipTitle, iconName }) {
  return (
    <Tooltip title={toolTipTitle}>
      <IconButton
        color="gray"
        aria-label={toolTipTitle}
        onClick={onClick}
        sx={{ ml: 2 }}>
        <Icon
          name={iconName}
          large
        />
      </IconButton>
    </Tooltip>
  );
}

export function LockIconButton({ onClick }) {
  return (
    <BaseLockIconButton
      onClick={onClick}
      toolTipTitle="Desbloquear"
      iconName="lock"
    />
  );
}

export function UnlockIconButton({ onClick }) {
  return (
    <BaseLockIconButton
      onClick={onClick}
      toolTipTitle="Bloquear"
      iconName="unlock"
    />
  );
}

export function CardLockButton({ onClick, isLocked }) {
  return isLocked ? (
    <LockIconButton onClick={onClick} />
  ) : (
    <UnlockIconButton onClick={onClick} />
  );
}
