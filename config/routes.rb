PolarBear::Application.routes.draw do
  root to: "rooms#index"
  resources :rooms, only: [:show, :index]
  resources :chatrooms, only: [:show]

  get '/room_list', to: 'rooms#room_list'
  get 'landing_page', to: 'rooms#landing'
  get '/map', to: 'rooms#map'
  get '/test', to: 'rooms#test'
end
