export const getUser = () => {
  const params = new URLSearchParams(window.location.search);

  const email =
    params.get("email") || localStorage.getItem("user_email");

  const name =
    params.get("name") || localStorage.getItem("user_name");

  return { email, name };
};