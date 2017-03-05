Rails.application.routes.draw do

  devise_for :students, controllers: {sessions: 'students/sessions',registrations: 'students'}
  root to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'home/contact_us', as: 'contact'
  devise_for :publishers, controllers: {sessions: 'publishers/sessions',registrations: 'publishers'}

  get 'home/about', as: 'about'
  as :publisher do
    resources :publishers, except: [:index]
  end
  resources :projects do
    resources :steps
  end
  as :student do
    resources :students, except: [:index]
  end

end
