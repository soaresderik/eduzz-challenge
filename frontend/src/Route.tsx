import * as React from "react";
import { Route, RouteProps } from "react-router-dom";

type LayoutRouteProps = RouteProps & {
  component: React.ComponentType;
  isPrivate?: boolean;
};

const RouteWrapper = ({ component, isPrivate, ...rest }: LayoutRouteProps) => {
  const Component = component;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouteWrapper;
