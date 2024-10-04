import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ROUTES } from "./route";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Layout from "../../components/layout/Layout";
import { PrivateRoute } from "../../components/PrivateRoute";
import { ProtectedRoute } from "../../components/PrivateRoute";

const routeList = ROUTES.map((routeGroup) => {
    if (routeGroup.private) {
        return (
            <Route key={routeGroup.id} element={<PrivateRoute />}>
                {routeGroup.routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Route>
        );
    } else if (routeGroup.protected) {
        return (
            <Route key={routeGroup.id} element={<ProtectedRoute />}>
                {routeGroup.routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Route>
        );
    } else {
        return routeGroup.routes.map((route) => (
            <Route
                key={route.path}
                path={route.path}
                element={route.element}
            />
        ));
    }
});

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {routeList}
            <Route path="*" element={<NotFound />} />*
        </Route>
    )
);
