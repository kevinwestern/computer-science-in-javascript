function AVLTree () {
	this._root = null;
};

AVLTree.prototype = {
	constructor: AVLTree,

	insert: function (value) {
		this._root = this._insert(value, this._root);
		return this;
	},

	_insert: function (what, node) {
		if (node === null) {
			node = {
				value: what,
				left: null,
				right: null,
				height: 0
			};
		}
		else if (what < node.value) {
			node.left = this._insert(what, node.left);
			if (this._nodeHeight(node.left) - this._nodeHeight(node.right) > 1) {
				if (node.left.left) {
					node = this.rotateRight(node);
				}
			}
		}
		else if (what > node.value) {
			node.right = this._insert(what, node.right);
		}

		node.height = Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right)) + 1;
		return node;
	},

	_nodeHeight: function (node) {
		return node ? node.height : -1;
	},

	rotateRight: function (node) {
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

	rotateLeft: function (node) {
		node = {
			value: node.right.value,
			left: {
				value: node.value,
				left: node.left,
				right: node.right.left
			},
			right: node.right.right
		};

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

exports.AVLTree = AVLTree;