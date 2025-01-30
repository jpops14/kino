# Stage 1: Install dependencies and build the application
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18 AS runner
# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:migrate:seed:prod"]