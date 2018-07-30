Rails.application.routes.draw do
  root 'application#home'
  get '/stores/most_coupons', to: 'stores#most_coupons'
  
  resources :coupons

  resources :stores
  resources :stores do
    resources :coupons, only: [:show, :index, :new, :edit]
  end

  resources :users
  
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  
  post '/coupons/:id/save_to_profile', to: 'coupons#save_to_profile', as: 'save_coupon'
  post '/coupons/:id/delete_from_profile', to: 'coupons#delete_from_profile', as: 'delete_coupon'
  get '/auth/facebook/callback' => 'sessions#create_from_facebook'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
