type AddContactRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
type EditContactRequest = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ContactListRequest = {
  name?: string;
  email?: string;
  phone?: string;
  page?: number;
};

export const addContact = async (token: string, request: AddContactRequest) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_API}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  return response;
};

export const contactListAPI = async (
  token: string,
  request: ContactListRequest
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_PATH_API}/contacts`);
  url.searchParams.append("size", "12");
  if (request.name) url.searchParams.append("name", request.name);
  if (request.email) url.searchParams.append("email", request.email);
  if (request.phone) url.searchParams.append("phone", request.phone);
  if (request.page) url.searchParams.append("page", request.page.toString());
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const contactDetailAPI = async (token: string, id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const deleteContact = async (token: string, id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const updateContact = async (
  token: string,
  id: string,
  request: EditContactRequest
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  return response;
};
