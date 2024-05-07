import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// icons
import { FiSearch, FiPlusCircle } from "react-icons/fi";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContentCard from "./components/ContentCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFound from "./components/NotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { onClose, onOpen, isOpen } = useDisclouse();

  // Fetch Contacts
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  // Search Contacts
  const filterContacts = (e) => {
    try {
      const value = e.target.value;
      const contactsRef = collection(db, "contacts");

      onSnapshot(contactsRef, (snapshot) => {
        const contactList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const filteredContacts = contactList.filter((contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase())
        );

        setContacts(filteredContacts);

        return filteredContacts;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-[470px] mx-auto px-4 relative">
        <Navbar></Navbar>
        <div className="flex items-center my-4">
          <div className="flex flex-grow relative items-center">
            <FiSearch className="text-white text-3xl absolute ml-1" />
            <input
              type="text"
              className="bg-transparent flex-grow text-white pl-10 border-2 border-white rounded-md h-10"
              onChange={filterContacts}
            ></input>
          </div>
          <div>
            <FiPlusCircle
              className="text-white text-4xl ml-2 cursor-pointer hover:text-amber-600 transition"
              onClick={onOpen}
            />
          </div>
        </div>
        <div>
          {contacts.length <= 0 ? (
            <NotFound />
          ) : (
            contacts.map((contact) => (
              <ContentCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact
        isOpen={isOpen}
        onClose={onClose}
      ></AddAndUpdateContact>
      <ToastContainer position="bottom-center"></ToastContainer>
    </>
  );
};

export default App;
