// Show launcher when middle button pressed
Bangle.setUI("clock");

const w = g.getWidth() / 6;
const h = g.getHeight() / 10;

function drawRect(x, y) {
  return function drawRect(x1, y1, x2, y2) {
    g.fillRect((x1 + x) * w, (y1 + y) * h, (x2 + x) * w, (y2 + y) * h);
  };
}

function drawN(x, y, n) {
  const draw = drawRect(x * 3, y * 5);
  switch (~~n) {
    case 0:
      draw(1, 1, 2, 4);
      break;
    case 1:
      draw(0, 0, 1, 5);
      draw(2, 0, 3, 5);
      break;
    case 2:
      draw(0, 1, 2, 2);
      draw(1, 3, 3, 4);
      break;
    case 3:
      draw(0, 1, 2, 2);
      draw(0, 3, 2, 4);
      break;
    case 4:
      draw(1, 0, 2, 2);
      draw(0, 3, 2, 5);
      break;
    case 5:
      draw(1, 1, 3, 2);
      draw(0, 3, 2, 4);
      break;
    case 6:
      draw(1, 1, 3, 2);
      draw(1, 3, 2, 4);
      break;
    case 7:
      draw(0, 1, 2, 5);
      break;
    case 8:
      draw(1, 1, 2, 2);
      draw(1, 3, 2, 4);
      break;
    case 9:
      draw(1, 1, 2, 2);
      draw(0, 3, 2, 4);
      break;
  }
}

function digit(n, k) {
  while (k > 0) {
    n /= 10;
    --k;
  }
  return (~~n) % 10;
}

function drawTime() {
  g.setBgColor(g.theme.bg);
  g.clear();
  g.setBgColor(g.theme.fg);
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  drawN(0, 0, digit(h, 1));
  drawN(1, 0, digit(h, 0));
  drawN(0, 1, digit(m, 1));
  drawN(1, 1, digit(m, 0));
}

let drawTimeout = null;
function queueDrawTime() {
  if (drawTimeout) clearTimeout(drawTimeout);
  const interval = 60000;
  const now = Date.now();
  const wait = (interval - (now % interval)) || interval;
  drawTimeout = setTimeout(() => {
    drawTimeout = null;
    drawTime();
  }, wait);
}

queueDrawTime();
drawTime();
