
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { Search, MapPin, Hourglass, Calendar } from 'lucide-react';

const Project = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] {
          _id,
          name,
          slug,
          location,
          status,
          startDate,
          image
        }`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === '' || project.location === locationFilter) &&
      (statusFilter === '' || project.status === statusFilter) &&
      (startDateFilter === '' || project.startDate >= startDateFilter)
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
        <select
          className="border rounded-lg py-2 px-3"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">Tất cả địa điểm</option>
          {[...new Set(projects.map((p) => p.location))].map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredProjects.length > 0 ? (
    filteredProjects.map((project) => (
      <li
        key={project._id}
        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition"
        onClick={() => navigate(`/du-an/${project.slug.current}`)}
      >
        {project.image && (
          <img
            src={urlFor(project.image).url()}
            alt={project.name}
            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {/* Overlay đen khi hover */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-lg font-bold mb-2">{project.name}</h2>
          <p className="flex items-center gap-2 text-sm mb-1">
            <MapPin size={16} /> {project.location}
          </p>
          <p className="flex items-center gap-2 text-sm mb-1">
            <Hourglass size={16} /> {project.status}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Calendar size={16} /> {project.startDate}
          </p>
        </div>
      </li>
    ))
  ) : (
    <p className="text-center text-gray-500 col-span-full">Không tìm thấy dự án nào!</p>
  )}
</ul>

    </div>
  );
};

export default Project;
