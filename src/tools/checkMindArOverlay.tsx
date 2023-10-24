class CheckMindArUiScanning {
  mindArUiScanning;
  constructor() {}
  check() {
    this.mindArUiScanning = document.getElementsByClassName(
      "mindar-ui-overlay mindar-ui-scanning"
    );
    console.log(this.mindArUiScanning);
    // if (this.mindArOverlay.length > 0) {
    //   for (let el of this.mindArOverlay) {
    //     // console.log(el);
    //   }
    // }
  }
  hide() {
    this.check();
    if (this.mindArUiScanning) {
      for (let el of this.mindArUiScanning) {
        // console.log(el.classList);
        el.classList.add("hidden");
      }
    }
  }
  show() {
    this.check();
    if (this.mindArUiScanning) {
      for (let el of this.mindArUiScanning) {
        console.log(el.classList);
        el.classList.remove("hidden");
      }
    }
  }
}

const mindArUiScanning = new CheckMindArUiScanning();

// const checkMindArOverlay = () => {
//   const mindArOverlay = document.getElementsByClassName("mindar-ui-overlay");
//   if (mindArOverlay.length > 0) {
//     console.log(mindArOverlay);
//   }
// };

export default mindArUiScanning;
