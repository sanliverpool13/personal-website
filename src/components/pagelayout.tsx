import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="flex-1 lg:px-48 md:px-24 px-8 md:pt-48 pt-28 md:pb-24 pb-16">
      {children}
    </main>
  );
};

export default PageLayout;
