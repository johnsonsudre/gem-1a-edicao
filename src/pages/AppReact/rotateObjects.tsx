export class rotateObjects {
  objects: any = [];
  constructor() {}
  check(obj: any) {
    if (obj.userData && obj.userData.rotate) {
      this.add({
        object: obj,
        axis: obj.userData.axis,
        velocity: obj.userData.velocity,
      });
    }
  }
  add(obj: any) {
    this.objects.push(obj);
  }
  update() {
    this.objects.map((item: any) => {
      item.object.rotation[item.axis] += item.velocity;
    });
  }
}
