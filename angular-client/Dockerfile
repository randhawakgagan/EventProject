# base image
FROM node:10.16.3 as node

# set working directory
WORKDIR /app

# install and cache app dependencies
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
#RUN npm install -g @angular/cli
COPY . .
# add app

RUN npm run build -- --prod

FROM nginx:alpine
#VOLUME /var/cache/nginx
COPY --from=node /app/dist/angular-client user/share/nginx/html 
COPY ./config/nginx.conf /etc/nginx/nginx.conf
#COPY . /app

# start app
#CMD ng serve --proxy-config proxy.conf.json --host 0.0.0.0
#COPY . .
#RUN npm start
#RUN npm run build --prod

#FROM nginx:alpine
#COPY --from=node /app/dist/ng-docker-example /usr/share/ngnix/html