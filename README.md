# Rountable

A modern, cross-platform mobile and web application built using **Expo (React Native)** and **TypeScript**, with a cloud backend powered by **Supabase**. The production web deployment is containerized with **Docker**, reverse-proxied via **Nginx**, and securely exposed from a self-hosted** Raspberry Pi** home server using a **Cloudflare Tunnel**.

Live demo: [`taste.nautilius.online`](http://taste.nautilius.online)

---

## Features & Tech Stack

- **Frontend:** React Native (0.81), Expo (v54), Expo Router (v6) for file-based routing.
- **Backend-as-a-Service:** Supabase (`@supabase/supabase-js`) for Authentication, Database, and Realtime sync.
- **State/Storage:** Async Storage for persistent local states.
- **Dev Language:** TypeScript configured with strict type-safety and path aliases (`@/*`).
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
