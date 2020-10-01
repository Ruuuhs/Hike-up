Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }

  get '/current', to: 'user#current'

  get '/personal/:id', to: 'user#personal'
  get '/feed', to: 'post#feed'
  get '/bookmark', to: 'post#bookmark'
  get '/trend/:period', to: 'post#trend', as: 'trend'

  resources :users do
    member do
      get :following, :followers
    end
  end

  resources :user,  only: %i[index show]
  resources :post,  only: %i[index show create destroy]
  resources :like,  only: %i[create destroy]
  resources :bookmark, only: %i[create destroy]
  resources :comment, only: %i[show create]
  resources :relationship, only: %i[create destroy]
  resources :room, only: %i[create show index]
  resources :message, only: %i[create]
end

