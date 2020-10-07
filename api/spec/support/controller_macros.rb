require 'pp'

def log_in
  user = FactoryBot.create(:user)
  post '/auth/sign_in/',
       params: { email: user[:email], password: 'foobar' },
       as: :json

  response.headers.slice('client', 'access-token', 'uid')
end

def sign_in_id
  user = FactoryBot.create(:user)
  post '/auth/sign_in/',
       params: { email: user[:email], password: 'foobar' },
       as: :json

  json = JSON.parse(response.body)
  headers = response.headers.slice('client', 'access-token', 'uid')

  [headers, json['data']['id']]
end
