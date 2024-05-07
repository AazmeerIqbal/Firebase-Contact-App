import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { FaEdit, FaRegUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { db } from "../config/firebase";
import useDisclouse from "../hooks/useDisclouse";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { toast } from "react-toastify";

const ContentCard = ({ contact }) => {
  const { onClose, onOpen, isOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.key}
        className="flex flex-grow justify-between items-center gap-2 bg-[#FFEAAE] rounded-md my-2 h-[64px]"
      >
        <div className="flex items-center">
          <FaRegUserCircle className="text-sky-950 text-4xl mx-2" />
          <div className="text-black">
            <h2 className="font-medium uppercase">{contact.name}</h2>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <FaEdit
            className="text-black text-3xl cursor-pointer hover:text-blue-600 transition"
            onClick={onOpen}
          />
          <MdDelete
            className="text-black text-3xl mr-2 cursor-pointer hover:text-red-600 transition"
            onClick={() => {
              deleteContact(contact.id);
            }}
          />
        </div>
      </div>
      <AddAndUpdateContact
        isUpdate
        contact={contact}
        isOpen={isOpen}
        onClose={onClose}
      ></AddAndUpdateContact>
    </>
  );
};

export default ContentCard;
