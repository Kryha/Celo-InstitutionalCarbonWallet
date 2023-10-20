import fs from "fs";

const filePath = "./deploy-safe/util/config.json";

export async function writeToJson(jsonData: any): Promise<void> {
  const jsonString = JSON.stringify(jsonData, null, 2);
  await fs.promises.writeFile(filePath, jsonString);
  console.log("JSON data has been written to", filePath);
}

export async function readFromJson(): Promise<any> {
  const data = await fs.promises.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

export async function getSafeAddress(): Promise<any> {
  const data = await fs.promises.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData.safeAddress;
}

// Function to update JSON data in a file
export async function updateJson(newData: any): Promise<void> {
  const currentData = await readFromJson();
  const updatedData = { ...currentData, ...newData };
  await writeToJson(updatedData);
  console.log("JSON data has been updated in", filePath);
}

export function generateSaltNonce() {
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}
