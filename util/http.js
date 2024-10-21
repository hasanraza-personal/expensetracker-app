import axios from "axios";

const BACKEND_URL =
  "https://react-native-tutorial-8fa5d-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  try {
    const response = await axios.post(
      BACKEND_URL + "/expenses.json",
      expenseData
    );
    console.log("response: ", response.data);
    const id = response.data.name;
    return id;
  } catch (error) {
    console.log("error: ", error.response.data);
  }
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
  for (const key in response.data) {
    console.log("key: ", key);
    console.log("response.data: ", response.data);
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export async function updateExpense(id, expenseData) {
  console.log("id: ", id);
  try {
    return await axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
  } catch (error) {
    console.log("error: ", error.response.data);
  }
}

export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
