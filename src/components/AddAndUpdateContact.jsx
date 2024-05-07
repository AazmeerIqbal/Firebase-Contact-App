import React from "react";
import Model from "./Model";
import { Form, Formik, Field } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  // Add Contact
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Update Contact
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //   Form Validation
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" className="border h-10 px-2" />
                  {errors.name && touched.name ? (
                    <div className="text-red-500">{errors.name}</div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email</label>
                  <Field name="email" className="border h-10 px-2" />
                  {errors.email && touched.email ? (
                    <div className="text-red-500">{errors.email}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="bg-amber-600 px-3 py-1.5 mt-2 text-white font-medium tracking-wide hover:bg-amber-700 transition self-end rounded-md"
                >
                  {isUpdate ? "Update" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Model>
    </div>
  );
};

export default AddAndUpdateContact;
