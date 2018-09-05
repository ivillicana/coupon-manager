# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend-> Coupons#show, /coupons/:id/show
- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend. -> Coupons#Index, /coupons
- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM. -> Stores has_many coupons, rendered via json at Stores#Index and Stores#Show
- [x] Use your Rails API and a form to create a resource and render the response without a page refresh. -> New coupons are created without a page refresh
- [x] Translate JSON responses into js model objects. -> Coupons and Stores are turned into class objects
- [x] At least one of the js model objects must have at least one method added by your code to the prototype. -> Both Stores and Coupos have methods that format the object with a Handlebars Template.

Confirm
- [x] You have a large number of small Git commits
- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message
