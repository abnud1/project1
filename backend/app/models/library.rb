class Library
  include Mongoid::Document
  include Mongoid::Slug
  field :name
  slug :name
  has_and_belongs_to_many :programminglanguages, index: true
  index({name: 1},{unique: true})
end
