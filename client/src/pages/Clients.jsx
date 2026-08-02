import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import ClientModal from "../components/ClientModal";
import { useOutletContext } from "react-router-dom";

function Clients() {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/clients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClients(res.data.clients);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this client?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/clients/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Client deleted successfully");

    fetchClients();

  } catch (error) {
    console.error(error);
    alert("Failed to delete client");
  }
};

  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    "On Hold": "bg-yellow-100 text-yellow-700",
  };
  const [selectedClient, setSelectedClient] = useState(null);
const { openClientModal, setOpenClientModal } = useOutletContext();

  return (
    <div>

      <h1 className="text-3xl font-bold text-slate-800">
        Clients
      </h1>

      <p className="text-slate-500 mt-2 mb-8">
        Manage all clients.
      </p>

      

      <div className="bg-white rounded-3xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="p-5">Company</th>
              <th className="p-5">Contact</th>
              <th className="p-5">Email</th>
              <th className="p-5">Phone</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {clients.map((client) => (

              <tr
                key={client._id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="p-5 font-semibold">
                  {client.companyName}
                </td>

                <td className="p-5">
                  {client.contactPerson}
                </td>

                <td className="p-5">
                  {client.email}
                </td>

                <td className="p-5">
                  {client.phone}
                </td>

                <td className="p-5">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusStyles[client.status]
                    }`}
                  >
                    {client.status}
                  </span>

                </td>

                <td className="p-5">

                  <div className="flex items-center gap-4">

                   <button
  onClick={() => {
    setSelectedClient(client);
    setOpenClientModal(true);
  }}
  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
>
  <Pencil size={16} />
  Edit
</button>

<button
  onClick={() => handleDelete(client._id)}
  className="flex items-center gap-1 text-red-600 hover:text-red-800"
>                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
{openClientModal && (
  <ClientModal
    client={selectedClient}
    setOpenClientModal={setOpenClientModal}
    fetchClients={fetchClients}
  />
)}
    </div>
  );
}

export default Clients;