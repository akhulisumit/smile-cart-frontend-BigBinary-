import { Tooltip } from "neetoui";

const TooltipWrapper = ({ showTooltip, children, ...props }) => {
  if (!showTooltip) return children;

  return (
    <Tooltip {...props}>
      <span>{children}</span>
    </Tooltip>
  );
};

export default TooltipWrapper;
