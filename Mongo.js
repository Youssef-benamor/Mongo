// Switch to (or create) the "contact" database
use contact;

// Create the collection (optional, will auto-create on insert)
db.createCollection("contactlist");

// Insert the initial contact documents
db.contactlist.insertMany([
  { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
  { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
  { lastName: "Emilie", firstName: "brouge", email: "emilie.b@gmail.com", age: 40 },
  { lastName: "Alex", firstName: "brown", age: 4 },
  { lastName: "Denzel", firstName: "Washington", age: 3 }
]);

// Display all contacts
print("All contacts:");
db.contactlist.find().pretty();

// Display one person by _id (replace with a real _id if running manually)
const oneContact = db.contactlist.findOne();
print("One contact by ID:");
printjson(oneContact);

// Display contacts with age > 18
print("Contacts with age > 18:");
db.contactlist.find({ age: { $gt: 18 } }).pretty();

// Display contacts with age > 18 and name contains "ah"
print("Contacts with age > 18 and name contains 'ah':");
db.contactlist.find({
  age: { $gt: 18 },
  firstName: { $regex: /ah/i }
}).pretty();

// Update "Kefi Seif" to "Kefi Anis"
db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
);
print("Updated Seif to Anis");

// Delete contacts aged under 5
db.contactlist.deleteMany({ age: { $lt: 5 } });
print("Deleted contacts with age < 5");

// Display all contacts after update & delete
print("Final list of contacts:");
db.contactlist.find().pretty();
