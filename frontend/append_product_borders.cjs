const fs = require('fs');
const extra = `
/* ── ProductDetails page: restore borders on cards ────────────────── */
.ss-product-content .ss-card {
  border: 1px solid var(--border);
}
.ss-product-content .ss-stat-card {
  border: 1px solid var(--border);
}
`;
fs.appendFileSync('d:/Anti/SmartStock/frontend/src/index.css', extra);
console.log('done');
