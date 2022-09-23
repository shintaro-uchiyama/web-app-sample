let pollingIntervalID;

const startPolling = () => {
  const pollingStartButton = document.getElementById("polling-start-button");
  pollingStartButton.setAttribute("disabled", "");

  const pollingStopButton = document.getElementById("polling-stop-button");
  pollingStopButton.removeAttribute("disabled");

  const intervalMilliSecond = getIntervalMilliSecond();
  pollingIntervalID = setInterval(() => {
    httpRequest();
  }, intervalMilliSecond);
};

const getIntervalMilliSecond = () => {
  const pollingSpan = document.getElementById("polling-span");
  const [hour, minute, second] = pollingSpan.value.split(":");
  return (Number(hour) * 60 * 60 + Number(minute) * 60 + Number(second)) * 1000;
};

const httpRequest = async () => {
  const pollingExecutionTimeElement = document.getElementById(
    "polling-execution-time"
  );
  pollingExecutionTimeElement.textContent = nowString();

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
      4
    );
  } catch (error) {
    console.log("error: ", error);
  }

  console.log("start polling: ", pollingURLElement.value);
};

const stopPolling = () => {
  const pollingStartButton = document.getElementById("polling-start-button");
  pollingStartButton.removeAttribute("disabled");

  const pollingStopButton = document.getElementById("polling-stop-button");
  pollingStopButton.setAttribute("disabled", "");

  clearInterval(pollingIntervalID);
};

const nowString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};
