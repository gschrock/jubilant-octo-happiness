ARG SERVER_PORT=8080

ARG APP_ENV=testing

ARG DIR_APP=/var/c3d/frontend

FROM node:20.15.1-alpine3.20 AS server
ARG SERVER_PORT
ARG DIR_APP
ENV PORT=$SERVER_PORT
ENV DIR_APP=$DIR_APP
RUN apk add --update-cache \
      ca-certificates \
      nginx \
      supervisor \
      vim \
    && adduser -D -g 'www' www \
    && mkdir -p  \
      "$DIR_APP"  \
    && chown -R www:www \
      $DIR_APP \
    && chown -R www:www /var/lib/nginx \
    && chown -R www:www /var/log/nginx \
    && mkdir -p /etc/nginx/sites-available \
    && mkdir -p /etc/nginx/sites-enabled

COPY ./container/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./container/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./container/nginx/sites-available/*.conf /etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/api.conf /etc/nginx/sites-enabled/api.conf \
  && ln -s /etc/nginx/sites-available/dev.conf /etc/nginx/sites-enabled/dev.conf \
  && ln -s /etc/nginx/sites-available/admissions.conf /etc/nginx/sites-enabled/admissions.conf \
  && ln -s /etc/nginx/sites-available/devAdmissions.conf /etc/nginx/sites-enabled/devAdmissions.conf

WORKDIR $DIR_APP
EXPOSE $SERVER_PORT

FROM server AS env-local
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ENTRYPOINT ["/var/c3d/frontend/container/entrypoint.sh"]

FROM server AS env-testing
ARG NODE_ENV
ARG DIR_APP
ENV NODE_ENV=$NODE_ENV
COPY . $DIR_APP

RUN cd $DIR_APP \
  && npm ci

CMD ["npm", "test"]

FROM env-${APP_ENV} AS final

