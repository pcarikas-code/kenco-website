#!/bin/bash

# Docker Deployment Script
# This script stops, removes, and recreates the Docker container

set -e  # Exit on error

# Get container and image name from first argument or use default
CONTAINER_NAME="${1:-kenco-website}"
IMAGE_NAME="${CONTAINER_NAME}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    exit 1
fi

echo "Deploying ${CONTAINER_NAME}..."

# Stop existing container if running
if docker ps -q -f name=${CONTAINER_NAME} > /dev/null 2>&1; then
    echo "Stopping existing container..."
    docker stop ${CONTAINER_NAME}
fi

# Remove existing container if exists
if docker ps -aq -f name=${CONTAINER_NAME} > /dev/null 2>&1; then
    echo "Removing existing container..."
    docker rm ${CONTAINER_NAME}
fi

# Run new container
echo "Starting new container..."
docker run -d \
  --name ${CONTAINER_NAME} \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  ${IMAGE_NAME}:latest

echo "✅ Container deployed successfully: ${CONTAINER_NAME}"
echo ""
echo "Check status with: docker ps"
echo "View logs with: docker logs ${CONTAINER_NAME}"
