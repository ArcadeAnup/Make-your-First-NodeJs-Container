const path = require("path");

const express = require("express");
const yaml = require("js-yaml");

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir, { index: false }));

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

function toClientError(err) {
  const message = (err && err.message) || "Unknown error";
  const mark = err && err.mark ? { line: err.mark.line, column: err.mark.column } : null;
  return { message, mark };
}

app.post("/api/validate", (req, res) => {
  const text = typeof req.body?.yaml === "string" ? req.body.yaml : "";
  if (!text.trim()) {
    return res.status(400).json({ ok: false, error: { message: "No YAML provided.", mark: null } });
  }

  try {
    yaml.load(text);
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ ok: false, error: toClientError(err) });
  }
});

app.post("/api/format", (req, res) => {
  const text = typeof req.body?.yaml === "string" ? req.body.yaml : "";
  if (!text.trim()) {
    return res.status(400).json({ ok: false, error: { message: "No YAML provided.", mark: null } });
  }

  try {
    const parsed = yaml.load(text);
    const formatted = yaml.dump(parsed, { indent: 2, lineWidth: -1, noRefs: true });
    return res.json({ ok: true, formatted });
  } catch (err) {
    return res.status(400).json({ ok: false, error: toClientError(err) });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`FixMyYAML listening on http://localhost:${port}`);
});

