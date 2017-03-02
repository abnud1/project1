class Framework
  include Mongoid::Document
  include Mongoid::Slug
  field :name
  slug :name
  belongs_to :programmingLanguage, index: true
  has_many :programmingContexts, as: :projectcontext
  index({name: 1},{unique: true})
  validates :name, presence: true
  validates :name, length: 1..40
  def to_s
    name
  end
end
