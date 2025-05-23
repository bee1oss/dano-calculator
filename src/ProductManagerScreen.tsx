import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Product } from './data/defaultProducts';
import { readFromFile } from './Product/fileOperations';
import { handleAddProduct, handleDelete, handleEdit, handleSave } from './Product/productManager';
import { handleInputChange, handleNumericInputChange } from './Product/formHandlers';
import { defaultProducts } from './data/defaultProducts';


const ProductManagerScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name: '', price: undefined, vatRate: undefined });
//da
  useEffect(() => {
    readFromFile(setProducts, defaultProducts);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.headerRow]}>
              <Text style={styles.headerCell}>Ürün</Text>
              <Text style={styles.headerCell}>Fiyat</Text>
              <Text style={styles.headerCell}>KDV</Text>
        </View>
      <FlatList
        data={products}
        renderItem={({ item }: { item: Product }) => (
          <View style={styles.row}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={[styles.cell, styles.input]}
                  value={editData.name}
                  onChangeText={handleInputChange(setEditData, 'name')}
                  placeholder="Ürün Adı"
                />
                <TextInput
                  style={[styles.cell, styles.input]}
                  value={editData.price?.toString() || ''}
                  onChangeText={handleNumericInputChange(setEditData, 'price')}
                  placeholder="Fiyat"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.cell, styles.input]}
                  value={editData.vatRate?.toString() || ''}
                  onChangeText={handleNumericInputChange(setEditData, 'vatRate')}
                  placeholder="KDV Oranı"
                  keyboardType="numeric"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.saveBtn} onPress={() => handleSave(editingId, editData, products, setProducts)}>
                    <Text style={styles.btnText}>Kaydet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditingId(null)}>
                    <Text style={styles.btnText}>İptal</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.price?.toFixed(2)}₺</Text>
                <Text style={styles.cell}>%{item.vatRate?.toFixed(0)}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item, setEditingId, setEditData)}>
                    <Text style={styles.btnText}>Düzenle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id, products, setProducts)}>
                    <Text style={styles.btnText}>Sil</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>Hiç ürün yok.</Text>}
      />
      <View style={styles.addRow}>
        <TextInput
          style={[styles.cell, styles.input]}
          value={newProduct.name}
          onChangeText={handleInputChange(setNewProduct, 'name')}
          placeholder="Yeni Ürün Adı"
        />
        <TextInput
          style={[styles.cell, styles.input]}
          value={newProduct.price?.toString() || ''}
          onChangeText={handleNumericInputChange(setNewProduct, 'price')}
          placeholder="Fiyat"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.cell, styles.input]}
          value={newProduct.vatRate?.toString() || ''}
          onChangeText={handleNumericInputChange(setNewProduct, 'vatRate')}
          placeholder="KDV Oranı"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addBtn} onPress={() => handleAddProduct(newProduct, setProducts, products)}>
          <Text style={styles.btnText}>Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fdfefe",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#2c3e50",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  headerRow: {
    backgroundColor: "#2c3e50",
    paddingVertical: 10,
    borderRadius: 4,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#ecf0f1",
    fontSize: 14,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#34495e',
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    color: '#2c3e50',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#e8f8f5',
    borderRadius: 5,
    borderTopWidth: 1,
    borderTopColor: '#bbb',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  editBtn: {
    backgroundColor: '#2980b9',
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  deleteBtn: {
    backgroundColor: '#c0392b',
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  saveBtn: {
    backgroundColor: '#27ae60',
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  cancelBtn: {
    backgroundColor: '#7f8c8d',
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  addBtn: {
    backgroundColor: '#1abc9c',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 5,
  },
});


export default ProductManagerScreen;
