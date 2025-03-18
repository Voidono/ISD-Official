import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Hourglass, Calendar, Search } from "lucide-react";

const projects = [
    { id: 1, name: "Cầu vượt ABC", location: "Hà Nội", status: "Đang thi công", startDate: "2024-01-10", image: "https://static-images.vnncdn.net/files/publish/2023/10/2/w-duong-dua-f1-12-1-89.jpg" },
    { id: 2, name: "Nhà máy XYZ", location: "TP HCM", status: "Hoàn thành", startDate: "2023-05-20", image: "https://static-images.vnncdn.net/files/publish/2023/10/2/w-duong-dua-f1-12-1-89.jpg" },
];

const Project = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [startDateFilter, setStartDateFilter] = useState("");
    const navigate = useNavigate();

    const filteredProjects = projects.filter((project) => {
        return (
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (locationFilter === "" || project.location === locationFilter) &&
            (statusFilter === "" || project.status === statusFilter) &&
            (startDateFilter === "" || project.startDate >= startDateFilter)
        );
    });

    return (
        <div className="py-16 px-6 max-w-7xl mx-auto mt-16">
            <h1 className="text-3xl font-bold text-center mb-6">Danh sách Dự án</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Tìm kiếm dự án..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="border rounded-lg py-2 px-3" value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}>
                    <option value="">Tất cả địa điểm</option>
                    {[...new Set(projects.map((p) => p.location))].map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <ul className="space-y-4">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <li key={project.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition"
                            onClick={() => navigate(`/du-an/${project.id}`)}>
                            <img src={project.image} alt={project.name} className="w-24 h-24 rounded-lg object-cover"/>
                            <div>
                                <div className="text-lg font-semibold">{project.name}</div>
                                <div className="text-gray-600 flex items-center gap-1"><MapPin size={16} /> {project.location}</div>
                                <div className="text-gray-600 flex items-center gap-1"><Hourglass size={16} /> {project.status}</div>
                                <div className="text-gray-600 flex items-center gap-1"><Calendar size={16} /> {project.startDate}</div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không tìm thấy dự án nào!</p>
                )}
            </ul>
        </div>
    );
}

export default Project;
