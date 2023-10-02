import fs from 'fs';

const filePath = './deploy-safe/util/config.json';

export async function writeToJson(jsonData: any): Promise<void> {
  const jsonString = JSON.stringify(jsonData, null, 2);
  await fs.promises.writeFile(filePath, jsonString);
  console.log('JSON data has been written to', filePath);
}

export async function readFromJson(): Promise<any> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  console.log("data", data);
  const parsedData = JSON.parse(data);
  return parsedData.safeAddress;
}

// Function to update JSON data in a file
export async function updateJson(newData: any): Promise<void> {
  const currentData = await readFromJson();
  const updatedData = { ...currentData, ...newData };
  await writeToJson(updatedData);
  console.log('JSON data has been updated in', filePath);
}

// Example usage in three lines
const newData = { age: 31 };

async function main() {
    await writeToJson(newData);
    const data = await readFromJson();
    await updateJson({ updatedField: 'new value' });
}

main();

console.log('JSON data has been successfully updated.');
