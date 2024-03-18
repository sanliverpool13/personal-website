import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="flex-1 lg:px-48 md:px-24 px-10 pt-48 pb-24">
      <div className="container mx-auto max-w-5xl py-8 flex flex-col items-center md:gap-48 gap-24">
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
