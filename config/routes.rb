Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [ :show, :create, :update] do
      resources :favorites, only: [:index] 
      get 'trail_photos_user', to: 'trail_photos#index_for_user'
      get 'user_reviews', to: 'trails#user_reviews'
    end
    
    resource :session, only: [:show, :create, :destroy]
    resources :reviews, only: [:create, :update, :destroy, :index] 
    resources :trails, only: [:show, :index, :create] do
    collection do 
       get 'search', to: 'trails#search'
       get 'fetch_range', to: 'trails#fetch_range' 
      end
     resources :favorites, only: [:create, :destroy]
     resources :trail_photos, only: [:create, :index]
    end
    resources :trail_photos, only: [:destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
