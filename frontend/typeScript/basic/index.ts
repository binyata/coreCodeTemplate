interface Todo {
    title: string;
    text: string;
    printSomething();
}

class obj1 implements Todo {
    
    title: string;
    text: string;

    constructor(title: string, text: string) {
        this.title = title;
        this.text = text;
    }

    printSomething(): void {
        console.log(`${this.title} is the title`);
    }
}


let test = new obj1("title", "name");
test.printSomething();
let stringExample : String = "hello";
console.log(`${stringExample} with a side of variable!`);