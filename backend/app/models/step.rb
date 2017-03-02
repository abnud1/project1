class Step
  include Mongoid::Document
  include Mongoid::Slug
  embedded_in :project
  has_many :libraries
  field :name
  slug name
  field :solution_policy
  field :constraints,type: Array
  field :hints, type: Array

  has_many :solutions
  validates :solution_policy, presence: true
  validates :name,presence: true
  validates :name, length: 10..100
end
