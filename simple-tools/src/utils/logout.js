export const logout = async () => {
    await API.post("/logout");
    localStorage.removeItem("accessToken");
  };
  