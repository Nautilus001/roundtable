# Rountable

A modern, cross-platform mobile and web application built using **Expo (React Native)** and **TypeScript**, with a cloud backend powered by **Supabase**. The production web deployment is containerized with **Docker**, reverse-proxied via **Nginx**, and securely exposed from a self-hosted **Raspberry Pi** home server using a **Cloudflare Tunnel**.

Live demo: [`taste.nautilius.online`](http://taste.nautilius.online)

---

## Features & Tech Stack

- **Frontend:** React Native (0.81), Expo (v54), Expo Router (v6) for file-based routing.
- **Backend-as-a-Service:** Supabase (`@supabase/supabase-js`) for Authentication, Database, and Realtime sync.
- **Deployment Structure:** Docker Multi-stage setups leveraging Nginx for efficient static web hosting and Cloudflare Tunnel for secure, VPN-less edge access.

---

## Prerequisites

Before getting started, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or yarn
- [Expo Go](https://expo.dev/go) app on your mobile device (for local mobile testing)
- [Docker & Docker Compose](https://www.docker.com/) (for production web deployment)

---

## CI/CD

The application features a fully automated build and deployment pipeline designed for edge hosting:
- **Continuous Integration (GitHub Actions):** On every push, a GitHub Actions workflow utilizes Docker Buildx to cross-compile a production-ready linux/arm64 image and automatically pushes it to Docker Hub. Additionally, implemented caching to address re-build on non-critical changes (readme, workflow files, etc).
- **Continuous Deployment (Watchtower):** The self-hosted Raspberry Pi 4 runs a Watchtower container that periodically polls Docker Hub for the updates. It automatically pulls the latest image, recreates the application container, and serves the statically compiled web assets without manual intervention.
---
## Run Locally

0. Create supabase project (out of the scope of this repo) and note the URL token and Publishable Key tokens.

1. Clone the repository
   `git clone https://github.com/Nautilus001/roundtable.git [DIR NAME]`
   
2. Create .env in project root, and add Supabase tokens.
   ```
   roundtable/.env
   
   EXPO_PUBLIC_SUPABASE_URL=[YOUR URL TOKEN]
   EXPO_PUBLIC_SUPABASE_KEY=[YOUR PUB KEY TOKEN]
   ```

3. Install packages - this step is vital to ensure dependency issues do not arise.
   `npm install`

4. Start up the app
   `npx expo start`

**As a note:** If you are developing on your own, it is always better to try `npx expo install [package-name]` because expo will pick a compatible package. Running `npm install [package-name]` will usually just grab the latest, regardless of dependency mismatches. And that sucks to figure out.

   
