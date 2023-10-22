// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import GraffitiRA from "./pages/GraffitiRA/GraffitiRA.tsx";
import Cover from "./pages/Cover/Cover.tsx";
import About from "./pages/About/About.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Cover /> },
  { path: "graffiti", element: <GraffitiRA /> },
  { path: "about", element: <About /> },
]);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode>  */}
  </>
);
