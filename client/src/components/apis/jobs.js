export const getJobs = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/jobs", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch {
      console.log("ERROR: Get Jobs");
    }
  };