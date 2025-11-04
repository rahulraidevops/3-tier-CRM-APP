FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

# lightweight healthcheck script baked in
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 CMD ["/bin/sh", "-c", "curl -f http://localhost:5000/api/health || exit 1"]

CMD ["node", "server.js"]
