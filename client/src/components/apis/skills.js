export const getSkills = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/skills", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.json());
    } catch {
      console.log("ERROR: Get Skills");
    }
  };
  