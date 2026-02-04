#!/bin/bash
#
# Update Atlas Data
# Downloads the latest atlas from sky-atlas.io and updates config if changed
#
# Usage: ./scripts/data/update-atlas.sh
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ATLAS_DIR="$PROJECT_ROOT/public/data/atlas"
REMOTE_URL="https://sky-atlas.io/api/atlas.json"
TEMP_FILE="/tmp/remote-atlas-$$.json"

# Config file paths
TS_CONFIG="$PROJECT_ROOT/src/config/dataPaths.ts"
JS_CONFIG="$PROJECT_ROOT/omnipanel/src/config/dataPaths.js"

echo "=== Atlas Update Script ==="
echo ""

# Download remote atlas
echo "Downloading from $REMOTE_URL..."
curl -sf "$REMOTE_URL" -o "$TEMP_FILE" || {
    echo "ERROR: Failed to download atlas"
    rm -f "$TEMP_FILE"
    exit 1
}

# Find current atlas file from config
CURRENT_FILE=$(grep -oP "current: '/data/atlas/\K[^']+(?=')" "$TS_CONFIG")
CURRENT_PATH="$PROJECT_ROOT/public/data/atlas/$CURRENT_FILE"

echo "Current local file: $CURRENT_FILE"

# Compare hashes
LOCAL_HASH=$(sha256sum "$CURRENT_PATH" 2>/dev/null | cut -d' ' -f1 || echo "none")
REMOTE_HASH=$(sha256sum "$TEMP_FILE" | cut -d' ' -f1)

echo "Local hash:  $LOCAL_HASH"
echo "Remote hash: $REMOTE_HASH"
echo ""

if [ "$LOCAL_HASH" = "$REMOTE_HASH" ]; then
    echo "✓ Atlas is already up to date."
    rm -f "$TEMP_FILE"
    exit 0
fi

# Files differ - save new version
TODAY=$(date +%Y-%m-%d)
NEW_FILE="atlas-${TODAY}.json"
NEW_PATH="$ATLAS_DIR/$NEW_FILE"

# Check if we already have today's file
if [ -f "$NEW_PATH" ]; then
    EXISTING_HASH=$(sha256sum "$NEW_PATH" | cut -d' ' -f1)
    if [ "$EXISTING_HASH" = "$REMOTE_HASH" ]; then
        echo "✓ Today's file already exists and matches remote."
        rm -f "$TEMP_FILE"
        exit 0
    fi
    echo "WARNING: Today's file exists but differs from remote. Overwriting..."
fi

# Save new file
mv "$TEMP_FILE" "$NEW_PATH"
echo "✓ Saved new atlas: $NEW_FILE"

# Calculate size difference
OLD_SIZE=$(wc -c < "$CURRENT_PATH")
NEW_SIZE=$(wc -c < "$NEW_PATH")
DIFF_SIZE=$((NEW_SIZE - OLD_SIZE))
if [ $DIFF_SIZE -gt 0 ]; then
    echo "  Size change: +$DIFF_SIZE bytes"
else
    echo "  Size change: $DIFF_SIZE bytes"
fi

# Update TypeScript config
echo ""
echo "Updating $TS_CONFIG..."
sed -i "s|current: '/data/atlas/atlas-[0-9-]*\.json'|current: '/data/atlas/$NEW_FILE'|" "$TS_CONFIG"

# Add new entry to history if not present
if ! grep -q "'$TODAY'" "$TS_CONFIG"; then
    sed -i "/history: {/a\\    '$TODAY': '/data/atlas/$NEW_FILE'," "$TS_CONFIG"
fi

# Update JavaScript config
echo "Updating $JS_CONFIG..."
sed -i "s|current: '/data/atlas/atlas-[0-9-]*\.json'|current: '/data/atlas/$NEW_FILE'|" "$JS_CONFIG"

# Add new entry to history if not present
if ! grep -q "'$TODAY'" "$JS_CONFIG"; then
    sed -i "/history: {/a\\    '$TODAY': '/data/atlas/$NEW_FILE'," "$JS_CONFIG"
fi

echo ""
echo "✓ Atlas updated successfully!"
echo ""
echo "Changes:"
echo "  - Downloaded: $NEW_FILE"
echo "  - Updated: src/config/dataPaths.ts"
echo "  - Updated: omnipanel/src/config/dataPaths.js"
echo ""
echo "Run 'npm run build' to verify the update."
