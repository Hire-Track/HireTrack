export const createSkill = async ({ skillName, skillLevel }) => {
  let token = localStorage.getItem("token");
  try {
    const response = await fetch("/api/skills", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ skillName: skillName, skillLevel: skillLevel }),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return false;
  } catch {
    console.log("ERROR: Get Skills");
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
    return await response.json();
  } catch {
    console.log("ERROR: Get Skills");
  }
};

export const updateSkill = async ({ id, skillName, skillLevel }) => {
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(`/api/skills/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ skillName: skillName, skillLevel: skillLevel }),
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch {
    console.log("ERROR: Update Skill");
  }
};

export const deleteSkill = async (id) => {
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(`/api/skills/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch {
    console.log("ERROR: Delete Skill");
  }
};