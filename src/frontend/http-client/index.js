const startPolling = async () => {
  const pollingURLElement = document.getElementById("polling-url");
  const pollingURL = pollingURLElement.value;
  console.log("pollingURL: ", pollingURL);
  try {
    const response = await fetch(pollingURL, { method: "GET" });

    const pollingResponseStatusElement = document.getElementById(
      "polling-response-status"
    );
    pollingResponseStatusElement.textContent = response.status;

    const responseBody = await response.json();
    const pollingResponseBodyElement = document.getElementById(
      "polling-response-body"
    );
    pollingResponseBodyElement.textContent = JSON.stringify(
      responseBody,
      null,
      "\t"
    );
  } catch (error) {
    console.log("error: ", error);
  }

  console.log("start polling: ", pollingURLElement.value);
};

const stopPolling = () => {
  console.log("stop polling");
};
