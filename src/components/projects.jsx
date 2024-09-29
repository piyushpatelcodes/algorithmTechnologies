import React, { useEffect, useState } from "react";
import {
  FaMapPin,
  FaClock,
  FaLinkedin,
  FaGithub,
  FaLink,
} from "react-icons/fa";


export default function GitHubProfile() {
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Fetch user data
    fetch("http://localhost:8080/getuserdata", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data); // Set user data
        console.log(data);
        return fetch(data.repos_url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }); // Fetch repos using repos_url from user data
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse repos response to JSON
      })
      .then((reposData) => {
        console.log(reposData);
        setRepositories(reposData); // Set repositories data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(repositories.length / reposPerPage);

  // Get the current repositories to display
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {/* Profile Picture */}
            {userData && (
              <img
                src={userData.avatar_url || "robot.jpeg"}
                alt="Profile"
                className="w-64 h-64 rounded-full mx-auto"
              />
            )}
            <h1 className="text-3xl font-bold mt-4">
              {userData?.name || "Please Login"}
            </h1>
            <p className="text-gray-400">
              {userData?.login || "@withGithub"} 
            </p>
            <div className="text-center mt-5 lg:text-left">
              <button className="flex justify-center items-center gap-2 bg-gray-800 border border-gray-600 text-gray-100 w-full py-2 rounded-lg">
                <FaGithub /> Open Profile
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2">
                <FaMapPin className="w-4 h-4" /> {userData?.location || "Earth"}
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="w-4 h-4" />{" "}
                {new Date().toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </div>
            <div className="mt-4">
              <span className="text-gray-400">
                {userData?.followers} followers · {userData?.following}{" "}
                following
              </span>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
              Your Repositories
            </h2>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-gray-900 border border-gray-800 p-4 rounded"
                  >
                    <h3 className="text-sm font-medium">
                      <a
                        href={repo.html_url}
                        className="text-blue-500 hover:underline"
                      >
                        {repo.name}
                      </a>
                    </h3>
                    <p className="text-xs text-gray-400">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex items-center mt-2 space-x-4 text-xs text-gray-400">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                        {repo.language || "N/A"}
                      </span>
                      {repo.stargazers_count && (
                        <span>★ {repo.stargazers_count}</span>
                      )}
                      {repo.forks_count && <span>⑂ {repo.forks_count}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className={`px-4 py-2 bg-gray-800 text-white rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className={`px-4 py-2 bg-gray-800 text-white rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 flex justify-between  items-center">
                {userData?.contributions} Your Contribution
                @ALGORITHM_Technologies
              </h2>
              {currentRepos.filter((repo) =>
                repo.name.toLowerCase().includes("algorithm")
              ).length > 0 ? (
                <div>
                  {currentRepos
                    .filter((repo) =>
                      repo.name.toLowerCase().includes("algorithm")
                    )
                    .map((repo) => (
                      <div
                        key={repo.id}
                        className="bg-gray-900 border border-gray-800 p-4 rounded"
                      >
                        <h3 className="text-sm font-medium">
                          <a
                            href={repo.html_url}
                            className="text-blue-500 hover:underline"
                          >
                            {repo.name}
                          </a>
                        </h3>
                        <p className="text-xs text-gray-400">
                          {repo.description || "No description provided."}
                        </p>
                        <div className="flex items-center mt-2 space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                            {repo.language || "N/A"}
                          </span>
                          {repo.stargazers_count && (
                            <span>★ {repo.stargazers_count}</span>
                          )}
                          {repo.forks_count && (
                            <span>⑂ {repo.forks_count}</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-emerald-400">
                  No Repositories With "ALGORITHM Technologies" found.{" "}
                  <a
                    className="bg-gray-800 border border-gray-600 text-gray-100 ml-1 rounded-lg p-2"
                    href="/apply"
                  >
                    Apply Now
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
