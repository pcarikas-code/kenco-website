#!/bin/bash

# Docker Build Script with Environment Variables
# This script reads .env file and passes VITE_ variables as build arguments

set -e  # Exit on error

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    exit 1
fi

# Load environment variables from .env
export $(grep -v '^#' .env | grep -v '^$' | xargs)

# Extract VITE variables
VITE_APP_TITLE="${VITE_APP_TITLE:-App}"
VITE_APP_LOGO="${VITE_APP_LOGO:-/logo.svg}"
VITE_ANALYTICS_ENDPOINT="${VITE_ANALYTICS_ENDPOINT:-}"
VITE_ANALYTICS_WEBSITE_ID="${VITE_ANALYTICS_WEBSITE_ID:-}"

# Get image name from first argument or use default
IMAGE_NAME="${1:-kenco-website}"

echo "Building Docker image: ${IMAGE_NAME}:latest"
echo "VITE_APP_TITLE: ${VITE_APP_TITLE}"
echo "VITE_APP_LOGO: ${VITE_APP_LOGO}"

# Build Docker image with build arguments
docker build \
  --build-arg VITE_APP_TITLE="${VITE_APP_TITLE}" \
  --build-arg VITE_APP_LOGO="${VITE_APP_LOGO}" \
  --build-arg VITE_ANALYTICS_ENDPOINT="${VITE_ANALYTICS_ENDPOINT}" \
  --build-arg VITE_ANALYTICS_WEBSITE_ID="${VITE_ANALYTICS_WEBSITE_ID}" \
  -t ${IMAGE_NAME}:latest \
  .

echo "✅ Docker image built successfully: ${IMAGE_NAME}:latest"
