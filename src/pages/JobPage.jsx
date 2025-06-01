import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinners';
import Jobs from '../data/jobs.json';
import { Link } from 'react-router-dom';

// ✅ JobLoader function for data fetching via route loader
export const JobLoader = async ({ params }) => {
  const { id } = params;
  
  // Get jobs from localStorage
  const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
  
  // First check saved jobs (newly added jobs)
  let job = savedJobs.find(job => job.id === id);
  
  // If not found in saved jobs, check default jobs
  if (!job) {
    job = Jobs.find(job => job.id === id);
  }
  
  if (!job) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return job;
};

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = useLoaderData();

  const handleDelete = () => {
    // Get current jobs from localStorage
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    // Filter out the job to be deleted
    const updatedJobs = savedJobs.filter(job => job.id !== id);
    
    // Save updated jobs back to localStorage
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    
    // Redirect to jobs page
    navigate('/jobs');
  };

  if (!job) return <Spinner />;

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-red-600 hover:text-red-700 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <i className="fa-solid fa-location-dot text-lg text-red-600 mr-2"></i>
                  <p className="text-red-600">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-red-600 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">{job.description}</p>

                <h3 className="text-red-600 text-lg font-bold mb-2">
                  Salary
                </h3>
                <p className="mb-4">{job.salary}</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">{job.company.name}</h2>
                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-red-50 p-2 font-bold">
                  {job.company.email}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-red-50 p-2 font-bold">
                  {job.company.phone}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-red-600 hover:bg-red-700 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
