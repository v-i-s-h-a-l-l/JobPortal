import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Jobs from '../data/jobs.json';

const AddJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    description: '',
    salary: '',
    company: {
      name: '',
      description: '',
      email: '',
      phone: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing jobs from localStorage or use empty array
    const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    // Get the highest ID from both default jobs and saved jobs
    const defaultMaxId = Math.max(...Jobs.map(job => parseInt(job.id)));
    const savedMaxId = existingJobs.length > 0 
      ? Math.max(...existingJobs.map(job => parseInt(job.id)))
      : 0;
    const maxId = Math.max(defaultMaxId, savedMaxId);
    
    // Create new job object with unique ID
    const newJob = {
      id: (maxId + 1).toString(),
      ...formData
    };
    
    // Add new job to array
    const updatedJobs = [...existingJobs, newJob];
    
    // Save to localStorage
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    
    // Redirect to jobs page
    navigate('/jobs');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('company.')) {
      const companyField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        company: {
          ...prev.company,
          [companyField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <h3 className="text-xl font-bold mb-4">Company Info</h3>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Description
              </label>
              <textarea
                name="company.description"
                value={formData.company.description}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="company.email"
                value={formData.company.email}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                name="company.phone"
                value={formData.company.phone}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
