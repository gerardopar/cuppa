import React from "react";

import CloseIcon from "@mui/icons-material/Close";

export const CloseButton: React.FC<{
  className?: string;
  fontClassName?: string;
  iconSize?: "small" | "large" | "inherit" | "medium";
  handleCloseModal: () => void;
}> = ({ className, fontClassName, handleCloseModal, iconSize = "inherit" }) => {
  return (
    <button type="button" onClick={handleCloseModal} className={className}>
      <CloseIcon className={fontClassName} fontSize={iconSize} />
    </button>
  );
};

export default CloseButton;
