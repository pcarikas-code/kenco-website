# Rename Deployment Scripts on Production Server

To standardize deployment scripts across all your websites, rename the Docker-specific scripts to generic names.

## Commands to Run on Production Server

SSH into your Plesk server and run these commands:

```bash
ssh root@kenco.nz
cd /opt/kenco-website

# Rename build-docker.sh to build.sh
mv build-docker.sh build.sh

# Rename deploy-docker.sh to deploy.sh  
mv deploy-docker.sh deploy.sh

# Verify the scripts exist
ls -la *.sh
```

## Expected Output

After renaming, you should see:
```
-rwxr-xr-x 1 root root  XXX date build.sh
-rwxr-xr-x 1 root root  XXX date deploy.sh
```

## Standard Deployment Process

After renaming, your deployment process will be consistent across all websites:

```bash
cd /opt/kenco-website
git pull origin main
./build.sh
./deploy.sh
```

## Benefits

1. **Consistency** - Same script names across all your websites (kenco.nz, nca.co.za, etc.)
2. **Simplicity** - No need to remember Docker-specific names
3. **Clarity** - Clear separation: build first, then deploy
4. **Flexibility** - Can run build without deploying (for testing)

---

**Note:** The scripts themselves don't need to be modified, just renamed. They will continue to work exactly as before.
