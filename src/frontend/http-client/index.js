let pollingIntervalID;

const startPolling = () => {
  const pollingStartButton = document.getElementById("polling-start-button");
  pollingStartButton.setAttribute("disabled", "");

  const pollingStopButton = document.getElementById("polling-stop-button");
  pollingStopButton.removeAttribute("disabled");

  const intervalMilliSecond = getIntervalMilliSecond();
  pollingIntervalID = setInterval(() => {
    httpRequest("polling", "GET");
  }, intervalMilliSecond);
};

const getIntervalMilliSecond = () => {
  const pollingSpan = document.getElementById("polling-span");
  const [hour, minute, second] = pollingSpan.value.split(":");
  return (Number(hour) * 60 * 60 + Number(minute) * 60 + Number(second)) * 1000;
};

const stopPolling = () => {
  const pollingStartButton = document.getElementById("polling-start-button");
  pollingStartButton.removeAttribute("disabled");

  const pollingStopButton = document.getElementById("polling-stop-button");
  pollingStopButton.setAttribute("disabled", "");

  clearInterval(pollingIntervalID);
};

const executeGetRequest = () => {
  httpRequest("get", "GET");
};

const executePostRequest = () => {
  httpRequest("post", "POST");
};

const httpRequest = async (idPrefix, httpMethod) => {
  const executionTimeElement = document.getElementById(
    `${idPrefix}-execution-time`
  );
  executionTimeElement.textContent = nowString();

  const urlElement = document.getElementById(`${idPrefix}-url`);
  const url = urlElement.value;

  const responseBodyElement = document.getElementById(
    `${idPrefix}-response-body`
  );
  const responseStatusElement = document.getElementById(
    `${idPrefix}-response-status`
  );
  try {
    const requestBodyElement = document.getElementById(
      `${idPrefix}-request-body`
    );
    console.log("el: ", requestBodyElement);
    const response = await fetch(url, {
      method: httpMethod,

      body:
        requestBodyElement !== null
          ? JSON.stringify(JSON.stringify(requestBodyElement.value))
          : undefined,
    });
    responseStatusElement.textContent = response.status;
    responseStatusElement.style["color"] = "#000000";

    const responseBody = await response.json();
    responseBodyElement.textContent = convertToFormattedJson(responseBody);
    responseBodyElement.style["color"] = "#000000";
  } catch (error) {
    responseStatusElement.textContent = "Error";
    responseStatusElement.style["color"] = "#ff3300";
    responseBodyElement.textContent = error;
    responseBodyElement.style["color"] = "#ff3300";
  }
};

const formatPostRequestBody = () => {
  const requestBodyElement = document.getElementById("post-request-body");
  try {
    requestBodyElement.value = convertToFormattedJson(
      JSON.parse(requestBodyElement.value)
    );
  } catch (error) {
    alert(error);
  }
};

const convertToFormattedJson = (targetJson) =>
  JSON.stringify(targetJson, null, 2);

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
