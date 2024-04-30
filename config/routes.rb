Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [ :create, :update] do
      resources :favorites, only: [:index] 
    end
    resource :session, only: [:show, :create, :destroy]
    resources :reviews, only: [:create, :update, :destroy, :index] 
    resources :trails, only: [:show, :index, :create] do
    collection do 
       get 'search', to: 'trails#search'
     end
     resources :favorites, only: [:create, :destroy]
    end
  end
  get '*path', to: "static_pages#frontend_index"
end
