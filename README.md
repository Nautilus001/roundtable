# Rountable

A modern, cross-platform mobile and web application built using **Expo (React Native)** and **TypeScript**, with a cloud backend powered by **Supabase**. The production web deployment is containerized with **Docker**, reverse-proxied using **Nginx**, and securely routed through a **Cloudflare Tunnel**.

---

## Features & Tech Stack

- **Frontend:** React Native (0.81), Expo (v54), Expo Router (v6) for file-based routing.
- **UI Components:** React Native Elements (`@rneui/themed`), Vector Icons.
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

## Local Development

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd rountable
