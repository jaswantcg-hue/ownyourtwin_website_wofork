# Azure Web App Deployment - Quick Start (No Docker)

Simple 4-step deployment of AuraAI to Azure Web App.

## 1️⃣ Create Web App

```bash
az login
az group create --name auraai-rg --location eastus
az appservice plan create --name auraai-plan --resource-group auraai-rg --sku B1 --is-linux
az webapp create --resource-group auraai-rg --plan auraai-plan --name auraai-app --runtime "NODE:20-lts"
```

## 2️⃣ Download Publish Profile

```bash
az webapp deployment list-publishing-profiles --resource-group auraai-rg --name auraai-app --xml > PublishProfile.xml
```

Copy the content of `PublishProfile.xml`

## 3️⃣ Add GitHub Secrets

Go to **GitHub** → **Settings** → **Secrets and variables** → **Actions**, add:

- `AZURE_WEBAPP_NAME` = `auraai-app`
- `AZURE_PUBLISH_PROFILE` = (paste entire XML from PublishProfile.xml)

## 4️⃣ Deploy

```bash
git push origin main
```

GitHub Actions automatically builds and deploys!

## Access App

🌐 https://auraai-app.azurewebsites.net

## View Logs

```bash
az webapp log tail --resource-group auraai-rg --name auraai-app
```

## Scale Up

```bash
az appservice plan update --name auraai-plan --resource-group auraai-rg --sku S1
```

## Cleanup

```bash
az group delete --name auraai-rg --yes --no-wait
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed documentation.

