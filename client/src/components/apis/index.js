export const loginUser = async (email, pwd) => {
  try {
    const response = await fetch("/api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify({ email: email, password: pwd }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      return true;
    }
    return false;
  } catch {
    console.log("ERROR: Log In");
    return false;
  }
};

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
