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
