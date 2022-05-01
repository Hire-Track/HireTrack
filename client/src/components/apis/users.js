export const loginUser = async (email, pwd) => {
  try {
    const response = await fetch("/api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pwd }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return true;
    }
    return false;
  } catch {
    console.log("ERROR: Log In");
    return false;
  }
};

export const createUser = async (payload) => {
  try {
    const response = await fetch("/api/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
    }
    return response;
  } catch {
    console.log("ERROR: Create User");
    return false;
  }
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const response = await fetch("/api/users/me", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
