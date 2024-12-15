import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [voteCounts, setVoteCounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await axios.get("http://localhost:7777/api/vote/vote-counts");
        setVoteCounts(response.data);
      } catch (error) {
        console.error("Error fetching vote counts:", error);
      }
    };

    fetchVoteCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const getColor = (index) => {
    switch (index) {
      case 0:
        return "bg-green-100 text-green-600 font-bold";
      case 1:
        return "bg-yellow-100 text-yellow-600 font-semibold";
      case 2:
        return "bg-blue-100 text-blue-600 font-medium";
      default:
        return "bg-red-100 text-red-600";
    }
  };

  const getSymbol = (index) => (index === 0 ? "+" : "-");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Vote Counts</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Rank</th>
              <th className="border border-gray-300 p-2">Party</th>
              <th className="border border-gray-300 p-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {voteCounts.map((vote, index) => (
              <tr key={vote._id} className={`${getColor(index)} text-center`}>
                <td className="border border-gray-300 p-2">
                  {index + 1} {getSymbol(index)}
                </td>
                <td className="border border-gray-300 p-2">{vote._id}</td>
                <td className="border border-gray-300 p-2">{vote.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
