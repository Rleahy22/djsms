Djsms::Application.routes.draw do
  resources :users
  root to: 'users#login'
  match '/signin', to: 'users#login'
end
