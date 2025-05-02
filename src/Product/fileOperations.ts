import * as FileSystem from 'expo-file-system';
import { Product } from '../data/defaultProducts';

const fileUri = FileSystem.documentDirectory + 'Product.json';

export const readFromFile = async (setProducts: React.Dispatch<React.SetStateAction<Product[]>>, defaultProducts: Product[]) => {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(defaultProducts, null, 2));
    setProducts(defaultProducts);
    return;
  }

  try {
    const content = await FileSystem.readAsStringAsync(fileUri);
    const parsed: Product[] = JSON.parse(content);
    setProducts(parsed);
  } catch (error) {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(defaultProducts, null, 2));
    setProducts(defaultProducts);
  }
};

export const saveToFile = async (data: Product[]) => {
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2));
};
