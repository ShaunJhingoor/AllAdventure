Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resources :trails, only: [:show, :index, :create] 
    resources :reviews, only: [:create, :update, :destroy, :index]
    resource :session, only: [:show, :create, :destroy]
    get 'trails/search', to: 'trails#search'
  end
  get '*path', to: "static_pages#frontend_index"
end
