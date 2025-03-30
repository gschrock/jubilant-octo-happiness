FROM node:18-alpine AS base
RUN mkdir -p /var/c3d/backend
WORKDIR /var/c3d/backend


FROM base AS builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM base AS development
EXPOSE 3000
ENTRYPOINT ["/var/c3d/backend/container/entrypoint.sh"]


FROM base AS final
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /var/c3d/backend/dist ./dist
EXPOSE 3000
CMD ["npm", "start"] 