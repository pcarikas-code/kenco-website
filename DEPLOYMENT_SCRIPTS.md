# Docker Deployment Scripts

Two helper scripts to simplify Docker builds and deployments.

---

## build-docker.sh

Builds the Docker image with Vite environment variables from `.env` file.

### Usage

```bash
# Build with default name (kenco-website)
./build-docker.sh

# Build with custom name
./build-docker.sh my-website
```

### What it does

1. Reads `.env` file
2. Extracts `VITE_*` environment variables
3. Passes them as build arguments to Docker
4. Builds the image with tag `{name}:latest`

### Example

```bash
cd /opt/kenco-website
./build-docker.sh kenco-website
```

---

## deploy-docker.sh

Stops, removes, and recreates the Docker container.

### Usage

```bash
# Deploy with default name (kenco-website)
./deploy-docker.sh

# Deploy with custom name
./deploy-docker.sh my-website
```

### What it does

1. Stops existing container (if running)
2. Removes existing container (if exists)
3. Creates new container from image
4. Uses `.env` file for runtime environment variables
5. Exposes port 3000
6. Sets restart policy to `unless-stopped`

### Example

```bash
cd /opt/kenco-website
./deploy-docker.sh kenco-website
```

---

## Complete Deployment Workflow

### Initial Deployment

```bash
# 1. Clone repository
cd /opt
sudo git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. Create .env file
sudo nano .env
# Add all required environment variables

# 3. Build Docker image
sudo ./build-docker.sh your-app-name

# 4. Deploy container
sudo ./deploy-docker.sh your-app-name

# 5. Run database migrations
sudo docker exec -it your-app-name npm run db:push

# 6. Check status
sudo docker ps
sudo docker logs your-app-name
```

### Updating Deployment

```bash
# 1. Pull latest code
cd /opt/your-repo
sudo git pull origin main

# 2. Rebuild image
sudo ./build-docker.sh your-app-name

# 3. Redeploy container
sudo ./deploy-docker.sh your-app-name

# 4. Run new migrations (if schema changed)
sudo docker exec -it your-app-name npm run db:push
```

---

## Environment Variables

### Build-time Variables (VITE_*)

These are embedded into the built JavaScript during `docker build`:

- `VITE_APP_TITLE` - Website title (shown in browser tab)
- `VITE_APP_LOGO` - Logo path (e.g., `/logo.svg`)
- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint URL
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID

**Important:** Changes to these require rebuilding the Docker image.

### Runtime Variables

These are loaded when the container starts:

- `DATABASE_URL` - PostgreSQL connection string
- `AWS_ACCESS_KEY_ID` - AWS credentials
- `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `AWS_REGION` - AWS region
- `SES_FROM_EMAIL` - Email sender address
- `SES_TO_EMAIL` - Email recipient address
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (production)
- `PORT` - Server port (3000)

**Important:** Changes to these only require restarting the container.

---

## Troubleshooting

### Build fails with "VITE_APP_TITLE not set"

Make sure your `.env` file contains:
```
VITE_APP_TITLE=Your Website Title
VITE_APP_LOGO=/logo.svg
```

### Container fails to start

Check logs:
```bash
sudo docker logs your-app-name
```

Common issues:
- Missing DATABASE_URL
- Database connection refused
- Port 3000 already in use

### Page title still shows %VITE_APP_TITLE%

This means the build didn't pick up the environment variables. Make sure:
1. `.env` file exists in the build directory
2. You used `./build-docker.sh` (not plain `docker build`)
3. The `.env` file contains `VITE_APP_TITLE=...`

---

## Manual Build (Without Script)

If you prefer not to use the script:

```bash
docker build \
  --build-arg VITE_APP_TITLE="Kenco Ltd - Infection Control Solutions" \
  --build-arg VITE_APP_LOGO="/logo.svg" \
  --build-arg VITE_ANALYTICS_ENDPOINT="" \
  --build-arg VITE_ANALYTICS_WEBSITE_ID="" \
  -t kenco-website:latest \
  .
```

---

## Manual Deploy (Without Script)

If you prefer not to use the script:

```bash
# Stop and remove existing container
sudo docker stop kenco-website
sudo docker rm kenco-website

# Run new container
sudo docker run -d \
  --name kenco-website \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file /opt/kenco-website/.env \
  kenco-website:latest
```
