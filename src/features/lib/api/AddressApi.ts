interface AddressRequest {
  label: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

interface updateAddressRrequest {
  label: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

export const addAddress = async (
  token: string,
  contactId: string,
  request: AddressRequest
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${contactId}/addresses`,
    {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  return response;
};

export const listAddress = async (token: string, contactId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${contactId}/addresses`,
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

export const deleteAddress = async (
  token: string,
  contactId: string,
  addressId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${contactId}/addresses/${addressId}`,
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

export const getAddress = async (
  token: string,
  contactId: string,
  addressId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${contactId}/addresses/${addressId}`,
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
export const updateAddress = async (
  token: string,
  contactId: string,
  addressId: string,
  request: updateAddressRrequest
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PATH_API}/contacts/${contactId}/addresses/${addressId}`,
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
