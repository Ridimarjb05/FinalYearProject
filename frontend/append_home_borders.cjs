const fs = require('fs');
const extra = `
/* ── Home page: restore borders on cards ────────────────── */
.ss-home-content .ss-kpi-card {
  border: 1px solid var(--border);
}
.ss-home-content .ss-card {
  border: 1px solid var(--border);
}
.ss-home-content .ss-stat-card {
  border: 1px solid var(--border);
}
.ss-home-content .ss-summary-card {
  border: 1px solid var(--border);
}
`;
fs.appendFileSync('d:/Anti/SmartStock/frontend/src/index.css', extra);
console.log('done');
