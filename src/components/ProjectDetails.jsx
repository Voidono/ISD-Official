import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Hourglass, MapPin } from "lucide-react";

const projects = [
    { id: 1, name: "Cầu vượt ABC", location: "Hà Nội", status: "Đang thi công", startDate: "2024-01-10", image: "https://static-images.vnncdn.net/files/publish/2023/10/2/w-duong-dua-f1-12-1-89.jpg" },
    { id: 2, name: "Nhà máy XYZ", location: "TP HCM", status: "Hoàn thành", startDate: "2023-05-20", image: "https://static-images.vnncdn.net/files/publish/2023/10/2/w-duong-dua-f1-12-1-89.jpg" }
];

const ProjectDetail =() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) return <h2 className="text-center text-red-500 text-2xl font-semibold">Dự án không tồn tại!</h2>;

    return (
        <div className="py-16 px-6 max-w-7xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
            <button 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition mb-4" 
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.name}</h1>
            <img src={project.image} alt={project.name} className="w-full h-64 object-cover rounded-lg" />
            <div className="mt-4 text-lg text-gray-700">
                <p className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <strong>Vị trí:</strong> <span>{project.location}</span>
                </p>
                <p className="flex items-center space-x-2">
                    <Hourglass size={16} />
                    <strong>Trạng thái:</strong> <span>{project.status}</span>
                </p>
                <p className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <strong>Ngày khởi công:</strong> <span>{project.startDate}</span>
                </p>
            </div>
        </div>
    );
}

export default ProjectDetail;
