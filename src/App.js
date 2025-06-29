import React, { useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import "./App.css";
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';

function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState([]);

    // Handler to add a new contact
    const addContactHandler = (contact) => {
        console.log(contact);
        setContacts([...contacts, { id: uuid(), ...contact }]);
    };

    // Handler to remove a contact by id
    const removeContactHandler = (id) => {
        const newContactList = contacts.filter((contact) => contact.id !== id);
        setContacts(newContactList);
    };

    // Effect to retrieve contacts from local storage on component mount
    useEffect(() => {
        const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (retrieveContacts) setContacts(retrieveContacts);
    }, []);

    // Effect to update local storage whenever contacts change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    return (
        <div className="ui container">
            <Header />
            <AddContact addContactHandler={addContactHandler} />
            <ContactList contacts={contacts} getContactId={removeContactHandler} />
        </div>
    );
}

export default App;
