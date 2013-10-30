Djsms::Application.routes.draw do
  resources :users
  resources :playlists
  resources :songs
  resources :sessions, only: [:new, :create, :destroy]
  resources :texts, only: [:create, :index, :destroy]
  resources :contributors, only: [:create, :index, :update, :destroy]
  
  root to: 'sessions#new'
  get '/helper.html', to: 'sessions#helper'
  post '/incoming', to: 'texts#create'
  match '/signin', to: 'sessions#new', 			via: 'get'
  match '/signout', to: 'sessions#destroy', via: 'delete'
  get '/twilio', to: 'sessions#twilio'
  get '/playlist/:id/texts', to: 'playlists#texts'
end
