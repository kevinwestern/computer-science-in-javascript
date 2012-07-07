var AVLTree = require('../avltree.js').AVLTree,
	assert = require('assert'),
	leftleft = {},
	rightright = {},
	leftright = {},
	rightleft = {};

describe('result after rotateRight', function () {
	leftleft = {
		value: 5,
		left: {
			value: 4,
			right: {
				value: 'D',
				left: null,
				right: null
			},
			left: {
				value: 3,
				left: {
					value: 'B',
					left: null,
					right: null
				},
				right: {
					value: 'C',
					left: null,
					right: null
				}
			}
		},
		right: {
			value: 'A',
			left: null,
			right: null
		}
	};

	var result = {};
	result = AVLTree.prototype.rotateRight(leftleft);

	it("should have a value of leftleft's left child value", function () {
		assert.equal(result.value, leftleft.left.value);
	});

	it("should have a right child whose left child is leftleft's left's right child", function () {
		assert.deepEqual(result.right.left, leftleft.left.right);
	});

	it("should have a right child whose right child is leftleft's right child", function () {
		assert.deepEqual(result.right.right, leftleft.right);
	});

	it("should have a left child that is equal to leftleft's left's left child", function () {
		assert.deepEqual(result.left, leftleft.left.left);
	});
});

describe('result after rotateLeft', function () {
	rightright = {
		value: 5,
		left: {
			value: 'A',
			left: null,
			right: null
		},
		right: {
			value: 6,
			left: {
				value: 'B',
				left: null,
				right: null
			},
			right: {
				value: 7,
				left: {
					value: 'C',
					left: null,
					right: null
				},
				right: {
					value: 'D',
					left: null,
					right: null
				}
			}
		}
	};

	var result = {};
	result = AVLTree.prototype.rotateLeft(rightright);

	it("should have a value of rightright's right node", function () {
		assert.equal(result.value, rightright.right.value);
	});

	it("should have a left child whose left child is rightright's left child", function () {
		assert.deepEqual(result.left.left, rightright.left);
	});

	it("should have a left child whose right child is rightright's right's left child", function () {
		assert.deepEqual(result.left.right, rightright.right.left);
	});

	it("should have a right child that is equal to rightright's right child", function () {
		assert.deepEqual(result.right, rightright.right.right);
	});
});

describe('inserting', function () {
	var tree;

	beforeEach(function () {
		tree = new AVLTree();
	});

	describe('when tree is empty', function () {
		it('should assign the value as the root with left and right children null', function () {
			tree.insert(5);
			assert.deepEqual(tree.getRoot(), {value: 5, left: null, right: null, height: 0});
		});
	});

	describe('when there are no left or right children', function () {
		it ('should assign to the left child if the inserted value is less than the nodes value', function () {
			tree.insert(5);
			tree.insert(4);
			assert.equal(tree.getRoot().left.value, 4);
		});		
	});

	it ('should increase the height of the subtree when a new node is inserted', function () {
		tree.insert(4);
		tree.insert(5);
		assert.equal(tree.getRoot().height, 1);
		tree.insert(3);
		assert.equal(tree.getRoot().height, 1);
		assert.equal(tree.getRoot().left.height, 0);
	});

	it ('should rotate right when the insertion causes a leftleft scenario', function () {
		var afterBalance = new AVLTree();
		tree.insert(10).insert(11).insert(6).insert(7).insert(4).insert(5).insert(3);
		afterBalance.insert(6).insert(4).insert(10).insert(3).insert(5).insert(7).insert(11);
		assert.deepEqual(tree.getRoot(), afterBalance.getRoot());
	});

	it ('should rotate left when the insertion causes a rightright scenario', function () {
		var afterBalance = new AVLTree();
		tree.insert(6).insert(3).insert(10).insert(7).insert(12).insert(11).insert(13);
		afterBalance.insert(10).insert(6).insert(12).insert(3).insert(7).insert(11).insert(13);
		assert.deepEqual(tree.getRoot(), afterBalance.getRoot());
	});

	it ('should rotate left then right when the insertion causes a leftright scenario', function () {
		var afterBalance = new AVLTree();		
		tree.insert(10).insert(5).insert(11).insert(3).insert(7).insert(6).insert(8);
		afterBalance.insert(7).insert(5).insert(10).insert(3).insert(6).insert(8).insert(11);		
		assert.deepEqual(tree.getRoot(), afterBalance.getRoot());
	});

	it ('should rotate right then left when the insertion causes a rightleft scenario', function () {
		var afterBalance = new AVLTree();
		tree.insert(10).insert(7).insert(15).insert(12).insert(18).insert(11).insert(13);
		afterBalance.insert(12).insert(10).insert(15).insert(7).insert(11).insert(13).insert(18);
		assert.deepEqual(tree.getRoot(), afterBalance.getRoot());
	});
});