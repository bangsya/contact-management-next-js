type CreateUser = {
  username: string;
  name: string;
  password: string;
};
type LoginUser = {
  username: string;
  password: string;
};

type EditUser = {
  username?: string;
  name?: string;
  password?: string;
};

export const createUser = async (data: CreateUser) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const loginUser = async (data: LoginUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};

export const getUser = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/users/current`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return response;
};
export const logoutUser = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/users/logout`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return response;
};

export const editUser = async (token: string, data: EditUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/users/current`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};
