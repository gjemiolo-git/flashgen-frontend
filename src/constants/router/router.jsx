import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { ROUTES } from "./route";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Layout from "../../pages/layout/Layout";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {ROUTES.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
            < Route path="*" element={<NotFound />} />
        </Route>
    )
);
