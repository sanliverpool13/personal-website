import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="flex-1 lg:px-48 md:px-24 px-10 md:pt-80 pt-28">
      <div className="container mx-auto max-w-5xl md:pt-8 pt-2 md:pb-24 pb-16 flex flex-col items-center md:gap-48 gap-24">
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
