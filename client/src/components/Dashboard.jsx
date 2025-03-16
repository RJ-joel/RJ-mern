import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
    const [parcels, setParcels] = useState([]);

    useEffect(() => {
        fetchParcels();
    }, []);

    const fetchParcels = async () => {
        try {
            const response = await axios.get("http://localhost:9000/viewParcels");
            console.log("Parcels Data:", response.data);
            setParcels(response.data);
        } catch (error) {
            console.log("Error fetching parcels:", error);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = confirm("Are you sure you want to delete this parcel?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:9000/deleteParcel/${id}`);
                toast.success(response.data.message);
                fetchParcels();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-center font-bold text-2xl text-blue-500">Parcel Tracking Dashboard</h1>
            
            <table className="border border-gray-500 w-[80%] mx-auto mt-8 mb-5">
                <caption className="text-right mb-4">
                    <Link to={"/addParcel"} className="text-blue-400 underline cursor-pointer text-xl">
                        Add New Parcel
                    </Link>
                </caption>
                <thead>
                    <tr className="bg-violet-600 text-white border border-gray-400">
                        <th className="py-2 px-4 border border-gray-400">#</th>
                        <th className="py-2 px-4 border border-gray-400">Tracking ID</th>
                        <th className="py-2 px-4 border border-gray-400">Sender</th>
                        <th className="py-2 px-4 border border-gray-400">Receiver</th>
                        <th className="py-2 px-4 border border-gray-400">Status</th>
                        <th colSpan={2} className="py-2 px-4 border border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr className="border border-gray-400" key={index}>
                            <td className="py-2 px-3 border border-gray-400">{index + 1}</td>
                            <td className="py-2 px-3 border border-gray-400">{parcel.trackingId}</td>
                            <td className="py-2 px-3 border border-gray-400">{parcel.sender}</td>
                            <td className="py-2 px-3 border border-gray-400">{parcel.receiver}</td>
                            <td className="py-2 px-3 border border-gray-400">{parcel.status}</td>
                            <td className="py-2 px-3 border border-gray-400">
                                <Link to={`/editParcel/${parcel._id}`} className="text-blue-800 underline cursor-pointer">
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button className="text-red-600 underline cursor-pointer px-2 font-semibold" 
                                    onClick={() => handleDelete(parcel._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
