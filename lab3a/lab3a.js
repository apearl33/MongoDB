// 1. Create a new database named "blogger":
use blogger

// 2. Create 3 users with _id = "5bb26043708926e438db6cad", "5bb26043708926e438db6cae", "5bb26043708926e438db6caf".
// The users collection should contain the fields name and email.
// For the field _id, use ObjectId instead of String.
// Ex: " _id" : ObjectId("5bb26043708926e438db6cad")

function insertUser(
id,
name,
email) {
db.users.insert({
_id: ObjectId(id),
name: name,
email: email
});
}

insertUser("5bb26043708926e438db6cad", "Eunsik", "eunsik2@uis.edu")
insertUser("5bb26043708926e438db6cae", "Tulio", "tllos1@uis.edu")
insertUser("5bb26043708926e438db6caf", "Sunshin", "slee675@uis.edu")

// a. List the contents of the users collection in pretty form.

db.users.find().pretty()

// b. Search for user 5bb26043708926e438db6cad.

db.users.find({"_id": ObjectId("5bb26043708926e438db6cad")})

// 3. Create 3 blogs with fields: title, body, slug, author, comments (array with objects containing user_id, comment, approved, created_at), and category (array with objects containing name).

function createBlog(
title,
body,
slug,
author,
comments,
category) {
db.blogs.insert({
title: title,
body: body,
slug: slug,
author: ObjectId(author),
comments: comments,
category: category
});
}

// a. The user_id and author fields should be one of the 3 users_id found above.

createBlog(
"Gas Price Never Stops Going Up.",
"Gas price is going up rapidly.",
"Gas-Price-Never-Stops-Going-Up.",
"5bb26043708926e438db6cad", [{
user_id: ObjectId("5bb26043708926e438db6cae"),
comment: "I am sick and tired of this. It should be stopped.",
approved: true,
created_at: ISODate("2022-06-23"),
}, {

user_id:ObjectId("5bb26043708926e438db6caf"),
comment: "When is it going to be over?",
approved: true,
created_at: ISODate("2022-06-23"),
}, ], [

{name: "Oil"},
{name: "Natural Resources"}])

createBlog(
"Inflation rate is very too high in these days.",
"Prices went all up.",
"Inflation-rate-is-very-too-high-in-these-days.",
"5bb26043708926e438db6cad", [{
user_id: ObjectId("5bb26043708926e438db6cae"),
comment: "Everything went up except my salary.",
approved: true,
created_at: ISODate("2022-06-23"),
}, {

user_id: ObjectId("5bb26043708926e438db6caf"),
comment: "Can we even live like this in the future?",
approved: true,
created_at: ISODate("2022-06-23"),
}, ], [

{name: "Living"},
{name: "Business"}
])

// b. One of the posts should contain the world "framework" in the body.

createBlog(
"MongoDB with Web Frameworks",
"MongoDB has three common Python web frameworks: Pylons, Pyramid and Django.",
"MongoDB-with-Web-Frameworks",
"5bb26043708926e438db6caf", [{
user_id: ObjectId("5bb26043708926e438db6cad"),
comment: "This blog has a great explanation with MongoDB.",
approved: true,
created_at: ISODate("2022-06-23"),
}, {

user_id: ObjectId("5bb26043708926e438db6cae"),
comment: "I have a better understanding MongoDB with framework.",
approved: true,
created_at: ISODate("2022-06-23"),
}, ], [

{name: "Data Analytics"},
{name: "Computer Science"}
])

// c. Get all comments by User 5bb26043708926e438db6caf across all posts displaying only the title and slug.

db.blogs.find(
{'comments': { $elemMatch: {'user_id': ObjectId('5bb26043708926e438db6caf')}}},
{_id: 0, title: 1, slug: 1, "comments.comment.$": 1}).pretty()

// 4. Select a blog via a case-insensitive regular expression containing the word Framework in the body displaying only the title and body.

db.blogs.find({body: /framework/i}, {_id: 0, title: 1, body: 1}).pretty()