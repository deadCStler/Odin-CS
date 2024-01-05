class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.len = 0;
  }

  append(value) {
    const newNode = new Node(value);
    this.len++;

    if (this.head === null) {
      this.head = newNode;
    } else {
      let ptr = this.head;
      while (ptr.nextNode !== null) {
        ptr = ptr.nextNode;
      }
      ptr.nextNode = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    this.len++;
    newNode.nextNode = this.head;
    this.head = newNode;
  }

  size = () => this.len;

  getHead = () => this.head;

  tail = () => {
    if (!this.head) {
      return null;
    }
    let ptr = this.head;
    while (ptr.nextNode !== null) {
      ptr = ptr.nextNode;
    }
    return ptr;
  };

  at(index) {
    if (!this.head) {
      return null;
    } else {
      let ptr = this.head;
      for (let i = 0; i < index; i++) {
        if (ptr.nextNode === null) {
          return null;
        }
        ptr = ptr.nextNode;
      }
      return ptr.value;
    }
  }

  pop = () => {
    if (this.len === 0) {
      return null;
    } else if (this.len === 1) {
      this.head = null;
      this.len = 0;
    } else {
      let ptr = this.head;
      for (let i = 0; i < this.len - 2; i++) {
        ptr = ptr.nextNode;
      }
      ptr.nextNode = null;
    }
    this.len--;
  };

  contains(value) {
    let ptr = this.head;
    for (let i = 0; i < this.len; i++) {
      if (ptr.value === value) {
        return true;
      }
      ptr = ptr.nextNode;
    }
    return false;
  }

  find(value) {
    let ptr = this.head;
    for (let i = 0; i < this.len; i++) {
      if (ptr.value === value) {
        return i;
      }
      ptr = ptr.nextNode;
    }
    return null;
  }

  toString = () => {
    let res = "";
    let ptr = this.head;
    for (let i = 0; i < this.len; i++) {
      res += `(${ptr.value}) -> `;
      ptr = ptr.nextNode;
    }
    res += "null";
    return res;
  };

  insertAt(value, index) {
    const newNode = new Node(value);

    if (index < 0 || index > this.len) {
      return null;
    }

    if (index === 0) {
      newNode.nextNode = this.head;
      this.head = newNode;
    } else {
      let ptr = this.head;
      for (let i = 0; i < index - 1; i++) {
        ptr = ptr.nextNode;
      }
      newNode.nextNode = ptr.nextNode;
      ptr.nextNode = newNode;
    }

    this.len++;
  }

  removeAt(index) {
    if (index < 0 || index > this.len) {
      return null;
    }
    if (index === 0) {
      this.head = this.head.nextNode;
    } else {
      let ptr = this.head;
      for (let i = 0; i < index - 1; i++) {
        ptr = ptr.nextNode;
      }
      ptr.nextNode = ptr.nextNode.nextNode;
    }
    this.len--;
  }
}

/// Tests

const myList = new LinkedList();

myList.append(10);
myList.append(20);
myList.append(30);

console.log("Linked List:", myList.toString());

myList.prepend(5);

console.log("Linked List after prepend:", myList.toString());

console.log("Size of the Linked List:", myList.size());

console.log("Head of the Linked List:", myList.getHead());

console.log("Tail of the Linked List:", myList.tail());

console.log("Value at index 2:", myList.at(2));

console.log("Contains 20:", myList.contains(20));

console.log("Index of 20:", myList.find(20));

myList.pop();

console.log("Linked List after pop:", myList.toString());

myList.insertAt(15, 2);

console.log("Linked List after insertion:", myList.toString());

myList.removeAt(1);

console.log("Linked List after removal:", myList.toString());
