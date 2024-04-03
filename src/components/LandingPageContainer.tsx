import React, { ReactNode } from "react";

interface LandingPageContainerProps {
  children: ReactNode;
}

const LandingPageContainer: React.FC<LandingPageContainerProps> = ({
  children,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="container mx-auto max-w-5xl flex flex-col items-center gap-24 md:gap-48">
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childrenArray.length - 1 && (
            <div className="w-24 h-0.5 circle-separator-bg mx-auto"></div> // Tailwind CSS for width, height, background color, and centering
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LandingPageContainer;
