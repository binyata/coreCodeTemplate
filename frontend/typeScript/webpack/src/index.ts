import { obj } from './objTest';

let test = { title: "title example", name: "name example"};
let myobj = new obj(test.title, test.name);
let output: string = "running typescript3";

console.log(output);
myobj.printSomething();
myobj.addElements();