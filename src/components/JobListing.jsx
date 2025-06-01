import { useEffect, useState } from 'react';
import Jobs from '../data/jobs.json';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinners'; // Ensure this is default exported

const JobListing = ({ isHome = false }) => {
  const [loading, setLoading] = useState(true);
  const [showFullDescriptionIds, setShowFullDescriptionIds] = useState([]);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Get jobs from localStorage
      const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      
      // Combine default jobs with saved jobs
      const allJobs = [...Jobs, ...savedJobs];
      
      // If on home page, only show first 3 jobs
      const selected = isHome ? allJobs.slice(0, 3) : allJobs;
      
      setJobList(selected);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isHome]);

  const toggleDescription = (jobId) => {
    setShowFullDescriptionIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Browse Jobs
        </h2>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobList.map((job) => {
              const showFull = showFullDescriptionIds.includes(job.id);
              const shortDescription =
                job.description.length > 100 && !showFull
                  ? job.description.substring(0, 100) + '...'
                  : job.description;

              return (
                <div key={job.id} className="bg-white rounded-xl shadow-md relative">
                  <div className="p-4">
                    {/* Job Type & Title */}
                    <div className="mb-6">
                      <div className="text-gray-600 my-2">{job.type}</div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                    </div>

                    {/* Description */}
                    <div className="mb-5 text-sm text-gray-700">
                      {shortDescription}
                      {job.description.length > 100 && (
                        <button
                          className="text-red-600 ml-2 text-xs"
                          onClick={() => toggleDescription(job.id)}
                        >
                          {showFull ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </div>

                    {/* Salary */}
                    <h3 className="text-red-600 mb-2">{job.salary}</h3>

                    {/* Divider */}
                    <div className="border border-gray-100 mb-5"></div>

                    {/* Location & Read More */}
                    <div className="flex flex-col lg:flex-row justify-between mb-4">
                      <div className="text-red-600 mb-3">
                        <FaMapMarker className="inline text-lg mb-1" />
                        {job.location}
                      </div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="h-[36px] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center text-sm"
                      >
                        Read More
                      </Link>
                    </div>

                    {/* Company Info */}
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">{job.company.name}</p>
                      <p>{job.company.email}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListing;
