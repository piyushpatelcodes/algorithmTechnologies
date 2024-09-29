import Spline from "@splinetool/react-spline";
import { SiPaloaltonetworks } from "react-icons/si";

export default function Example() {
  return (
    <div>
     <div className="flex-1 relative">
  <Spline scene="https://prod.spline.design/CRSqZHcwFEfxMMSt/scene.splinecode" />

  {/* "ALGORITHM" text in the bottom-right corner */}
  <div className="absolute bottom-4 flex right-4 bg-slate-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-semibold">
    ALGORITHM Technologies<SiPaloaltonetworks           className="w-auto h-5 mr-2 text-indigo-600 mb-4"
  />
  </div>
</div>

      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base font-semibold text-indigo-600">
            Explore Opportunities
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-medium tracking-tight text-gray-950 sm:text-5xl">
            Join our team today!
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2">
            {/* Job Postings */}
            <JobPosting title="AI Developer" />
            <JobPosting title="Java Developer" />
            <JobPosting title="Python Developer" />
            <JobPosting title="MERN Stack Web Developer" />

            <JobPosting title="Machine Learning Engineer" />
            <JobPosting title="Data Science" />
            <JobPosting title="C++ Programming" />
            <JobPosting title="UI/UX Designer" />
          </div>
        </div>
      </div>
    </div>
  );
}

const JobPosting = ({ title }) => {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
      <div className="flex flex-col items-center">
      <SiPaloaltonetworks           className="w-12 h-12 text-indigo-600 mb-4"
/>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">
          Join our innovative team and work on exciting projects in the field of {title.split(" ")[0]}!
        </p>
        <button
  onClick={() => window.location.href = '/apply'}
  className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
  Apply
</button>

      </div>
    </div>
  );
}
