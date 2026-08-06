#!/bin/sh
# Menulis config.js dari environment container, bukan saat build, supaya
# image yang sama dipakai di semua environment.
set -eu

CONFIG_FILE=/app/public/config.js
ESCAPED_API_URL=$(printf '%s' "${API_URL:-}" | sed 's/"/\\"/g')

cat > "$CONFIG_FILE" <<EOF
window.__APP_CONFIG__ = {
  apiUrl: "${ESCAPED_API_URL}"
};
EOF

exec node server.js
