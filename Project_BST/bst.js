class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
  }

  arrToPass = () => {
    this.arr = Array.from(new Set(this.arr.sort((a, b) => a - b)));
    return this.arr;
  };

  buildTree = (arr, start, end) => {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  };

  root = () => this.buildTree(this.arrToPass(), 0, this.arr.length - 1);

  insert = (treeRoot, value) => {
    if (treeRoot === null) {
      treeRoot = new Node(value);
      return treeRoot;
    }

    if (value < treeRoot.data) {
      treeRoot.left = this.insert(treeRoot.left, value);
    } else if (value > treeRoot.data) {
      treeRoot.right = this.insert(treeRoot.right, value);
    }
    return treeRoot;
  };

  find = (treeRoot, value) => {
    if (treeRoot === null || treeRoot.data === value) {
      return treeRoot;
    }
    if (treeRoot.data > value) {
      return this.find(treeRoot.left, value);
    } else if (treeRoot.data < value) {
      return this.find(treeRoot.right, value);
    }
  };

  levelOrder = (treeRoot, callback = null) => {
    if (treeRoot === null) {
      return treeRoot;
    }
    let arr = [];
    if (callback === null) {
      callback = (value) => arr.push(value.data);
    }
    let q = [treeRoot];

    while (q.length > 0) {
      let n = q.length;
      for (let i = 0; i < n; i++) {
        if (q[0].left) {
          q.push(q[0].left);
        }
        if (q[0].right) {
          q.push(q[0].right);
        }
        callback(q.shift());
      }
    }

    if (arr.length > 0) {
      console.log(arr);
    }
  };

  inOrder = (treeRoot, callback = null) => {
    if (treeRoot === null) {
      return treeRoot;
    }

    if (callback === null) {
      callback = (value) => console.log(value.data);
    }

    this.inOrder(treeRoot.left, callback);
    callback(treeRoot);
    this.inOrder(treeRoot.right, callback);
  };

  preOrder = (treeRoot, callback = null) => {
    if (treeRoot === null) {
      return treeRoot;
    }

    if (callback === null) {
      callback = (value) => console.log(value.data);
    }

    callback(treeRoot);
    this.preOrder(treeRoot.left, callback);
    this.preOrder(treeRoot.right, callback);
  };

  postOrder = (treeRoot, callback = null) => {
    if (treeRoot === null) {
      return treeRoot;
    }

    if (callback === null) {
      callback = (value) => console.log(value.data);
    }

    this.postOrder(treeRoot.left, callback);
    this.postOrder(treeRoot.right, callback);
    callback(treeRoot);
  };

  height = (node) => {
    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  depth = (treeRoot, node, currDepth = 0) => {
    if (treeRoot === null) {
      return -1;
    }

    if (treeRoot === node) {
      return currDepth;
    }

    let leftDepth = this.depth(treeRoot.left, node, currDepth + 1);
    let rightDepth = this.depth(treeRoot.right, node, currDepth + 1);

    return Math.max(leftDepth, rightDepth);
  };

  isBalanced = (treeRoot) => {
    if (treeRoot === null) {
      return true;
    }

    let leftHeight = this.height(treeRoot.left);
    let rightHeight = this.height(treeRoot.right);

    if (Math.abs(leftHeight - rightHeight) <= 1) {
      let leftCheck = this.isBalanced(treeRoot.left);
      let rightCheck = this.isBalanced(treeRoot.right);
      return leftCheck && rightCheck;
    }
    return false;
  };

  reBalance = (treeRoot) => {
    let arr = [];
    this.inOrder(treeRoot, function (value) {
      arr.push(value.data);
    });
    return this.buildTree(arr, 0, arr.length - 1);
  };

  delete = (treeRoot, value) => {
    if (treeRoot === null) {
      return treeRoot;
    }

    if (treeRoot.data > value) {
      treeRoot.left = this.delete(treeRoot.left, value);
      return treeRoot;
    } else if (treeRoot.data < value) {
      treeRoot.right = this.delete(treeRoot.right, value);
      return treeRoot;
    }

    if (treeRoot.left === null) {
      return treeRoot.right;
    } else if (treeRoot.right === null) {
      return treeRoot.left;
    } else {
      let copyNode = treeRoot;
      let node = treeRoot.right;
      while (node.left !== null) {
        copyNode = node;
        node = node.left;
      }
      if (copyNode !== treeRoot) {
        copyNode.left = node.right;
      } else {
        copyNode.right = node.right;
      }
      treeRoot.data = node.data;
      return treeRoot;
    }
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const createRandomArr = () => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

function driver() {
  const tree = new Tree(createRandomArr());
  let root = tree.root();
  prettyPrint(root);
  console.log("Is the tree balanced?: ");
  console.log(tree.isBalanced(root));

  console.log("Elements in levelorder: ");
  tree.levelOrder(root);
  console.log("Elements in preorder: ");
  tree.preOrder(root);
  console.log("Elements in postorder: ");
  tree.postOrder(root);
  console.log("Elements in inorder: ");
  tree.inOrder(root);

  root = tree.insert(root, 120);
  root = tree.insert(root, 150);
  root = tree.insert(root, 110);
  root = tree.insert(root, 116);
  root = tree.insert(root, 216);

  console.log("Is the tree balanced after adding new values?: ");
  console.log(tree.isBalanced(root));

  root = tree.reBalance(root);
  console.log("Is the tree balanced after calling reBalance? :");
  console.log(tree.isBalanced(root));

  console.log("Elements in levelorder: ");
  tree.levelOrder(root);
  console.log("Elements in preorder: ");
  tree.preOrder(root);
  console.log("Elements in postorder: ");
  tree.postOrder(root);
  console.log("Elements in inorder: ");
  tree.inOrder(root);
}

driver();
