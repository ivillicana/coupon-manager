Rails.application.routes.draw do
  root 'application#home'
  resources :coupons
  resources :stores
  resources :users
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/auth/facebook/callback' => 'sessions#create_from_facebook'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
