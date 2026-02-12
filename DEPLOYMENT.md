# Azure Deployment Guide for AuraAI

This guide provides step-by-step instructions to set up and configure GitHub Actions for automated deployment to Azure.

## Prerequisites

1. **Azure Account** - Active Azure subscription
2. **GitHub Repository** - Your code pushed to GitHub
3. **Docker** - For local testing (optional)
4. **Azure CLI** - For local setup (optional)

## Step 1: Set Up Azure Resources

### Create Azure Container Registry

```bash
# Login to Azure
az login

# Create resource group
az group create --name auraai-rg --location eastus

# Create container registry
az acr create --resource-group auraai-rg --name auraaicr --sku Basic
```

### Create Azure Container Instances

```bash
# You can create a container instance manually in Azure Portal or use Azure CLI
# We'll deploy via GitHub Actions, but you may want to prepare the resource group
```

## Step 2: Get Azure Credentials

### Option A: Using Service Principal (Recommended for CI/CD)

```bash
# Create a service principal with contributor access to the resource group
az ad sp create-for-rbac \
  --name auraai-github-sp \
  --role Contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/auraai-rg
```

This will output:
```json
{
  "appId": "...",
  "displayName": "auraai-github-sp",
  "password": "...",
  "tenant": "..."
}
```

### Option B: Using Registry Credentials

```bash
# Get container registry credentials
az acr credential show --name auraaicr --resource-group auraai-rg
```

This will output:
```json
{
  "passwords": [
    {
      "name": "password",
      "value": "..."
    }
  ],
  "username": "..."
}
```

## Step 3: Add GitHub Secrets

In your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

| Secret Name | Value |
|---|---|
| `AZURE_REGISTRY_LOGIN_SERVER` | e.g., `auraaicr.azurecr.io` |
| `AZURE_REGISTRY_USERNAME` | From `az acr credential show` output |
| `AZURE_REGISTRY_PASSWORD` | From `az acr credential show` output |
| `AZURE_RESOURCE_GROUP` | `auraai-rg` |
| `AZURE_CONTAINER_NAME` | e.g., `auraai-container` |
| `AZURE_SUBSCRIPTION_ID` | Your Azure subscription ID |

## Step 4: Update Dockerfile (if needed)

The current Dockerfile runs the dev server. For production, you may want to use this instead:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "-m", "http-server", "build", "-p", "3000"]
```

## Step 5: GitHub Actions Workflow

The workflow file (`.github/workflows/deploy.yml`) has been created with the following stages:

### Build Stage
- Checks out code
- Sets up Node.js
- Installs dependencies
- Runs type checks
- Builds the SvelteKit application
- Uploads build artifacts

### Deploy Stage (Main/Master only)
- Downloads build artifacts
- Logs into Azure Container Registry
- Builds Docker image
- Pushes image to registry
- Deploys to Azure Container Instances

## Step 6: Manual Deployment (Optional)

If you want to deploy manually:

```bash
# Build Docker image
docker build -t auraaicr.azurecr.io/auraai:latest .

# Login to Azure Registry
az acr login --name auraaicr

# Push image
docker push auraaicr.azurecr.io/auraai:latest

# Deploy to Container Instances
az container create \
  --resource-group auraai-rg \
  --name auraai-container \
  --image auraaicr.azurecr.io/auraai:latest \
  --registry-login-server auraaicr.azurecr.io \
  --registry-username <username> \
  --registry-password <password> \
  --dns-name-label auraai-container \
  --ports 3000 \
  --cpu 1 \
  --memory 1
```

## Step 7: Monitor Deployments

### View GitHub Actions
- Go to your repository → **Actions** tab
- View workflow runs and logs

### Check Azure Container
```bash
az container show \
  --resource-group auraai-rg \
  --name auraai-container \
  --query "{State:instanceView.state, FQDN:ipAddress.fqdn, PublicIP:ipAddress.ip}"
```

## Environment Variables

Update the workflow as needed for environment-specific variables:

```yaml
environment-variables:
  NODE_ENV=production
  VITE_API_URL=${{ secrets.API_URL }}
```

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review the `npm run check` output

### Push to Registry Fails
- Verify credentials are correct in GitHub Secrets
- Check registry exists and is accessible
- Ensure Container Registry SKU supports the image size

### Container Fails to Start
- Check container logs: `az container logs --resource-group auraai-rg --name auraai-container`
- Verify port 3000 is exposed in the Docker image
- Check memory and CPU limits

## Security Recommendations

1. Rotate credentials regularly
2. Use managed identities instead of passwords when possible
3. Limit container registry access to specific IP ranges
4. Enable container image scanning for vulnerabilities
5. Use private endpoints for Azure Container Registry

## Next Steps

1. Push this repository to GitHub if not already done
2. Configure the GitHub Secrets above
3. Push to main/master branch to trigger the workflow
4. Monitor the GitHub Actions workflow
5. Access your deployed application at the Container Instance FQDN

## Additional Resources

- [Azure Container Registry Documentation](https://docs.microsoft.com/en-us/azure/container-registry/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SvelteKit Deployment Guide](https://kit.svelte.dev/docs/adapter-auto)
- [Azure Container Instances Documentation](https://docs.microsoft.com/en-us/azure/container-instances/)
