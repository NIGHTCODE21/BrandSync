import { useEffect, useState } from "react";
import axios from "axios";

function ClientModal({
  setOpenClientModal,
  client,
  fetchClients,
}) {
  const [clients, setClients] = useState([]);

const [companyName, setCompanyName] = useState("");
const [contactPerson, setContactPerson] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [service, setService] = useState("");
const [status, setStatus] = useState("Active");
const [notes, setNotes] = useState("");



useEffect(() => {
  if (client) {
    setCompanyName(client.companyName || "");
    setContactPerson(client.contactPerson || "");
    setEmail(client.email || "");
    setPhone(client.phone || "");
    setService(client.service || "");
    setStatus(client.status || "Active");
    setNotes(client.notes || "");
  }
}, [client]);

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    const clientData = {
      companyName,
      contactPerson,
      email,
      phone,
      service,
      status,
      notes,
    };

    if (client) {
      // Update Client
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/clients/${client._id}`,
        clientData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Client updated successfully");
    } else {
      // Create Client
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/clients`,
        clientData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Client created successfully");
    }

    fetchClients();
    setOpenClientModal(false);

    // Clear form
    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setPhone("");
    setService("");
    setStatus("Active");
    setNotes("");

  } catch (error) {
    console.error(error);
    alert(client ? "Failed to update client" : "Failed to create client");
  }
};
    
    return (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl">

      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        {client ? "Edit Client" : "Add New Client"}
      </h2>

      <div className="grid grid-cols-2 gap-5">

        {/* Company Name */}
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="col-span-2 w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
        />

        {/* Contact Person */}
        <input
          type="text"
          placeholder="Contact Person"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
        />

        {/* Service */}
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select Service</option>
          <option>Logo Design</option>
          <option>Brand Identity</option>
          <option>Website Development</option>
          <option>Social Media Marketing</option>
          <option>SEO</option>
          <option>Other</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option>Active</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>

        {/* Notes */}
        <textarea
          placeholder="Notes"
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="col-span-2 w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
        />

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setOpenClientModal(false)}
          className="px-6 py-3 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition"
        >
          {client ? "Update Client" : "Create Client"}
        </button>

      </div>

    </div>

  </div>
);
}

export default ClientModal;