// components/ClientProvider.tsx
"use client";

import Header from "@/components/Layout/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { store } from "@/redux/store/store";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  const showHeader =
    !pathname.includes("/user/intro") && !pathname.includes("/new_project");

  return (
    <Provider store={store}>
      <ThemeProvider>
        <header className="sticky top-0 z-50 bg-background ">{showHeader && <Header />}</header>
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default ClientProvider;
