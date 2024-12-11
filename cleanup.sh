#!/bin/bash

echo "Starting cleanup process..."

# Function to safely remove files and directories
safe_remove() {
    if [ -e "$1" ]; then
        rm -rf "$1"
        echo "Removed: $1"
    fi
}

# Config cleanup
echo "Cleaning up config files..."
CONFIG_FILES=(
    "src/config/features.ts"
    "src/config/validation.ts"
    "src/config/supabase.ts"
    "src/config/spotify.ts"
    "src/config/releases.ts"
    "src/config/links.ts"
    "src/config/fontawesome.ts"
    "src/config/auth.ts"
)

for file in "${CONFIG_FILES[@]}"; do
    safe_remove "$file"
done

# App pages cleanup
echo "Cleaning up app pages..."
APP_DIRS=(
    "src/app/music"
    "src/app/consent"
    "src/app/consent-form"
    "src/app/consent-success"
    "src/app/tips"
)

for dir in "${APP_DIRS[@]}"; do
    safe_remove "$dir"
done

# API routes cleanup
echo "Cleaning up API routes..."
API_DIRS=(
    "src/app/api/create-payment-intent"
    "src/app/api/admin"
    "src/app/api/consent"
)

for dir in "${API_DIRS[@]}"; do
    safe_remove "$dir"
done

# Components cleanup
echo "Cleaning up components..."
COMPONENT_DIRS=(
    "src/components/sections/MusicLayout"
    "src/components/sections/MusicPlayer"
    "src/components/admin"
)

for dir in "${COMPONENT_DIRS[@]}"; do
    safe_remove "$dir"
done

# Clean up unused UI components
echo "Cleaning up unused UI components..."
UI_COMPONENTS=(
    "src/components/ui/Tabs"
    "src/components/ui/Tooltip"
)

for dir in "${UI_COMPONENTS[@]}"; do
    safe_remove "$dir"
done

echo "Creating core files structure..."

# Ensure core directories exist
mkdir -p src/components/sections/Music
mkdir -p src/components/ui
mkdir -p src/config
mkdir -p src/constants
mkdir -p src/contexts
mkdir -p src/types

echo "Cleanup complete! The following core files should be reviewed and cleaned:"
echo "- src/config/site.ts"
echo "- src/config/index.ts"
echo "- src/constants/albums.ts"
echo "- src/components/sections/Music/index.tsx"
echo "- src/components/sections/Music/VinylPlayer.tsx"
echo "- src/components/sections/Music/AlbumList.tsx"
echo "- src/components/ui/VinylBackground/index.tsx"
echo "- src/components/ui/StylizedLogo/index.tsx"
echo "- src/contexts/MusicPlatformContext.tsx"
echo "- src/types/music.ts" 