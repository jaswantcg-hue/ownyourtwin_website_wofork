# Azure Web App Deployment Guide - Simple Setup

Deploy AuraAI directly to Azure Web App with Node.js runtime (no Docker required).

## Prerequisites

1. **Azure Account** - Active Azure subscription
2. **Azure CLI** - [Install Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)
3. **GitHub Repository** - Code pushed to GitHub

## Step 1: Create Azure Web App

```bash
# Login to Azure
az login

# Create resource group
az group create --name auraai-rg --location eastus

# Create App Service Plan (Linux + Node.js)
az appservice plan create \
  --name auraai-plan \
  --resource-group auraai-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group auraai-rg \
  --plan auraai-plan \
  --name auraai-app \
  --runtime "NODE:20-lts"
```

## Step 2: Download Publish Profile

```bash
# Download publish profile XML
az webapp deployment list-publishing-profiles \
  --resource-group auraai-rg \
  --name auraai-app \
  --xml > PublishProfile.xml
```

Or download from [Azure Portal](https://portal.azure.com):
1. Go to **App Services** → **auraai-app**
2. Click **Download publish profile** (top right)

## Step 3: Add GitHub Secrets

In your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

| Secret Name | Value |
|---|---|
| `AZURE_WEBAPP_NAME` | `auraai-app` |
| `AZURE_PUBLISH_PROFILE` | Content of PublishProfile.xml (entire XML) |

## Step 4: Configure Web App

```bash
# Set Node.js startup command
az webapp config set \
  --resource-group auraai-rg \
  --name auraai-app \
  --startup-file "node build"

# Set environment variables
az webapp config appsettings set \
  --resource-group auraai-rg \
  --name auraai-app \
  --settings NODE_ENV=production \
              PORT=8080
```

## Step 5: Deploy

Push code to main branch:

```bash
git push origin main
```

GitHub Actions will:
1. Install dependencies
2. Build SvelteKit app
3. Create deployment package
4. Deploy to Azure Web App

## Access Your App

Once deployed: `https://auraai-app.azurewebsites.net`

## View Logs

```bash
# Stream live logs
az webapp log tail --resource-group auraai-rg --name auraai-app

# View deployment logs
az webapp deployment log show --resource-group auraai-rg --name auraai-app
```

## Environment Variables

Add custom variables:

```bash
az webapp config appsettings set \
  --resource-group auraai-rg \
  --name auraai-app \
  --settings VITE_API_URL="https://api.example.com" \
              CUSTOM_VAR="value"
```

## Scaling

Upgrade to better performance:

```bash
# Scale up (higher resources)
az appservice plan update \
  --name auraai-plan \
  --resource-group auraai-rg \
  --sku S1

# Scale out (multiple instances)
az appservice plan update \
  --name auraai-plan \
  --resource-group auraai-rg \
  --number-of-workers 2
```

Available SKUs: `FREE`, `SHARED`, `B1`, `B2`, `B3`, `S1`, `S2`, `S3`, `P1V2`, `P2V2`

## Troubleshooting

### Build Fails
- Check Node.js 20+ is available
- Verify `npm run build` works locally
- Review GitHub Actions logs

### Deployment Fails
- Verify publish profile is correct and not expired
- Check Web App name matches
- Ensure App Service plan exists

### App Won't Start
- Check logs: `az webapp log tail`
- Verify `build` folder exists
- Check `node build` command works locally
- Verify PORT=8080 in app settings

### Application Errors
```bash
# Check runtime version
az webapp config show --resource-group auraai-rg --name auraai-app

# Check app logs in real-time
az webapp log tail --resource-group auraai-rg --name auraai-app --follow
```

## Cleanup

```bash
# Delete all resources
az group delete --name auraai-rg --yes --no-wait
```

## Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [SvelteKit Deployment](https://kit.svelte.dev/docs/adapter-auto)
- [Node.js on App Service](https://docs.microsoft.com/azure/app-service/configure-language-nodejs)
