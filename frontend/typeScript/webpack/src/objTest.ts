interface info {
    title: string;
    name: string;
    printSomething():void;
    addElements():void;
}

export class obj implements info {
    title: string;
    name: string;

    constructor(title: string, name: string) {
        this.title = title;
        this.name = name;
    }

    printSomething(): void {
        console.log(`${this.title} is the title and ${this.name} is the name`);
    }

    addElements(): void {
        let element0 = document.createElement('div');
        let element1 = document.createElement('p');
        let element2 = document.createElement('p');
        let element3 = document.createElement('p');

        element1.innerHTML = "title";
        element2.innerHTML = "body";
        element3.innerHTML = "footer";

        document.body.appendChild(element0);
        element0.appendChild(element1);
        element0.appendChild(element2);
        element0.appendChild(element3);
    }
}