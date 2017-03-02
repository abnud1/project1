class Publisher
  include Mongoid::Document
  include Mongoid::Slug
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable




  devise :database_authenticatable, :registerable#,:confirmable,:recoverable,:omniauthable, :omniauth_providers => [:gplus]

  #, :rememberable, :trackable

  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  #field :reset_password_token,   type: String
  #field :reset_password_sent_at, type: Time

  ## Rememberable
  #field :remember_created_at, type: Time

  ## Trackable
  #field :sign_in_count,      type: Integer, default: 0
  #field :current_sign_in_at, type: Time
  #field :last_sign_in_at,    type: Time
  #field :current_sign_in_ip, type: String
  #field :last_sign_in_ip,    type: String

  ## Confirmable
  #field :confirmation_token,   type: String
  #field :confirmed_at,         type: Time
  #field :confirmation_sent_at, type: Time
  #field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time


  #field :_id, type: String, default: ->{ username }

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time


  #field :_id, type: String, default: ->{ username }
  has_many :projects, inverse_of: :publisher
  field :username
  slug :username
  field :websiteurl
  field :general_info
  field :phone
  field :address
  field :birthdate,            type:Date
  mount_uploader :avatar,AvatarUploader
  field :description
  field :likes ,type: Array

  index({email: 1},{unique: true})
  index({username: 1},{unique: true})
  #index({likes: 1})

end
