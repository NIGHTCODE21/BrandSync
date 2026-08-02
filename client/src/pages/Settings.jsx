import { useEffect, useState } from "react";
import axios from "axios";

function Settings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/settings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.user);

    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/settings",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");

      const res = await axios.put(
  "http://localhost:5000/api/settings",
  profile,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setProfile(res.data.user);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold text-slate-800">
        Settings
      </h1>

      <p className="text-slate-500 mt-2 mb-8">
        Manage your account settings.
      </p>

      <div className="bg-white rounded-3xl shadow-md p-8 max-w-2xl">

        <div className="space-y-6">

          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

          </div>

          <button
            onClick={handleUpdate}
            className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;