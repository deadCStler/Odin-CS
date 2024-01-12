class HashMap {
  constructor() {
    this.bucket = {};
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const hashKey = this.hash(key);
    this.bucket[hashKey] = value;
  }

  get(key) {
    const hashKey = this.hash(key);
    if (this.bucket.hasOwnProperty(hashKey)) {
      return this.bucket[hashKey];
    }
    return null;
  }

  has(key) {
    const hashKey = this.hash(key);
    return this.bucket.hasOwnProperty(hashKey);
  }

  remove(key) {
    const hashKey = this.hash(key);
    if (this.bucket.hasOwnProperty(hashKey)) {
      delete this.bucket[hashKey];
      return `Deleted the key: ${key}`;
    } else {
      return `Key not found: ${key}`;
    }
  }

  length = () => Object.keys(this.bucket).length;

  clear() {
    this.bucket = {};
  }

  keys = () => Object.keys(this.bucket);

  values = () => Object.values(this.bucket);

  entries = () => Object.entries(this.bucket);
}

//Tests

const myHashMap = new HashMap();

myHashMap.set("name", "John");
myHashMap.set("age", 25);
myHashMap.set("city", "New York");

console.log("Get 'name':", myHashMap.get("name"));
console.log("Get 'age':", myHashMap.get("age"));
console.log("Get 'gender':", myHashMap.get("gender"));

console.log("Has 'name':", myHashMap.has("name"));
console.log("Has 'gender':", myHashMap.has("gender"));

console.log(myHashMap.remove("age"));

console.log("Get 'age' after removal:", myHashMap.get("age"));

console.log("Length of HashMap:", myHashMap.length());

console.log("Keys:", myHashMap.keys());
console.log("Values:", myHashMap.values());
console.log("Entries:", myHashMap.entries());

myHashMap.clear();
console.log("HashMap after clear:", myHashMap.keys());
