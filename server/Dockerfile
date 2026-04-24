FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY index.js .

# Create a default .env file in case missing
RUN echo "VOICEMEETER_IP=127.0.0.1" > .env
RUN echo "VOICEMEETER_VBAN_PORT=6980" >> .env
RUN echo "PORT=3001" >> .env

# Expose backend port
EXPOSE 3001

CMD ["node", "index.js"]
