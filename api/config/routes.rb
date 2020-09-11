Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }

  get '/current', to: 'user#current'

  get '/personal/:id', to: 'post#parsonal'
  get '/bookmark', to: 'post#bookmark'


  resources :user,  only: %i[index show]
  resources :post,  only: %i[index show create destroy]
  resources :like,  only: %i[create destroy]
  resources :bookmark, only: %i[create destroy]
end
