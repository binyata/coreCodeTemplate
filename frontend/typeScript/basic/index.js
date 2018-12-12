var obj1 = /** @class */ (function () {
    function obj1(title, text) {
        this.title = title;
        this.text = text;
    }
    obj1.prototype.printSomething = function () {
        console.log(this.title + " is the title");
    };
    return obj1;
}());
var test = new obj1("title", "name");
test.printSomething();
var stringExample = "hello";
console.log(stringExample + " with a side of variable!");
