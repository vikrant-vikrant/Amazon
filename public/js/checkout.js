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

    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

    console.log(
      `${this.model} by ${this.brand}, Speed: ${
        this.speed
      } Km/h, Trunk: ${trunkStatus}`
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

const car = new Car("Toyoto", "Corolla");
car.go();
car.brake();
car.openTrunk();
console.log(car)
car.displayInfo();

class RaceCar extends Car{
  acceleration;
  constructor(brand,model,acceleration){
    super(brand,model);
    this.acceleration = acceleration;
  }
  go(){
    this.acceleration += this.acceleration;
    if(this.acceleration < 300){
      this.acceleration == 300;
    }
  }
  info(){
    console.log(`brand: ${this.model}, model: ${this.model}, acceleration: ${this.acceleration}`)
  }
}

const race = new RaceCar('McLaren','F1',20)
race.go();
race.go();
race.go();
console.log(race);
race.info();



