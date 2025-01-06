import { renderOrderSummary } from "./checkout/orderSummary.js";
renderOrderSummary();

export class Car {
  brand;
  model;
  speed;
  isTrunkOpen;

  constructor(brand, model, speed = 0, isTrunkOpen = false) {
    this.brand = brand;
    this.model = model;
    this.speed = speed;
    this.isTrunkOpen = isTrunkOpen;
  }
  displayInfo() {
    console.log(
      `${this.model} by ${this.brand}, Speed: ${
        this.speed
      } Km/h, Trunk: ${this.openTrunk()}`
    );
  }
  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }
    if (this.speed > 200) {
      this.speed = 200;
    }
  }
  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }
  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const Car1 = new Car("Toyoto", "Corolla");
Car1.openTrunk();
Car1.go();
Car1.closeTrunk();
Car1.go();

console.log(Car1);
