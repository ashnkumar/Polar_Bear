PolarBear::Application.routes.draw do
  root to: "homepages#index"
  resources :homepages, only: [:index]
  resources :rooms, only: [:show, :index]
  resources :chatrooms, only: [:show]

  get '/room_list', to: 'rooms#room_list'
  # get 'landing_page', to: 'rooms#landing'
end

