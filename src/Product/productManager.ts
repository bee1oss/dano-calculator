import { Product } from '../data/defaultProducts';
import { saveToFile } from './fileOperations';
import { Alert } from 'react-native';

export const handleAddProduct = async (newProduct: Partial<Product>, setProducts: React.Dispatch<React.SetStateAction<Product[]>>, products: Product[]) => {
  if (!newProduct.name || newProduct.price === undefined || newProduct.vatRate === undefined) {
    Alert.alert('Lütfen tüm alanları doldurun.');
    return;
  }

  const newItem: Product = {
    id: Date.now().toString(),
    name: newProduct.name,
    price: newProduct.price,
    vatRate: newProduct.vatRate,
  };

  const updated = [...products, newItem];
  setProducts(updated);
  await saveToFile(updated);
};

export const handleDelete = async (id: string, products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  Alert.alert('Silmek istediğinize emin misiniz?', '', [
    { text: 'İptal', style: 'cancel' },
    {
      text: 'Sil',
      style: 'destructive',
      onPress: async () => {
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
        await saveToFile(updated);
      },
    },
  ]);
};

export const handleEdit = (item: Product, setEditingId: React.Dispatch<React.SetStateAction<string | null>>, setEditData: React.Dispatch<React.SetStateAction<Partial<Product>>>) => {
  setEditingId(item.id);
  setEditData({ ...item });
};

export const handleSave = async (editingId: string | null, editData: Partial<Product>, products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  if (!editData.name || editData.price === undefined || editData.vatRate === undefined) {
    Alert.alert('Tüm alanları doldurun.');
    return;
  }

  const updated = products.map(p =>
    p.id === editingId ? { ...p, ...editData } as Product : p
  );
  setProducts(updated);
  await saveToFile(updated);
};
