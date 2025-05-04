import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { defaultProducts, Product } from "./data/defaultProducts";
import { readFromFile } from "./Product/fileOperations";
import { useFocusEffect } from "@react-navigation/native";

type CartItem = {
  product: Product;
  quantity: number;
};

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const [cart, setCart] = useState<CartItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      readFromFile(setProducts, defaultProducts);
    }, [])
  );

  useEffect(() => {
    console.log("Yüklenen Ürünler:", products); // Yüklenen ürünleri kontrol et
  }, [products]);

  const handleExit = () => {
    BackHandler.exitApp();
  };

  const handleAddProduct = () => {
    const product = products.find((p) => p.id === selectedProductId);
    if (!product || !quantity || isNaN(Number(quantity))) {
      return;
    }

    const qty = Number(quantity);
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    console.log("Cart içinde mevcut olan ürün:", cart[existingIndex]); // Sepet içindeki ürünü logla

    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += qty;
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity: qty }]);
    }

    setSelectedProductId(""); // Seçilen ürünü sıfırla
    setQuantity("1"); // Adet miktarını sıfırla
  };

  const calculateTotals = () => {
    let total = 0;
    let vat = 0;

    cart.forEach(({ product, quantity }) => {
      const price = product.price * quantity;
      const itemVat = (price * product.vatRate) / 100;
      total += price;
      vat += itemVat;
    });

    return {
      total: total.toFixed(2),
      vat: vat.toFixed(2),
      grandTotal: (total + vat).toFixed(2),
    };
  };

  const totals = calculateTotals();

  const handleReset = () => {
    Alert.alert("Emin misiniz?", "Sepeti sıfırlamak istiyor musunuz?", [
      { text: "İptal", style: "cancel" },
      { text: "Evet", onPress: () => setCart([]) },
    ]);
  };

  useEffect(() => {
    if (selectedProductId) {
      const product = products.find((p) => p.id === selectedProductId);
      console.log("Seçilen Ürün:", product);
    }
  }, [selectedProductId]);

  return (
    <View style={styles.container}>
      {/* Tablo Başlıkları */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={styles.headerCell}>Adet</Text>
        <Text style={styles.headerCell}>Ürün</Text>
        <Text style={styles.headerCell}>Fiyat</Text>
        <Text style={styles.headerCell}>Toplam</Text>
      </View>

      <ScrollView style={styles.tableBody}>
        {cart.map(({ product, quantity }) => {
          const price = product.price * quantity;
          const vat = (price * product.vatRate) / 100;
          const total = price * quantity;

          return (
            <View style={styles.row} key={product.id}>
              <Text style={styles.cell}>{quantity}</Text>
              <Text style={styles.cell}>{product.name}</Text>
              <Text style={styles.cell}>{price.toFixed(2)}₺</Text>
              <Text style={styles.cell}>{total.toFixed(2)}₺</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Ürün Ekleme Alanı */}
      <View style={styles.addSection}>
        <Picker
          selectedValue={selectedProductId}
          onValueChange={(itemValue) => setSelectedProductId(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Ürün seçiniz..." value="" />
          {products.length > 0 ? (
            products.map((product) => (
              <Picker.Item
                key={product.id}
                label={`${product.name} - ${product.price}₺`}
                value={product.id}
              />
            ))
          ) : (
            <Picker.Item label="Ürünler yükleniyor..." value="" />
          )}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Adet"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.btnText}>Ürün Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Toplamlar */}
      <View style={styles.summary}>
        <Text>KDV Hariç: {totals.total} ₺</Text>
        <Text>Toplam KDV: {totals.vat} ₺</Text>
        <Text>Genel Toplam: {totals.grandTotal} ₺</Text>
      </View>

      {/*Sepeti sifirlama alani*/}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.btnText}>Sepeti Sıfırla</Text>
      </TouchableOpacity>

      {/* Çıkış */}
      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.btnText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 40,
    backgroundColor: "#ecf9ff",
  },
  headerRow: {
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "#34495e",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  tableBody: {
    maxHeight: 300,
    marginBottom: 10,
  },
  addSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 5,
  },
  picker: {
    flex: 2,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  summary: {
    marginTop: 10,
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 5,
  },
  resetButton: {
    backgroundColor: "#f39c12",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  exitButton: {
    backgroundColor: "#c0392b",
    marginTop: 15,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default HomeScreen;
