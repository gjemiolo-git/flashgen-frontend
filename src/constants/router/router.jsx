import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { ROUTES } from "./route";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Layout from "../../components/layout/Layout";
import PrivateRoute from "../../components/PrivateRoute";
import { Fragment } from "react";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {ROUTES.map((routeGroup) => {
                const RouteWrapper = routeGroup.private ? PrivateRoute : (routeGroup.protected ? PrivateRoute : Fragment);
                return (
                    <Fragment key={routeGroup.id}>
                        {routeGroup.routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <RouteWrapper>
                                        {route.element}
                                    </RouteWrapper>
                                }
                            />
                        ))}
                    </Fragment>
                );
            })}
            < Route path="*" element={<NotFound />} />
        </Route >
    )
);
