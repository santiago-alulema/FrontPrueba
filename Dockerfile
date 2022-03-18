FROM node:16.5

ARG NEXT_PUBLIC_REST_API_ENDPOINT='http://45.177.127.116:7707/api'
#'https://api.radimercado.com/agw'

# create app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install --global pm2

# install deps
COPY package*.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app/

# Building app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
