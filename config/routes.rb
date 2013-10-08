Djsms::Application.routes.draw do
  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  root to: 'sessions#new'
  get '/helper.html', to: 'sessions#helper'
  match '/signin', to: 'sessions#new', 			via: 'get'
  match '/signout', to: 'sessions#destroy', via: 'delete'
end
