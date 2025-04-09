# Base stage: Install dependencies and copy source code
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Development stage: Uses the React development server for hot reloading
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
# In development, run "npm start" which uses react-scripts start and supports hot reloading.
CMD ["npm", "start"]

# Production build stage: Build the optimized app
FROM base AS prod
ENV NODE_ENV=production
RUN npm run build

# Production server stage: Serve the built app with Nginx
FROM nginx:stable-alpine AS prod-server
COPY --from=prod /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
