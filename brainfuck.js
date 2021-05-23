class Brainfuck {
    constructor(arraySize = 30000) {
    this.arr = new Uint8Array(arraySize)
    this.dataPointer = 0;
    this.instructionPointer = 0;
    this.code;
    this.loop = [];
    this.size = arraySize;
    this.str = "";
    }
    interpret(char) {
    switch(char) {
    case "+":
        this.increment()
        break;
    case "-":
        this.decrement()
        break;
    case ".":
        this.print()
        break;
    case ",":
        this.input(prompt())
        break;
    case ">":
        this.dataRight()
        break;
    case "<":
        this.dataLeft()
        break;
    case "[":
        this.startLoop();
        break;
    case "]":
        this.endLoop();
        break;
    }
    }
    startLoop() {
    	if(this.getData() != 0)this.loop.push(this.instructionPointer);
    	else {
    				let count = 0;
    				for(let charInd = this.instructionPointer+1; charInd < this.code.length; charInd++) {
    				if(this.code[charInd] == "[") {
    					count++
    					}
    				if(this.code[charInd] == "]") {
    					count--
    					if(count < 0) {
    						//found closing
    						this.instructionPointer = charInd;
    						this.loop.pop()
    						return;
    						}
    					}
    				}
    		}
    }
    endLoop() {
    	if(this.loop) {
    		this.instructionPointer = this.loop.pop()-1;
    	}else {
    	throw('unnecessary ] at:' + this.instructionPointer)
    	}
    }
    START(string) {
    	console.clear();
    	this.code = string;
	this.arr = new Uint8Array(this.size)
    	this.dataPointer = 0;
    	this.str = "";
    	this.errorHandling();
		this.instructionPointer = 0;
			for(this.instructionPointer;this.instructionPointer < string.length;this.instructionPointer++) {
				this.interpret(string.charAt(this.instructionPointer))
			}
	}
    getData() {
    return this.arr[this.dataPointer]
    }
    print() {
    console.clear();
    console.log(this.str+=String.fromCharCode(this.getData()))
    }
    decrement() {
    this.arr[this.dataPointer]--
    }
    increment() {
    this.arr[this.dataPointer]++
    }
    dataLeft() {
    this.dataPointer--
    this.dataPtrError();
    }
    dataRight() {
    this.dataPointer++
    this.dataPtrError();
    }
    dataPtrError() {
    	if(this.dataPointer < 0) throw("data ptr is below 0")
    	if(this.dataPointer > this.size) throw("data ptr is bigger than array size")	
    }
    errorHandling() {
    	let closingStarts = [...this.code].filter(x => x == "[")
    	let closingEnds = [...this.code].filter(x => x == "]")
    	if(closingEnds.length != closingStarts.length) throw("added unnecessary [ or ]")
    }
    input(char) {
    this.arr[this.dataPointer] = new Uint8Array([char.charCodeAt(0)])[0]
    }
}
