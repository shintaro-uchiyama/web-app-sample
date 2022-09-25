let accounts = [];

fetch("./accounts.json")
  .then((response) => response.json())
  .then((json) => {
    const accountElement = document.getElementById("account-input");
    if (json.accounts.length >= 1) {
      const firstAccount = json.accounts[0];
      accountElement.value = firstAccount.name;
      if (!firstAccount.needPassword) {
        const passwordElement = document.getElementById("password-input");
        passwordElement.style["display"] = "none";
      }
    }
    json.accounts.forEach((account) => {
      const option = new Option(account.name, account.name);
      accountElement.add(option);
    });
    accounts = json.accounts;
  });

const judgeShowPassword = (event) => {
  const foundAccount = accounts.find(
    (account) => account.name === event.target.value
  );
  if (foundAccount === undefined) return;

  const passwordElement = document.getElementById("password-input");
  if (!foundAccount.needPassword) {
    passwordElement.style["display"] = "none";
    return;
  }
  passwordElement.style["display"] = null;
};

const login = async () => {
  try {
    const urlElement = document.getElementById("url-input");
    const accountElement = document.getElementById("account-input");
    const passwordElement = document.getElementById("password-input");
    const requestBody = {
      account: accountElement.value,
      password: passwordElement.value,
    };
    const response = await fetch(urlElement.value, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      showFailedMessage();
      return;
    }
    showSucceededMessage();
  } catch (error) {
    showFailedMessage();
    console.log("Failed to login", error);
  }
};

const showSucceededMessage = () => {
  const resultMessageElement = document.getElementById("result-message");
  resultMessageElement.textContent = "Login Succeeded";
  resultMessageElement.style["display"] = "flex";
  resultMessageElement.style["background-color"] = "rgb(0, 255, 255, 0.4)";
};

const showFailedMessage = () => {
  const resultMessageElement = document.getElementById("result-message");
  resultMessageElement.textContent = "Login Failed";
  resultMessageElement.style["display"] = "flex";
  resultMessageElement.style["background-color"] = "rgb(255, 0, 0, 0.4)";
};
