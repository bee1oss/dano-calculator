// components/ProductRow.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../data/defaultProducts';

interface Props {
  item: Product;
  isEditing: boolean;
  editData: Partial<Product>;
  onChange: (data: Partial<Product>) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductRow: React.FC<Props> = ({
  item,
  isEditing,
  editData,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete
}) => {
  return (
    <View style={styles.row}>
      {isEditing ? (
        <>
          <TextInput
            style={[styles.cell, styles.input]}
            value={editData.name}
            onChangeText={text => onChange({ ...editData, name: text })}
            placeholder="Ürün Adı"
          />
          <TextInput
            style={[styles.cell, styles.input]}
            value={editData.price?.toString() || ''}
            onChangeText={text =>
              onChange({ ...editData, price: parseFloat(text) || undefined })
            }
            keyboardType="numeric"
            placeholder="Fiyat"
          />
          <TextInput
            style={[styles.cell, styles.input]}
            value={editData.vatRate?.toString() || ''}
            onChangeText={text =>
              onChange({ ...editData, vatRate: parseFloat(text) || undefined })
            }
            keyboardType="numeric"
            placeholder="KDV"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSave}>
              <Text>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel}>
              <Text>İptal</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{item.price.toFixed(2)}₺</Text>
          <Text style={styles.cell}>%{item.vatRate}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onEdit}>
              <Text>Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text>Sil</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 5 },
  cell: { flex: 1 },
  input: { borderWidth: 1, padding: 4 },
  buttonContainer: { flexDirection: 'row' },
});

export default ProductRow;
