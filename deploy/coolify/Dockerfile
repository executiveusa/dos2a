# Netlify parity: base=frontend, npm (no lockfile in frontend/, same as Netlify's npm install).
FROM node:22-alpine AS build
WORKDIR /app
COPY frontend/package.json ./
RUN npm install --no-audit --no-fund
COPY frontend ./
RUN npm run build
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=80
COPY --from=build /app ./
EXPOSE 80
CMD ["npx", "next", "start", "-p", "80"]
