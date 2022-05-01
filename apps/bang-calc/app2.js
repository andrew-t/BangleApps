const FONT_SIZE = 16;
const FONT_OFFSET_X = 1;
const FONT_OFFSET_Y = 1;
const EMPTY_NODE_SIZE = 48; // decent size touch target
const WIDTH = g.getWidth();
const BUTTON_HEIGHT = 48;
const HEIGHT = g.getHeight() - BUTTON_HEIGHT; // TODO - subtract button space

// TODO: this is bad practice, remove when it's handled properly:
Bangle.removeAllListeners();

// Finds an unused ID to assign to a node
function getAvailableId(ast) {
	const all = {}, queue = [ast];
	while (queue.length) {
		const node = queue.pop();
		all[node.id] = true;
		if (node.children) for (const child of node.children) queue.push(child);
	}
	let i = 1;
	while (all[i]) ++i;
	return i;
}

// Finds an entry in the render cache pertaining to a given node
function getRenderCacheEntry(ast, renderCache, node) {
	if (!node.id) node.id = getAvailableId(ast);
	if (!renderCache[node.id]) renderCache[node.id] = { x: 0, y: 0, w: FONT_SIZE, h: FONT_SIZE };
	return renderCache[node.id];
}

// Turns a number into something printable, so as short as possible
function shortNumberString(val) {
	// TODO: this but better
	return val.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

function needsBrackets(node, parent) {
	// no brackets on the root node, obviously
	if (!parent) return false;
	const i = parent.children.indexOf(node);
	// always brackets in the value of a power, never in the power (unless we are also a power)
	if (parent.op == '^') return i == 0 || node.op == '^';
	// never use brackets in a fraction (unless we are also a fraction)
	if (parent.op == '/') return node.op == '/';
	// since we know were not in a power or a fraction, * is the highest precedence operator around so that never needs brackets
	if (node.op == '*') return false;
	// conversely, *everything* needs brackets if we're in a *
	if (parent.op == '*') return true;
	// if we're in a minus, we need brackets for the second value only - (a+b)-c is redundant but a-(b+c) is not
	if (parent.op == '-') return i == 1;
	// we must now be in a + as we've ruled everything else out. 
	// if we're a + then we can't possibly need brackets
	// otherwise, we're a minus in a plus. (a-b)+c is redundant and so is a+(b-c) so no brackets in any remaining case
	return false;
}

// Stores extra data in the render cache about a node
function sizeNode(ast, renderCache, node, currentNode, parent) {
	const rc = getRenderCacheEntry(ast, renderCache, node);
	if (node == currentNode) rc.current = true;
	if (parent) {
		rc.parent = parent;
		rc.parentRc = getRenderCacheEntry(ast, renderCache, parent);
		if (rc.parentRc.current || rc.parentRc.inCurrent) rc.inCurrent = true;
	}
	if (node.val != undefined) {
		rc.str = shortNumberString(node.val);
		rc.w = g.stringWidth(rc.str);
	} else switch(node.op) {
		// inline binary operators:
		case '+': case '-': case '*':
			rc.brackets = needsBrackets(node, parent);
			let x = rc.brackets ? 6 : 0;
			for (const child of node.children) {
				const childRc = sizeNode(ast, renderCache, child, currentNode, node);
				if (rc.h < childRc.h) rc.h = childRc.h;
				childRc.x = x;
				x += childRc.w + FONT_SIZE;
			}
			for (const child of node.children) {
				const childRc = sizeNode(ast, renderCache, child, currentNode, node);
				childRc.y = (rc.h - childRc.h) / 2;
			}
			rc.w = x - FONT_SIZE + (rc.brackets ? 6 : 0);
			break;
		case '/':
			const numerator = sizeNode(ast, renderCache, node.children[0], currentNode, node);
			const denominator = sizeNode(ast, renderCache, node.children[1], currentNode, node);
			rc.h = numerator.h + denominator.h + 6;
			rc.w = Math.max(numerator.w, denominator.w);
			numerator.x = (rc.w - numerator.w) * 0.5;
			denominator.x = (rc.w - denominator.w) * 0.5;
			denominator.y = numerator.h + 6;
			break;
		case '^':
			const value = sizeNode(ast, renderCache, node.children[0], currentNode, node);
			const power = sizeNode(ast, renderCache, node.children[1], currentNode, node);
			rc.h = value.h + power.h - FONT_SIZE * 0.5;
			rc.w = value.w + power.w + 2;
			power.x = value.w + 2;
			value.y = power.h - FONT_SIZE * 0.5;
			break;
		case undefined:
			rc.w = rc.h = EMPTY_NODE_SIZE;
			break;
		default: throw new Error("unexpected operator:", node);
	}
	return rc;
}

// Draw a node
function drawNode(ast, renderCache, node, x, y) {
	const rc = getRenderCacheEntry(ast, renderCache, node);
	x += rc.x; y += rc.y;
	if (node.val != undefined)
		g.drawString(rc.str, x + FONT_OFFSET_X, y + FONT_OFFSET_Y);
	else switch(node.op) {
		// inline binary operators:
		case '+': case '-': case '*':
			let first = true, opX = x + FONT_SIZE * 0.2 + FONT_OFFSET_X;
			if (rc.brackets) {
				g.fillRect(x, y, x + 3, y + 1);
				g.fillRect(x, y, x + 1, y + rc.h - 1);
				g.fillRect(x, y+ rc.h - 2, x + 3, y + rc.h - 1);
				g.fillRect(x + rc.w - 4, y, x + rc.w - 1, y + 1);
				g.fillRect(x + rc.w - 2, y, x + rc.w - 1, y + rc.h - 1);
				g.fillRect(x + rc.w - 4, y+ rc.h - 2, x + rc.w -1, y + rc.h - 1);
				opX += 6;
			}
			for (const child of node.children) {
				if (first) first = false;
				else {
					// todo: maybe draw an operator rather than using a font?
					g.drawString(node.op, opX, y + (rc.h - FONT_SIZE) / 2 + FONT_OFFSET_Y);
					opX += FONT_SIZE;
				}
				const childRc = getRenderCacheEntry(ast, renderCache, child);
				drawNode(ast, renderCache, child, x, y);
				opX += childRc.w;
			}
			break;
		case '/':
			const numerator = getRenderCacheEntry(ast, renderCache, node.children[0]);
			const denominator = getRenderCacheEntry(ast, renderCache, node.children[1]);
			g.fillRect(x, y + numerator.h + 2, x + rc.w - 1, y + numerator.h + 3);
			// fallthrough to...
		case '^':
			for (const child of node.children) drawNode(ast, renderCache, child, x, y);
			break;
		case undefined:
			g.setColor('#00f');
			g.drawRect(x, y, x + rc.w - 1, y + rc.h - 1);
			g.setColor('#000');
			break;
		default: throw new Error("unexpected operator:", node);
	}
	return rc;
}

let currentNode, ast;
function acButton() { ast = currentNode = {}; }
acButton();

// for debug, populate this nonsense:
ast = { op: '+', children: [
	{ op: '^', children: [{ val: 3.14 }, currentNode] },
	{ op: '^', children: [
		{ op: '+', children: [{ val: 1 }, {  }] },
		{ op: '/', children: [{  }, { val: 2 }] }
	] },
	{ val: 1 }
]};


function anyEmpty() {
	let queue = [ast];
	while (queue.length) {
		const node = queue.pop();
		if (node.val == undefined && !node.op) return true;
		if (node.children) for (const c of node.children) queue.push(c);
	}
	return false;
}

function findParent(target) {
	let queue = [ast];
	while (queue.length) {
		const node = queue.pop();
		if (node.children) for (const c of node.children) {
			if (c == target) return node;
			queue.push(c);
		}
	}
}

function delButton() {
	console.log('Delete key');
	// if it's a number, just delete it and return the cell to empty
	if (currentNode.val != null)
		delete currentNode.val;
	// if it's an operator, again delete it and return the cell to empty
	else if (currentNode.op)
		delete currentNode.op;
	else {
		// we're going to remove this child from the parent.
		const parent = findParent(currentNode);
		// if there's no parent there's nothing to do, we can't delete the root node
		if (!parent) return;
		// ok, remove the node we don't want.
		parent.children = parent.children.filter(c => c != currentNode);
		// if there was only one we should remove the parent node altogether
		const grandParent = findParent(parent);
		if (parent.children.length == 1) {
			// if there's no node above it then reset the whole thing
			if (!grandParent) acButton();
			// otherwise just replace the once cell we don't want with its remaining child
			else {
				currentNode = parent.children[0];
				grandParent.children = grandParent.children.map(c => c == parent ? currentNode : c);
			}
		} else if (parent.children.length == 0) {
			currentNode = {};
			grandParent.children = grandParent.children.map(c => c == parent ? currentNode : currentNode);
		} // if there are more children that's fine it can keep them
		else currentNode = parent;
	}
}

let sign = 1; 
// call this function to enter "prefix unary operator" mode
function drawPreOpScreen() {
	sign = 1;

	const complete = !anyEmpty();
	g.reset();
	g.setBgColor('#000');
	g.clear();
	g.setColor('#008');
	g.fillRect(0, 0, 57, 57);
	g.fillRect(59, 0, 116, 57);
	g.fillRect(118, 0, 175, 57);
	g.fillRect(0, 59, 57, 116);
	g.fillRect(59, 59, 175, 116);
	g.fillRect(0, 118, 57, 175);
	g.fillRect(59, 118, 175, 175);
	g.setColor('#fff');
	g.setFont("Vector", 24);
	g.setFontAlign(0, 0);
	g.drawString("e", 29, 29);
	g.drawString("pi", 88, 29);
	g.drawString("tau", 147, 29);
	g.drawString("+/-", 29, 88);
	g.drawString("Answer", 116, 88);
	g.drawString("<<", 29, 147);
	g.drawString("Number", 116, 147);

	function exit() {
		drawEquationMode();
		Bangle.removeListener('touch', tapEvent);
	}
	function enterNumber(n) {
		currentNode.val = n * sign;
		exit();
	}
	function tapEvent(b, xy) {
		if (xy.y < 59) {
			if (xy.x < 59) enterNumber(Math.E);
			else if (xy.x < 118) enterNumber(Math.PI);
			else enterNumber(Math.PI * 2);
		} else if (xy.y < 118) {
			if (xy.x < 59) {
				sign *= -1;
				g.setColor('#008');
				g.fillRect(0, 59, 57, 116);
				g.setColor('#fff');
				g.drawString(sign > 0 ? "+" : "-", 29, 88);
			} else console.log('todo - answer menu');
		} else {
			if (xy.x < 59) exit();
			else {
				drawNumberScreen();
				Bangle.removeListener('touch', tapEvent);
			}
		}
	}
	Bangle.on('touch', tapEvent);
}

// call this function to enter "type a number" mode
function drawNumberScreen() {
	console.log('TODO: number screen');
}

// call this function to enter "binary or postfix unary operator" mode
function drawPostOpScreen() {
	console.log('TODO: post-op screen');
}

function editNode() {
	if (currentNode.val || currentNode.op) drawPostOpScreen();
	else drawPreOpScreen();
}

function equals() {
	console.log('equals!');
}

// Call this button to enter the "expanded menu" mode
function drawExpandedButtons() {
	console.log("Expanded button mode!");
	const complete = !anyEmpty();
	g.reset();
	g.setBgColor('#000');
	g.clear();
	g.setColor('#800');
	g.fillRect(0, 0, 57, 57);
	g.setColor('#008');
	g.fillRect(59, 0, 116, 57);
	g.setColor('#800');
	g.fillRect(118, 0, 175, 57);
	g.setColor('#008');
	g.fillRect(0, 59, 57, 116);
	g.fillRect(59, 59, 116, 116);
	g.fillRect(118, 59, 175, 116);
	g.setColor('#800');
	if (complete) g.fillRect(0, 118, 57, 175);
	g.setColor('#008');
	g.fillRect(59, 118, 116, 175);
	g.fillRect(118, 118, 175, 175);
	g.setColor('#fff');
	g.setFont("Vector", 24);
	g.setFontAlign(0, 0);
	g.drawString("del", 29, 29);
	g.drawString("^", 88, 29);
	g.drawString("AC", 147, 29);
	g.drawString("<", 29, 88);
	g.drawString("edit", 88, 88);
	g.drawString(">", 147, 88);
	if (complete) g.drawString("=", 29, 147);
	g.drawString("v", 88, 147);
	g.drawString("less", 147, 147);

	function tapEvent(b, xy) {
		if (xy.y < 59) {
			if (xy.x < 59) {
				delButton();
				drawEquationMode();
			} else if (xy.x < 118) {
				const parent = findParent(currentNode);
				if (parent) currentNode = parent;
				drawEquationMode();
			} else {
				acButton();
				drawEquationMode();
			}
		} else if (xy.y < 118) {
			if (xy.x < 59) {
				const parent = findParent(currentNode);
				if (parent) {
					const i = parent.children.indexOf(currentNode);
					if (i > 0) currentNode = parent.children[i - 1];
					else if (parent.op == '+' || parent.op == '*') {
						currentNode = {};
						parent.children.unshift(currentNode);
					}
				}
				drawEquationMode();
			} else if (xy.x < 118) editNode();
			else {
				const parent = findParent(currentNode);
				if (parent) {
					const i = parent.children.indexOf(currentNode);
					if (i < parent.children.length - 1) currentNode = parent.children[i + 1];
					else if (parent.op == '+' || parent.op == '*') {
						currentNode = {};
						parent.children.push(currentNode);
					}
				}
				drawEquationMode();
			}
		} else {
			if (xy.x < 59) {
				if (complete) equals();
			} else if (xy.x < 118) {
				if (currentNode.children && currentNode.children.length)
					currentNode = currentNode.children[0];
				drawEquationMode();
			} else drawEquationMode();
		}
		Bangle.removeListener('touch', tapEvent);
	}
	Bangle.on('touch', tapEvent);
}

// Call this function to enter "panning around the equation" mode
function drawEquationMode() {
	console.log("Equation mode!");
  
	const complete = !anyEmpty();

	// draw "buttons"
	g.reset();
	g.setBgColor('#000');
	g.clear();
	g.setColor('#800');
	g.fillRect(0, HEIGHT + 1, 57, HEIGHT + BUTTON_HEIGHT - 1);
	g.setColor('#008');
	g.fillRect(59, HEIGHT + 1, 116, HEIGHT + BUTTON_HEIGHT - 1);
	g.fillRect(118, HEIGHT + 1, WIDTH - 1, HEIGHT + BUTTON_HEIGHT - 1);
	g.setColor('#fff');
	g.setFont("Vector", 24);
	g.setFontAlign(0, 0);
	if (complete) g.drawString("=", 29, 152);
	else g.drawString("del", 29, 152);
	g.drawString("edit", 88, 152);
	g.drawString("...", 147, 152);

	// calculate where everything is
	const renderCache = {};
	// We need the font size for calculating widths of things:
	g.setFont("Vector", FONT_SIZE);
	const rc = sizeNode(ast, renderCache, ast, currentNode);

	// work out current node bounding box
	let currentRc, cx, cy, x, y;
	function drawAst() {
		g.reset();
		g.setBgColor('#fff');
		g.setFont("Vector", FONT_SIZE);
		g.setFontAlign(-1, -1);
		g.setClipRect(0, 0, WIDTH - 1, HEIGHT - 1);
		g.clear();
		g.setColor('#ff0');
		g.fillRect(cx + x, cy + y, cx + x + currentRc.w - 1, cy + y + currentRc.h - 1);
		g.setColor('#000');
		drawNode(ast, renderCache, ast, x, y);
	}
	function constrainCoords() {
		if (rc.w <= WIDTH) x = (WIDTH - rc.w) / 2;
		else if (x > 3) x = 3;
		else if (x + rc.x >= WIDTH + 3) x = WIDTH + 3 - rc.w;
		if (rc.h <= HEIGHT) y = (HEIGHT - rc.h) / 2;
		else if (y > 3) y = 3;
		else if (y + rc.y >= HEIGHT + 3) y = HEIGHT + 3 - rc.h;
		drawAst();
	}
	function centreCurrentNode() {
		x = (WIDTH - currentRc.w) / 2 - cx;
		y = (HEIGHT - currentRc.h) / 2 - cy;
		constrainCoords();
	}
	function setCurrentNode(newValue) {
		currentNode = newValue;
		currentRc = getRenderCacheEntry(ast, renderCache, currentNode);
		cx = 0;
		cy = 0;
		for (let p = currentRc; p; p = p.parentRc) {
			cx += p.x;
			cy += p.y;
		}
		centreCurrentNode();
	}
	setCurrentNode(currentNode);

	// handle scrolling
	let hasScrolled = false;
	function scrollEvent(e) {
		if (e.b) {
			g.setClipRect(0, 0, WIDTH - 1, HEIGHT - 1);
			g.scroll(e.dx, e.dy);
			x += e.dx;
			y += e.dy;
			hasScrolled = true;
		} else if (hasScrolled) {
			constrainCoords();
			hasScrolled = false;
			drawAst();
		}
	}
	Bangle.on('drag', scrollEvent);

	function tapEvent(b, xy) {
		if (xy.y > HEIGHT) {
			if (xy.x < 59) {
				if (complete) console.log('todo - equals!');
				else {
					delButton();
					drawEquationMode(); // reload this same view
				}
			} else if (xy.x < 118) editNode();
			else drawExpandedButtons();
			cleanup();
			return;
		}
		let touchedNode = null,
			possibilities = [ast],
			cx = x, cy = y;
		while (true) {
			let touchedAChild = false; // i mean let's hope
			for (const node of possibilities) {
				const rc = getRenderCacheEntry(ast, renderCache, node);
				if (xy.x >= cx + rc.x &&
					xy.x < cx + rc.x + rc.w &&
					xy.y >= cy + rc.y &&
					xy.y < cy + rc.y + rc.h
				) {
					touchedNode = node;
					possibilities = node.children || [];
					cx += rc.x;
					cy += rc.y;
					touchedAChild = true; // and you through CRYPTOGRAPHIC nonces were bad
					break;
				}
			}
			if (touchedAChild) continue; // catholic church mode engaged
			if (touchedNode) {
				setCurrentNode(touchedNode);
				return;
			}
			break;
		}
	}
	Bangle.on('touch', tapEvent);

	function cleanup() {
		Bangle.removeListener('drag', scrollEvent);
		Bangle.removeListener('touch', tapEvent);
	}

	return renderCache;
}

drawEquationMode();
