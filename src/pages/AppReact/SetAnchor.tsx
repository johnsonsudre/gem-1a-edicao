export function SetAnchorEvents(anchor) {
  /** EVENTS  */
  anchor.onTargetFound = () => {
    // console.log("Imagem encontrada. Rastreando ....");
  };
  anchor.onTargetLost = () => {
    // console.log("Imagem perdida");
  };

  anchor.onTargetUpdate = () => {
    // console.log("onTargetUpdate");
  };
}
