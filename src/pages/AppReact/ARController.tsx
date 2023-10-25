export class ARController {
  mindThree;
  visibility;
  hidden;
  showing;
  constructor(mt?) {
    this.hidden = "hidden";
    this.showing = "inherit";
    this.mindThree = mt ? mt : null;
    if (this.mindThree) {
      this.visibility = this.mindThree.ui.scanningMask.style.visibility;
    }
  }
  init(mt) {
    this.mindThree = mt;
  }
  // RA
  stopScanning() {
    if (this.mindThree) {
      // this.mindThree.renderer.setAnimationLoop(null);
      this.mindThree.stop();
    }
  }
  startScanning() {
    if (this.mindThree) this.mindThree.start();
  }
  // UI
  hideScanning() {
    if (this.mindThree)
      this.mindThree.ui.scanningMask.style.visibility = this.hidden;
  }
  showScanning() {
    if (this.mindThree)
      this.mindThree.ui.scanningMask.style.visibility = this.showing;
  }

  showLoading() {
    if (this.mindThree)
      this.mindThree.ui.loadingModal.style.visibility = this.showing;
  }

  hideLoading() {
    if (this.mindThree)
      this.mindThree.ui.loadingModal.style.visibility = this.hidden;
  }

  showCompatibilityModal() {
    if (this.mindThree)
      this.mindThree.ui.compatibilityModal.style.visibility = this.showing;
  }

  hideCompatibilityModal() {
    if (this.mindThree)
      this.mindThree.ui.compatibilityModal.style.visibility = this.hidden;
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
}
