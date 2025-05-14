import { type ReactNode } from 'react';

interface ControlsWrapperProps {
  children: ReactNode;
}

function ControlsWrapper({ children }: ControlsWrapperProps) {
  return <div className="historical-dates__controls-wrapper">{children}</div>;
}

export default ControlsWrapper;
