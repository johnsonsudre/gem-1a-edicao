// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

// import GraffitiRA from "./pages/GraffitiRA/GraffitiRA";
import Cover from "./pages/Cover/Cover.tsx";
import About from "./pages/About/About.tsx";
import AppReact from "./pages/AppReact/AppReact";

const router = createBrowserRouter([
  { path: "/", element: <Cover /> },
  { path: "graffiti", element: <AppReact /> },
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
