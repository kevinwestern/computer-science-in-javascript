function AVLTree () {
	this._root = createNode();
};

AVLTree.prototype = {
	constructor: AVLTree,

	insert: function (value) {
		this._root = this._insert(value, this._root);
		return this;
	},

	find: function (what) {
		var current = this._root;
		while (current.value !== null) {
			if (current.value === what) {
				return current.value;
			}
			else if (what < current.value) {
				current = current.left;
			}
			else {
				current = current.right;
			}
		}
		return null;
	},

	inOrder: function () {
		var nodes = [];

		(function _inOrder (node) {

			if (node.left.height >= 0) _inOrder(node.left);
			nodes.push(node.value);
			if (node.right.height >= 0) _inOrder(node.right);
		}(this._root));

		return nodes;
	},

	preOrder: function () {
		var nodes = [];

		(function _preOrder (node) {
			nodes.push(node.value);
			if (node.left.height >= 0) _preOrder(node.left);
			if (node.right.height >= 0) _preOrder(node.right);
		}(this._root));

		return nodes;
	},

	postOrder: function () {
		var nodes = [];

		(function _postOrder (node) {
			if (node.left.height >= 0) _postOrder(node.left);
			if (node.right.height >= 0) _postOrder(node.right);
			nodes.push(node.value);
		}(this._root));

		return nodes;
	},

	_insert: function (what, node) {
		if (node.value === null) {			
			node.value = what;
			node.left = createNode();
			node.right = createNode();
			node.height = 0;
		}
		else if (what < node.value) {
			node.left = this._insert(what, node.left);
			if (this._nodeHeight(node.left) - this._nodeHeight(node.right) >= 2) {
				if (what < node.left.value) {
					node = this._rotateRight(node);
				} else {
					node.left = this._rotateLeft(node.left);
					node = this._rotateRight(node);
				}
			}			
		}
		else if (what > node.value) {
			node.right = this._insert(what, node.right);
			if (this._nodeHeight(node.right) - this._nodeHeight(node.left) >= 2) {;
				if (what > node.right.value) {
					node = this._rotateLeft(node);
				} else {
					node.right = this._rotateRight(node.right);
					node = this._rotateLeft(node);
				}
			}
		}

		node.height = Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right)) + 1;
		return node;
	},

	_nodeHeight: function (node) {
		return node ? node.height : -1;
	},

	_rotateRight: function (node) {
		node = { 
			value: node.left.value, 
			right: {
				value: node.value,
				left: node.left.right,
				right: node.right,
				height: Math.max(this._nodeHeight(node.left.right), this._nodeHeight(node.right)) + 1
			},
			left: node.left.left 
		};
		node.height = Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right)) + 1;

		return node;
	},

	_rotateLeft: function (node) {
		node = {
			value: node.right.value,
			left: {
				value: node.value,
				left: node.left,
				right: node.right.left,
				height: Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right.left)) + 1
			},
			right: node.right.right
		};
		node.height = Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right)) + 1;

		return node;
	},

	getRoot: function () {
		return this._root;
	},

	printTree: function (node, spaces) {
		spaces = spaces || "\t";
		for (var key in node) {
			if (!node.hasOwnProperty) continue;
			if (node[key] instanceof Object) {
				console.log(spaces + key + ":");
				this.printTree(node[key], spaces + "\t");
			}
			else {
				console.log(spaces + key + ": " + node[key]);
			}
		}
	}
};

function createNode() {
	function F () {};
	F.prototype = {
		value: null,
		left: {height: -1},
		right: {height: -1},
		height: -1
	};
	return new F();
}

exports.AVLTree = AVLTree;