const storage = require('Storage');
const data = storage.readJSON('bang-calc.json', 1) || { history: [] };
function store(newData) {
  if (newData) Object.assign(data, newData);
  storage.writeJSON('bang-calc.json', data);
}

let elements = [];

function updateElement(el) {
  g.setFont("Vector", 24);
  g.setBgColor(el.bg || '#000');
  g.setColor(el.fg || '#fff');
  if (el.align == 'right') {
    g.setFontAlign(1, 0);
    g.drawString(
      el.label(),
      el.x * 44 + el.w * 44 - 3,
      el.y * 44 + el.h * 22,
      true
    );
  } else {
    g.setFontAlign(0, 0);
    g.drawString(
      el.label(),
      el.x * 44 + el.w * 22,
      el.y * 44 + el.h * 22,
      true
    );
  }
}

function drawElements() {
  for (const el of elements) {
    g.setColor(el.bg || '#000');
    g.fillRect(
      el.x * 44 + 1,
      el.y * 44 + 1,
      (el.x + el.w) * 44 - 3,
      (el.y + el.h) * 44 - 3
    );
    updateElement(el);
  }
}

function setElements(els) {
  elements = els;
  g.setBgColor('#000');
  g.clear();
  drawElements();
}

Bangle.on("touch", (b, xy) => {
  const x = Math.min(xy.x, 175) / 44;
  const y = Math.min(xy.y, 175) / 44;
  for (const el of elements)
    if (el.action && x >= el.x && y >= el.y && x - el.x < el.w && y - el.y < el.h)
      el.action();
});

let ast = null, currentNode = null, nextId = 1;

function nodeContainsCurrent(node) {
  if (node == currentNode) return true;
  if (!node) return false;
  if (nodeContainsCurrent(node.arg)) return true;
  if (nodeContainsCurrent(node.left)) return true;
  if (nodeContainsCurrent(node.right)) return true;
  return false;
}

const LOG10 = Math.log(10);
const DIGITS = 11;
function toMaxDp(value, n) {
  if (!(value % 1)) return value.toString();
  return value.toFixed(n).replace(/0+$/, '0');
}
function valueToDisplayString(v) {
  if (!isFinite(v)) return "ERROR";
  // If the obvious stringification fits on the screen, use that. That means all reasonably-sized integers and quickly-terminating decimals:
  const naive = v.toString();
  if (naive.length <= DIGITS) return naive;
  // The other useful case is something like 10/3 where we can show enough decimals to get the point across. Assume we need 2 digits for .3 or whatever.
  const prePoint = (~~v).toString();
  if (prePoint.length <= DIGITS - 2)
    return toMaxDp(v, DIGITS - 1 - prePoint.length);
  // Otherwise we have a number so big, or so small, that we can't nicely show it, so fall back to scientific notation.
  let exp = 0, val = v;
  if (Math.abs(val) > 1) while (Math.abs(val) > 10) {
    exp += 1;
    val /= 10;
  } else while (Math.abs(val) <= 1) {
    exp -= 1;
    val *= 10;
  }
  const eStr = 'e' + exp.toString();
  return val.toFixed(DIGITS - eStr.length - 1 - (val < 0)) + eStr;
}
function astToString(node) {
  if (node.hasOwnProperty('value')) {
    if (isNaN(node.value)) return 'ERROR';
    if (node == ast) return valueToDisplayString(node.value);
    return toMaxDp(node.value, 1);
  }
  const isCurrent = node == currentNode;
  const containsCurrent = !isCurrent && nodeContainsCurrent(node);
  if (node.left)
    return '(' +
      astToString(node.left) +
      node.op +
      astToString(node.right) +
      (containsCurrent ? '' : ')');
  switch (node.op) {
    case '!': return astToString(node.arg) + node.op;
    case '-': return node.op + astToString(node.arg);
  }
  if (!node.op && isCurrent) return '';
  // console.log("unexpected node type found while rendering:", node);
  return '?';
}

function evaluateNode(node) {
  if (node.hasOwnProperty('value')) return node.value;
  switch (node.op) {
    case '*': return evaluateNode(node.left) * evaluateNode(node.right);
    case '/': return evaluateNode(node.left) / evaluateNode(node.right);
    case '+': return evaluateNode(node.left) + evaluateNode(node.right);
    case '-': return node.left
      ? evaluateNode(node.left) - evaluateNode(node.right)
      : (0 - evaluateNode(node.arg));
    case '^': return Math.pow(evaluateNode(node.left), evaluateNode(node.right));
    case '!':
      const arg = evaluateNode(node.arg);
      if (arg % 1 || arg < 0 || arg > 100) return NaN;
      let v = 1;
      for (let i = 1; i <= arg; ++i) v *= i;
      return v;
    case 'e': return evaluateNode(node.left) * Math.pow(10, evaluateNode(node.right));
  }
  // // console.log("unexpected node type found while calculating:", node);
  return null;
}

function applyOperator(op, argName) {
  const newNode = Object.assign({ parent: currentNode, id: nextId++ }, currentNode);
  delete currentNode.value;
  delete currentNode.left;
  delete currentNode.right;
  delete currentNode.arg;
  currentNode[argName] = newNode;
  currentNode.op = op;
}

// currentNode should be a valid number (or expression evaluating to a number)
function applyBinaryOperator(op) {
  return () => {
    applyOperator(op, 'left');
    currentNode.op = op;
    currentNode = currentNode.right = { parent: currentNode, id: nextId++ };
    getNumber();
  };
}

// currentNode should be empty
function applyPreOperator(op) {
  return () => {
    applyOperator(op, 'arg');
    currentNode = currentNode.arg;
    getNumber();
  };
}

// currentNode should be a valid number (or expression evaluating to a number)
function applyPostOperator(op) {
  return () => {
    applyOperator(op, 'arg');
    choosePostOrBinaryOperator();
  };
}

function choosePostOrBinaryOperator() {
  // console.log("Getting an operator", ast, currentNode);
  setElements([
    {
      x: 0, y: 0, w: 4, h: 1,
      label: () => astToString(ast),
      action: drawElements,
      align: 'right',
    }, {
      x: 0, y: 1, w: 1, h: 1, bg: '#008',
      label: () => '+',
      action: applyBinaryOperator('+')
    }, {
      x: 1, y: 1, w: 1, h: 1, bg: '#008',
      label: () => '-',
      action: applyBinaryOperator('-')
    }, {
      x: 2, y: 1, w: 1, h: 1, bg: '#008',
      label: () => 'x',
      action: applyBinaryOperator('*')
    }, {
      x: 3, y: 1, w: 1, h: 1, bg: '#008',
      label: () => '/',
      action: applyBinaryOperator('/')
    }, {
      x: 2, y: 2, w: 1, h: 1, bg: '#008',
      label: () => '^',
      action: applyBinaryOperator('^')
    }, {
      x: 3, y: 2, w: 1, h: 1, bg: '#008',
      label: () => '!',
      action: applyPostOperator('!')
    }, {
      x: 0, y: 2, w: 2, h: 1, bg: '#008',
      label: () => 'x10^',
      action: applyBinaryOperator('e')
    }, {
      x: 0, y: 3, w: 2, h: 1, bg: '#800',
      label: () => 'Undo',
      action: () => {
        // if we're here, we must have come from a post-operator or a number
        if (currentNode.arg) {
          // replace it with its own argument
          delete currentNode.arg.parent;
          Object.assign(currentNode, currentNode.arg);
        } else
          // blank it out and enter a new number
          delete currentNode.value;
        getNumber();
      }
    }, {
      x: 2, y: 3, w: 2, h: 1, bg: '#800',
      label: () => ast.hasOwnProperty('value')
        ? 'Clear'
        : currentNode.parent
        ? ')'
        : '=',
      action: () => {
        if (ast.hasOwnProperty('value'))
          reset();
        else if (currentNode.parent) {
          currentNode = currentNode.parent;
          choosePostOrBinaryOperator();
        } else {
          const value = evaluateNode(ast);
          if (!isNaN(value)) {
            data.history.push({
              exp: astToString(ast),
              val: value,
            });
            if (data.history.length > 25) data.history.shift();
            store();
          }
          reset();
          currentNode.value = value;
          choosePostOrBinaryOperator();
        }
      }
    }
  ]);
}

function insertNumber(val) {
  currentNode.value = val;
  choosePostOrBinaryOperator();
}

function choosePreOperator() {
  // console.log("Getting a pre-operator", ast, currentNode);
  const elements = [
    {
      x: 0, y: 0, w: 4, h: 1,
      label: () => astToString(ast),
      action: drawElements,
      align: 'right',
    }, {
      x: 0, y: 1, w: 2, h: 1, bg: '#008',
      label: () => 'pi',
      action: () => insertNumber(Math.PI)
    }, {
      x: 0, y: 2, w: 2, h: 1, bg: '#008',
      label: () => 'tau',
      action: () => insertNumber(Math.PI * 2)
    }, {
      x: 2, y: 1, w: 1, h: 1, bg: '#008',
      label: () => 'e',
      action: () => insertNumber(Math.E)
    }, {
      x: 3, y: 1, w: 1, h: 1, bg: '#080',
      label: () => '#',
      action: getNumber
    }, {
      x: 0, y: 3, w: 2, h: 1, bg: '#008',
      label: () => '-',
      action: applyPreOperator('-')
    }
  ];
  if (data.history.length)
    elements.push({
      x: 2, y: 2, w: 2, h: 1, bg: '#080',
      label: () => 'Ans',
      action: getPreviousAnswer,
    });
  if (currentNode.parent)
    elements.push({
      x: 2, y: 3, w: 2, h: 1, bg: '#800',
      label: () => 'Undo',
      action: () => {
        const p = currentNode.parent;
        // if we're here, we must have come from a pre- or binary operator
        if (p.arg) {
          // just blank it out
          delete p.op;
          delete p.arg;
          currentNode = p;
          getNumber();
        } else {
          // replace it with its own left operataor
          const newNode = p.left;
          delete p.op;
          delete p.left;
          delete p.right;
          delete newNode.parent;
          Object.assign(p, newNode);
          currentNode = p;
          choosePostOrBinaryOperator();
        }
      }
    });
  setElements(elements);
}

function getNumber() {
  // console.log("Getting a number", ast, currentNode);
  let value = '';
  function type(d) {
    return () => {
      value += d;
      drawElements();
    };
  }
  setElements([
    {
      x: 1, y: 0, w: 3, h: 1,
      label: () => value || '0',
      action: drawElements,
      align: 'right'
    }, {
      x: 0, y: 0, w: 1, h: 1,
      label: () => currentNode.parent ? currentNode.parent.op : '>',
      action: drawElements,
    }, {
      x: 0, y: 1, w: 1, h: 1, bg: '#008',
      label: () => 7,
      action: type(7)
    }, {
      x: 1, y: 1, w: 1, h: 1, bg: '#008',
      label: () => 8,
      action: type(8)
    }, {
      x: 2, y: 1, w: 1, h: 1, bg: '#008',
      label: () => 9,
      action: type(9)
    }, {
      x: 0, y: 2, w: 1, h: 1, bg: '#008',
      label: () => 4,
      action: type(4)
    }, {
      x: 1, y: 2, w: 1, h: 1, bg: '#008',
      label: () => 5,
      action: type(5)
    }, {
      x: 2, y: 2, w: 1, h: 1, bg: '#008',
      label: () => 6,
      action: type(6)
    }, {
      x: 0, y: 3, w: 1, h: 1, bg: '#008',
      label: () => 1,
      action: type(1)
    }, {
      x: 1, y: 3, w: 1, h: 1, bg: '#008',
      label: () => 2,
      action: type(2)
    }, {
      x: 2, y: 3, w: 1, h: 1, bg: '#008',
      label: () => 3,
      action: type(3)
    }, {
      x: 3, y: 1, w: 1, h: 1, bg: '#080',
      label: () => value ? 'Del' : '...',
      action: () => {
        if (value) {
          value = value.substr(0, value.length - 1);
          drawElements();
        } else {
          choosePreOperator();
        }
      }
    }, {
      x: 3, y: 2, w: 1, h: 1, bg: '#800',
      label: () => value.includes('.') ? 'OK' : '.',
      action: () => {
        if (value.includes('.'))
          insertNumber(parseFloat(value || '0'));
        else {
          value = (value || '0') + '.';
          drawElements();
        }
      }
    }, {
      x: 3, y: 3, w: 1, h: 1, bg: '#008',
      label: () => 0,
      action: type(0)
    }
  ]);
}

function getPreviousAnswer() {
  elements = [];
  g.setBgColor('#000');
  g.clear();
  g.setColor('#fff');
  const deadTime = Date.now() + 250;
  E.showScroller({
    h: 56,
    c: data.history.length + 1,
    draw: (i, r) => {
      if (i == 0) {
        g.setBgColor('#000');
        g.clearRect(r.x, r.y, r.x + r.w, r.y + r.h);
        g.setBgColor('#800');
        g.clearRect(r.x + 1, r.y + 1, r.x + r.w - 2, r.y + r.h - 2);
        g.setColor('#fff');
        g.setFont('Vector', 24);
        g.setFontAlign(0, 0);
        g.drawString("< Back", r.x + r.w / 2, r.y + r.h / 2);
        return;
      }
      // FIXME: in 2v13 onwards, clearRect(r) will work fine. There's a bug in 2v12
      g.setBgColor('#000');
      g.clearRect(r.x, r.y, r.x + r.w, r.y + r.h);
      g.setBgColor('#008');
      g.clearRect(r.x + 1, r.y + 1, r.x + r.w - 2, r.y + r.h - 2);
      g.setFont('6x8');
      g.setFontAlign(-1, 0);
      g.drawString(
        data.history[data.history.length - i].exp,
        r.x + 4,
        r.y + 10
      );
      g.setFont('Vector', 24);
      g.setFontAlign(1, 0);
      g.drawString(
        valueToDisplayString(data.history[data.history.length - i].val),
        r.x + r.w - 2,
        r.y + 36
      );
    },
    select: i => {
      if (Date.now() < deadTime) {
        // this is a bad hack to stop duplicate touch events but i don't know why they happen so this is the deal:
        // console.log('ignoring selection in deadtime', i);
        return;
      }
      // console.log('selected', i, data.history[i - 1]);
      E.showScroller();
      if (i) {
        insertNumber(data.history[data.history.length - i].val);
        choosePostOrBinaryOperator();
      } else getNumber();
    }
  });
}

// pass in a value to debug the value display code
function reset(value) {
  nextId = 2;
  ast = currentNode = { id: 1 };
  if (value != undefined) {
    ast.value = value;
    choosePostOrBinaryOperator();
  } else
    getNumber();
}

reset();
