import React from "react";
import { Switch, Route } from "react-router-dom";
import { Bubble } from "./components/Bubble";
import { Title } from "./components/Title";
import { UploadCatPage } from "./pages/UploadeCatPage";
import { CatsListPage } from "./pages/CatListPage";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Bubble />
        <Title />
      </Route>
      <Route path='/images/upload' exact>
        <UploadCatPage />
      </Route>
      <Route path='/images' exact>
        <CatsListPage />
      </Route>
    </Switch>
  );
};
