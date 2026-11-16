import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFolder =path.join(__dirname,'../data');
const filepath = path.join(dataFolder,'expense.json');
export async function readData() {
    await fs.mkdir(dataFolder,{recursive:true});
    try {
        const data = await fs.readFile(filepath,'utf-8');
        return JSON.parse(data);
    }catch (error) {
          if(error.code === 'ENQENT'){
            await WriteData([]);
            return [];
          }
          throw error;
    }
}
export async function writeData(data) {
    await fs.mkdir(dataFolder,{recursive:true});
    await fs.writeFile(
        filepath,
        JSON.stringify(data,null,2),'utf-8'
    );
}