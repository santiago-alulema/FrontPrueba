import React, { Fragment, PropsWithChildren } from "react";
import { Footer, Header } from ".";
import CategoryDrawer from "./CategoryDrawer";
import { MainContainer } from "./MainContainer";

type AppLayoutProps = {

}

export const AppLayout = ({ children }: PropsWithChildren<AppLayoutProps>) => {

  return (
    <Fragment>
      <CategoryDrawer />
      <Header />
      <MainContainer>
        {children}
      </MainContainer>
      <Footer />
    </Fragment>
  );
}