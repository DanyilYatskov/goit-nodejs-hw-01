const fs = require("fs").promises;
const path = require("path");
//const cp = require("./db/contacts.json");
const contactsPath = path.join("db", "contacts.json");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.log(data.toString());
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const normalizedData = JSON.parse(data);
    const result = normalizedData.find((contact) => contact.id === contactId);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const normalizedData = JSON.parse(data);
      const result = normalizedData.filter(
        (contact) => contact.id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(result));
    })
    .catch((error) => console.log(error));
}

function addContact(name, email, phone) {
  const newcontact = {
    id: getRandomInt(10010),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath)
    .then((data) => {
      const normalizedData = JSON.parse(data);
      const result = [...normalizedData, newcontact];
      fs.writeFile(contactsPath, JSON.stringify(result));
    })
    .catch((error) => console.log(error));
}

removeContact(470);
//addContact("hello", "bye@gmail.com", "102");
