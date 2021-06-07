const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументировать каждую функцию
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
      fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
      console.log(`Contact by id:${contactId} removed succesfully`);
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
      const result = [...normalizedData, newcontact];
      fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
      console.log(`Contact by name:${name} added succesfully`);
    })
    .catch((error) => console.log(error));
}
