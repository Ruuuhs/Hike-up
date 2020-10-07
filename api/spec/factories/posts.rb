FactoryBot.define do
  factory :post do
    content { 'MyText' }
    image { nil }
    user
  end
end
