import express from "express";

const app = express();


/** Helpers */
const num = (x) => Number(x);
const badNum = (x) => !Number.isFinite(num(x));
const error = (res, msg) => res.status(400).json({ ok: false, error: msg });

/** Health (tu test lo usa) */
app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "Hola Microservicio 2" });
});

/** GET /calc/suma?a=5&b=7 */
app.get("/calc/suma", (req, res) => {
  const { a, b } = req.query;
  if (badNum(a) || badNum(b)) return error(res, "Parámetros inválidos: usa ?a=<n>&b=<n>");
  res.json({ ok: true, op: "suma", a: +a, b: +b, result: +a + +b });
});

/** GET /calc/resta?a=10&b=3 */
app.get("/calc/resta", (req, res) => {
  const { a, b } = req.query;
  if (badNum(a) || badNum(b)) return error(res, "Parámetros inválidos: usa ?a=<n>&b=<n>");
  res.json({ ok: true, op: "resta", a: +a, b: +b, result: +a - +b });
});

/** GET /calc/multiplica?a=6&b=4 */
app.get("/calc/multiplica", (req, res) => {
  const { a, b } = req.query;
  if (badNum(a) || badNum(b)) return error(res, "Parámetros inválidos: usa ?a=<n>&b=<n>");
  res.json({ ok: true, op: "multiplica", a: +a, b: +b, result: (+a) * (+b) });
});

/** GET /calc/divide?a=10&b=2 */
app.get("/calc/divide", (req, res) => {
  const { a, b } = req.query;
  if (badNum(a) || badNum(b)) return error(res, "Parámetros inválidos: usa ?a=<n>&b=<n>");
  if (+b === 0) return error(res, "División por cero");
  res.json({ ok: true, op: "divide", a: +a, b: +b, result: (+a) / (+b) });
});
export default app;
