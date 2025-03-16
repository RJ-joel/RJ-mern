import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { Link, useParams } from "react-router-dom";

function EditParcel() {
    const [trackingId, setTrackingId] = useState("");
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [status, setStatus] = useState("");
    const { id } = useParams(); // Get Parcel ID from URL

    useEffect(() => {
        findParcel();
    }, [id]);

    const findParcel = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/findParcel/${id}`);
            setTrackingId(response.data.trackingId);
            setSender(response.data.sender);
            setReceiver(response.data.receiver);
            setStatus(response.data.status);
        } catch (error) {
            console.log("Error fetching parcel:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:9000/editParcel/${id}`, {
                trackingId,
                sender,
                receiver,
                status
            });
            toast.success(response.data.message);
        } catch (error) {
            console.log("Error updating parcel:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 pb-12">
            <h3 className="text-blue-600 text-center text-2xl mb-4 font-bold">Edit Parcel Details</h3>
            <Link to={'/'} className="mb-4 text-xl text-blue-600 cursor-pointer text-right py-3">View Parcels</Link>
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <div className="mb-4">
                    <label className="text-lg px-3">Tracking ID</label>
                    <input type="text" placeholder="Enter Tracking ID" value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full" required />
                </div>
                <div className="mb-4">
                    <label className="text-lg px-3">Sender Name</label>
                    <input type="text" placeholder="Sender Name" value={sender} onChange={(e) => setSender(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full" required />
                </div>
                <div className="mb-4">
                    <label className="text-lg px-3">Receiver Name</label>
                    <input type="text" placeholder="Receiver Name" value={receiver} onChange={(e) => setReceiver(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full" required />
                </div>
                <div className="mb-4">
                    <label className="text-lg px-3">Delivery Status</label>
                    <input type="text" placeholder="Status (e.g., In Transit, Delivered)" value={status} onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-lg w-full" required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 w-[50%] px-3 py-2 rounded-2xl text-white">Update Parcel</button>
                </div>
            </form>

            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} closeOnClick={true} transition={Bounce} theme="dark" />
        </div>
    );
}

export default EditParcel;
