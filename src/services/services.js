const headers = {
    "Content-Type": "application/json",
  };
  
  export const loginUser = (data) =>
    fetch("https://localhost:44338/api/login/auth", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }).then((response) => response.json());
  
  export const bookTime = (data) =>
    fetch("https://localhost:44338/api/bookings", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }).then((response) => response.json());
  
  export const showTimeEntries = (userId, filterDate) =>
    fetch(
      `https://localhost:44338/api/bookings/datebookings/${filterDate}/${userId}`
    ).then((response) => response.json());
  
  export const showTimeEntriesCurrent = (userId, filterDate) =>
    fetch(
      `https://localhost:44338/api/bookings/datebookings/${filterDate}/${userId}`
    ).then((response) => response.json());
  
  export const removeInput = (timeId) =>
    fetch(`https://localhost:44338/api/bookings/${timeId}`, {
      method: "delete",
      headers: { contentType: "application/json; charset=utf-8" },
    }).then((response) => response.json());
  
  // $("#deleteCheck").prop("checked", false);
  
  export const correctTime = (data) =>
    fetch("https://localhost:44338/api/bookings", {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
  
  export const showAllTime = (month, userId) =>
    fetch(
      `https://localhost:44338/api/bookings/dateBookingsPerMonth/${month}/${userId}`,
      {
        method: "GET",
        headers,
      }
    ).then((response) => response.json());
  
  export const getTimeEvaluate = (userId, filterDate) =>
    fetch(
      `https://localhost:44338/api/bookings/get/${userId}/${filterDate}`
    ).then((response) => response.json());
  
  export const showTotalTime = (userId, time) =>
    fetch(`https://localhost:44338/api/bookings/getSum/${userId}/${time}`).then(
      (response) => response.json()
    );
  
  export const getOneDayEntry = (filterDate, userId) =>
    fetch(
      `https://localhost:44338/api/bookings/dateBookings/${filterDate}/${userId}`
    ).then((response) => response.json());
  
  export const showUsers = () =>
    fetch("https://localhost:44338/api/admin").then((response) =>
      response.json()
    );
  
  export const addUsers = (data) =>
    fetch("https://localhost:44338/api/admin", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
  
  export const changeUsers = (data) =>
    fetch(`https://localhost:44338/api/admin/${data.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
  
  export const searchUsers = () =>
    fetch("https://localhost:44338/api/admin").then((response) =>
      response.json()
    );
  