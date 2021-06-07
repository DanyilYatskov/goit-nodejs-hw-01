const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

const checkIfContactExists = (contacts, newContact) => {
  const contactFound = contacts.find(
    (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
  );
  if (contactFound !== undefined) {
    return true;
  }
  return false;
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(data.toString());
  } catch (error) {
    console.log(error);
  }
  // fs.readFile(contactsPath, (e, data) => {
  //   console.log(data.toString());
  //   if (e) {
  //     console.error(e.message);
  //   }
  //   console.log(data.toString());
  //   return console.log(data.toString());
  // });
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const normalizedData = JSON.parse(data);
    const result = normalizedData.find(
      (contact) => contact.id.toString() === contactId.toString()
    );
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
        (contact) => contact.id.toString() !== contactId.toString()
      );
      if (arrayEquals(normalizedData, result) === false) {
        fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
        console.log(`Contact by id:${contactId} removed succesfully`);
      } else console.log(`Cannot delete contact by id:${contactId}`);
    })
    .catch((error) => console.log(error));
}

function addContact(name, email, phone) {
  const newcontact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath)
    .then((data) => {
      const normalizedData = JSON.parse(data);
      if (checkIfContactExists(normalizedData, newcontact) === false) {
        const result = [...normalizedData, newcontact];
        fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
        console.log(`Contact by name:${name} added succesfully`);
      } else console.log(`Contact by name:${name} already exists`);
    })
    .catch((error) => console.log(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
