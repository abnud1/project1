class ProgrammingLanguage
  include Mongoid::Document
  include Mongoid::Slug
  field :name
  slug :name
  has_many :frameworks
  has_many :programmingContexts, as: :projectcontext
  has_and_belongs_to_many :libraries, index: true
  index({name: 1},{unique: true})
  validates :name, presence: true
  validates :name, length: 1..20
  def to_s
    name
  end
end
