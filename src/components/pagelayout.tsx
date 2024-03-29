import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="flex-1 lg:px-48 md:px-24 px-6 md:pt-88 pt-32 md:pb-24 pb-16">
      <div className="container mx-auto max-w-5xl flex flex-col items-center md:gap-48 gap-24">
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
