import {
  Canvas,
  ColorMatrix,
  Group,
  Image as SkiaImage,
  useImage,
} from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { filters, FilterType } from "./ImageViewer";

type Props = {
  imgSource: any;
  selectedImage?: string;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function FilterControls({
  imgSource,
  selectedImage,
  currentFilter,
  onFilterChange,
}: Props) {
  const image = useImage(selectedImage || imgSource);

  return (
    <View style={styles.filterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.type}
          style={[
            styles.filterButton,
            currentFilter === filter.type && styles.activeFilterButton,
          ]}
          onPress={() => onFilterChange(filter.type)}
        >
          <Canvas style={styles.filterPreview}>
            <Group>
              <ColorMatrix matrix={filter.matrix} />
              {image && (
                <SkiaImage
                  image={image}
                  fit="cover"
                  x={0}
                  y={0}
                  width={60}
                  height={60}
                />
              )}
            </Group>
          </Canvas>
          <Text style={styles.filterButtonText}>{filter.type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    marginHorizontal: 15,
    alignItems: "center",
  },
  activeFilterButton: {
    borderColor: "#007bff",
    borderWidth: 2,
    borderRadius: 10,
  },
  filterPreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
  },
  filterButtonText: {
    marginTop: 5,
    color: "white",
    fontSize: 12,
  },
});
