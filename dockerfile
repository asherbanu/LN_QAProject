FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p reports screenshots logs
ENV TEST_ENV=qa
CMD ["npm", "run", "test:qa"]
