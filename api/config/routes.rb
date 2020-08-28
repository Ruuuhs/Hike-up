Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }

  get '/current', to: 'user#current'

  resources :user,  only: %i[index show]
  resources :post,  only: %i[index show create destroy]
end
