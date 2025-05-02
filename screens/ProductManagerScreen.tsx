import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
  vatRate: number;
};

const initialProducts: Product[] = [
  { id: '1', name: 'Somun Ekmek', price: 5, vatRate: 0.08 },
  { id: '2', name: 'Kepekli Ekmek', price: 6, vatRate: 0.08 },
  { id: '3', name: 'Tam Buğday Ekmek', price: 7, vatRate: 0.08 },
];



const ProductManagerScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});


  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: undefined,
    vatRate: undefined,
  });

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price === undefined || newProduct.vatRate === undefined) {
      Alert.alert('Lütfen tüm alanları doldurun.');
      return;
    }
  
    const newItem: Product = {
      id: Date.now().toString(), // basit bir ID
      name: newProduct.name,
      price: newProduct.price,
      vatRate: newProduct.vatRate,
    };
  
    setProducts(prev => [...prev, newItem]);
    setNewProduct({ name: '', price: undefined, vatRate: undefined }); // sıfırla
  };
  

  const handleDelete = (id: string) => {
    Alert.alert('Silmek istediğinize emin misiniz?', '', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => setProducts(products.filter(p => p.id !== id)),
      },
    ]);
  };

  const handleEdit = (item: Product) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = () => {
    if (!editData.name || editData.price === undefined || editData.vatRate === undefined) {
      Alert.alert('Tüm alanları doldurun.');
      return;
    }

    setProducts(prev =>
      prev.map(p => (p.id === editingId ? { ...(p as Product), ...editData } : p))
    );
    setEditingId(null);
    setEditData({});
  };

  const renderItem = ({ item }: { item: Product }) => {
    const isEditing = editingId === item.id;

    return (
      <View style={styles.row}>
        {isEditing ? (
          <>
            <TextInput
              style={[styles.cell, styles.input]}
              value={editData.name}
              onChangeText={text => setEditData(prev => ({ ...prev, name: text }))}
              placeholder="Ürün Adı"
            />
            <TextInput
              style={[styles.cell, styles.input]}
              value={String(editData.price)}
              onChangeText={text => setEditData(prev => ({ ...prev, price: parseFloat(text) }))}
              keyboardType="numeric"
              placeholder="Fiyat"
            />
            <TextInput
              style={[styles.cell, styles.input]}
              value={String(editData.vatRate)}
              onChangeText={text =>
                setEditData(prev => ({ ...prev, vatRate: parseFloat(text) }))
              }
              keyboardType="numeric"
              placeholder="KDV Oranı"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.btnText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.btnText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price.toFixed(2)}₺</Text>
            <Text style={styles.cell}>%{(item.vatRate * 100).toFixed(0)}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item)}>
                <Text style={styles.btnText}>Düzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                <Text style={styles.btnText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ürün Yönetimi</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>Hiç ürün yok.</Text>}
      />
        <View style={styles.addRow}>
          <TextInput
            style={[styles.cell, styles.input]}
            value={newProduct.name}
            onChangeText={text => setNewProduct(prev => ({ ...prev, name: text }))}
            placeholder="Yeni Ürün Adı"
          />
          <TextInput
            style={[styles.cell, styles.input]}
            value={newProduct.price?.toString() || ''}
            onChangeText={text => setNewProduct(prev => ({ ...prev, price: parseFloat(text) }))}
            placeholder="Fiyat"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.cell, styles.input]}
            value={newProduct.vatRate?.toString() || ''}
            onChangeText={text => setNewProduct(prev => ({ ...prev, vatRate: parseFloat(text) }))}
            placeholder="KDV Oranı"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAddProduct}>
            <Text style={styles.btnText}>Ekle</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default ProductManagerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  editBtn: {
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 4,
    marginRight: 4,
  },
  deleteBtn: {
    backgroundColor: '#F44336',
    padding: 6,
    borderRadius: 4,
  },
  saveBtn: {
    backgroundColor: '#2196F3',
    padding: 6,
    borderRadius: 4,
    marginRight: 4,
  },
  cancelBtn: {
    backgroundColor: '#9E9E9E',
    padding: 6,
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 8,
    borderColor: '#ccc',
  },
  addBtn: {
    backgroundColor: '#3f51b5',
    padding: 6,
    borderRadius: 4,
    marginLeft: 6,
  },
  
});
