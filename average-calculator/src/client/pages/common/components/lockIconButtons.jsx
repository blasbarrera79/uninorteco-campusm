import React from "react";
import { Icon } from "@ellucian/ds-icons/lib";

import { IconButton, Tooltip } from "@ellucian/react-design-system/core";

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
