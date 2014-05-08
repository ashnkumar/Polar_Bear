PolarBear::Application.routes.draw do
  root to: "chatrooms#index"
  # resources :rooms, only: [:show, :index]
  resources :chatrooms, only: [:index, :show]

  get '/room_list', to: 'chatrooms#index'
end

