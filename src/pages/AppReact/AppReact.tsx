import "./AppReact.css";
import MindARThreeViewer from "./mindar-three-viewer";

function AppReact() {
  return (
    // <div className="App" style={{ width: "100vw", height: "100vh" }}>
    <div className="container" style={{ width: "100vw", height: "100vh" }}>
      <MindARThreeViewer />
    </div>
    // </div>
  );
}

export default AppReact;
