import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import MoviePage from "../projects/MoviePage";
import MovieDetailPage from "../projects/MovieDetailPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <MoviePage /> },
            { path: "detail/:movieId", element: <MovieDetailPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes, {
    basename: import.meta.env.BASE_URL,
});