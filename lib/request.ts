import { CharacterType } from "@/types";
import { request } from "./constants";

export async function getPrediction(
  characterType: CharacterType,
  data: (string | null | undefined)[],
  isDevMode: boolean,
): Promise<string> {
  const localhostURL = `${request.localhostURL}:${request.port}`;
  const deploymentURL = `${request.deploymentURL}`;
  const url = isDevMode ? localhostURL : deploymentURL;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      frames: data,
    }),
  };
  try {
    const fullURL = `${url}${characterType === CharacterType.Numbers ? request.endpoints.digit : request.endpoints.alphabet}`;
    const response = await fetch(fullURL, requestOptions);
    const data = await response.json();
    console.log("Data:", data);
    return data.prediction as string;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}
