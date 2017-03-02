class Comment
  include Mongoid::Document
  include Mongoid_Commentable::Comment
  #include Rakismet::Model
  field :text, :type => String
  field :author, :type => String
  #rakismet_attrs :content => :text
  #validate do |comment|
  #  if(comment.spam?)
  #    comment.errors[:base] << I18n.t(:spam_comment)
  #  end
  #end
end
