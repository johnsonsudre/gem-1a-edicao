export function openFullscreen(el) {
  var elem = document.getElementById(el);
  if (elem) {
    if (elem["requestFullscreen"]) {
      elem.requestFullscreen();
    } else if (elem["webkitRequestFullscreen"]) {
      /* Safari */
      elem["webkitRequestFullscreen"]();
    } else if (elem["msRequestFullscreen"]) {
      /* IE11 */
      elem["msRequestFullscreen"]();
    }
  }
}

/* Close fullscreen */
export function closeFullscreen() {
  if (window["exitFullscreen"]) {
    try {
      window["exitFullscreen"]();
    } catch (err) {
      console.log("tentativa de sair do modo fullscreen falhou", err);
    }
  } else if (document["webkitExitFullscreen"]) {
    /* Safari */
    document["webkitExitFullscreen"]();
  } else if (document["msExitFullscreen"]) {
    /* IE11 */
    document["msExitFullscreen"]();
  }
}
