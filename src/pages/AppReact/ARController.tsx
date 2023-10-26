import { MindARThree } from "mind-ar/dist/mindar-image-three.prod";

export class ARController {
  mindARThree;
  visibility;
  hidden;
  showing;
  uiScanning;
  uiLoading;
  uiCompatibility;

  constructor() {
    this.hidden = "hidden";
    this.showing = "inherit";
  }
  init(container) {
    this.mindARThree = new MindARThree({
      container: container,
      imageTargetSrc: "/marker/graffiti-final.mind",
      filterMinCF: 0.001,
      filterBeta: 0.01,
    });
    console.log(this.mindARThree);
    // this.mindARThree.addEventListener("arReady", () => {
    // });
    this.uiScanning = this.mindARThree.ui.scanningMask;
    this.uiLoading = this.mindARThree.ui.loadingModal;
    this.uiCompatibility = this.mindARThree.ui.compatibilityModal;
  }
  //
  // RA
  stop() {
    if (this.mindARThree) {
      // this.mindARThree.renderer.setAnimationLoop(null);
      this.mindARThree.stop();
    }
  }
  start() {
    if (this.mindARThree) this.mindARThree.start();
  }
  /** UI */
  hideScanning() {
    if (this.mindARThree) this.uiScanning.style.visibility = this.hidden;
  }

  showScanning() {
    if (this.mindARThree) this.uiScanning.style.visibility = this.showing;
  }

  showLoading() {
    if (this.mindARThree) this.uiLoading.style.visibility = this.showing;
  }

  hideLoading() {
    if (this.mindARThree) this.uiLoading.style.visibility = this.hidden;
  }

  showCompatibilityModal() {
    if (this.mindARThree) this.uiCompatibility.style.visibility = this.showing;
  }

  hideCompatibilityModal() {
    if (this.mindARThree) this.uiCompatibility.style.visibility = this.hidden;
  }

  showUI() {
    this.showLoading();
    this.showScanning();
    this.showCompatibilityModal();
  }
  hideUI() {
    this.hideLoading();
    this.hideScanning();
    this.hideCompatibilityModal();
  }
  setZIndex(zIndex) {
    this.uiScanning.zIndex = zIndex;
    this.uiLoading.zIndex = zIndex;
    this.uiCompatibility.zIndex = zIndex;
  }

  reset() {
    // mindar-ui-overlay
    const scanningElements = document.getElementsByClassName(
      "mindar-ui-overlay mindar-ui-scanning"
    );
    const loadingElements = document.getElementsByClassName(
      "mindar-ui-overlay mindar-ui-loading"
    );
    const compatibilityElements = document.getElementsByClassName(
      "mindar-ui-overlay mindar-ui-compatibility"
    );
    scanningElements[0].remove();
    loadingElements[0].remove();
    compatibilityElements[0].remove();
    // console.log(this.uiLoading);
    // console.log(this.uiCompatibility);

    // if (this.uiScanning) this.uiScanning.remove();
    // if (this.uiLoading) this.uiLoading.remove();
    // if (this.uiCompatibility) this.uiCompatibility.remove();
  }
}
