class Project

  include Mongoid::Document
  include Mongoid::Commentable
  include Mongoid::Slug
  belongs_to :publisher, index: true
  delegate :username, to: :publisher, prefix: true
  embeds_many :steps
  accepts_nested_attributes_for :comments
  accepts_nested_attributes_for :steps
  has_many :programmingContexts
  field :title
  slug :title
  field :prerequisites,type: Array
  field :description
  def projectcontexts
    programmingcontexts.map(&:projectcontext)
  end
  searchkick language: "arabic", highlight: [:title, :description]
  validates :title, presence: true
  validates :description, presence: true
  validates_associated :steps
  validates :publisher, presence: true
  validates :title,length: 10..150
  index({title: 1})
end
