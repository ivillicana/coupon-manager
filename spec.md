# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) - Store has many Coupons
- [X] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User) - Coupon belongs to a Store
- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients) - User has many Stores through Coupons/Store has many Users through Coupons
- [x] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity) - Coupons has four user submittable attributes
- [ ] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item)
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes) - Store.most_coupons URL: /stores/most_coupons
- [x] Include signup (how e.g. Devise)
- [x] Include login (how e.g. Devise)
- [x] Include logout (how e.g. Devise)
- [x] Include third party signup/login (how e.g. Devise/OmniAuth) - Omniauth Facebook
- [x] Include nested resource show or index (URL e.g. users/2/recipes) - URL /stores/1/coupons
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients) URL /stores/1/coupons/new
- [x] Include form display of validation errors (form URL e.g. /recipes/new) /coupons/new has form validation with error display

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate
- [x] Views use partials if appropriate