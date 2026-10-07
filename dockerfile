# Stage 1: Build the Expo Web app
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG EXPO_PUBLIC_SUPABASE_KEY
ARG EXPO_PUBLIC_SUPABASE_URL
ENV EXPO_PUBLIC_SUPABASE_KEY=$EXPO_PUBLIC_SUPABASE_KEY
ENV EXPO_PUBLIC_SUPABASE_URL=$EXPO_PUBLIC_SUPABASE_URL

RUN npx expo export --platform web

# Stage 2: Serve with Nginx
FROM nginx:alpine

# 1. Remove default Nginx welcome page and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# 2. Copy Expo web build output (dist/ folder) to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# 3. Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
