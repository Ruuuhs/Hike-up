FROM ruby:2.6.6

RUN apt-get update -qq \
  && apt-get install -y --no-install-recommends \
  nodejs \
  nginx \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir /api
WORKDIR /api

COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock
RUN gem install bundler:2.1.4\
  && bundle install
COPY . /api

RUN rm -f /api/tmp/pids/server.pid

CMD ["rails", "server", "-b", "0.0.0.0"]
# COPY startup.sh /startup.sh
# RUN chmod 744 /startup.sh
# CMD ["/startup.sh"]
