export type Coordinate = [number, number];
export type Coords = Array<Coordinate>;

export type Book = {
  title: string;
  // TODO: slugify title
  author?: string;
  coords: Coords;
  recommended?: boolean;
  html?: string;
  // FIXME: update model w/ more fields
};

export const snake_case = (input: string) =>
  input
    .toLowerCase()
    .replace("'", "")
    .split(/[^0-9a-zA-Z]+/g)
    .join("_");

export const drawShape = (
  canvas: HTMLCanvasElement,
  coords: Coords,
  setStyle: (ctx: CanvasRenderingContext2D) => void,
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("could not acquire context2d");
  ctx.lineWidth = 4;
  setStyle(ctx);
  coords = [...coords]; // for immutability
  const first = coords.pop();
  if (!first) throw new Error("No coordinates in shape");
  const [x, y] = first;
  ctx.moveTo(x, y);
  // ctx.fillStyle = "red";
  // ctx.fillRect(x, y, 4, 4);
  ctx.beginPath();
  while (coords.length) {
    let [x, y] = coords.pop()!;
    ctx.lineTo(x, y);
    // ctx.moveTo(x, y);
    // ctx.fillStyle = "red";
    // ctx.fillRect(x, y, 4, 4);
  }
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
};

export const defaultStyle = (ctx: CanvasRenderingContext2D) => {
  ctx.setLineDash([15, 15]);
  ctx.strokeStyle = "rgba(256, 256, 256, .75)";
};
export const recommendedStyle = (ctx: CanvasRenderingContext2D) => {
  ctx.setLineDash([0, 0]);
  ctx.strokeStyle = "#fff";
};
export const clear = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("could not acquire context2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
