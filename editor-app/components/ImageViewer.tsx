import {
  Canvas,
  ColorMatrix,
  Group,
  Image as SkiaImage,
  useCanvasRef,
  useImage,
} from "@shopify/react-native-skia";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FilterType = "normal" | "grayscale" | "sepia";

type Props = {
  imgSource: any;
  selectedImage?: string;
};

const filters: { type: FilterType; matrix: number[] }[] = [
  {
    type: "normal",
    matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  },
  {
    type: "grayscale",
    matrix: [
      0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0.2126,
      0.7152, 0.0722, 0, 0, 0, 0, 0, 1, 0,
    ],
  },
  {
    type: "sepia",
    matrix: [
      0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131,
      0, 0, 0, 0, 0, 1, 0,
    ],
  },
];

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const [currentFilter, setCurrentFilter] = useState<FilterType>("normal");
  const image = useImage(selectedImage || imgSource);
  const canvasRef = useCanvasRef();

  const renderFilterButtons = () => {
    return (
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.type}
            style={[
              styles.filterButton,
              currentFilter === filter.type && styles.activeFilterButton,
            ]}
            onPress={() => setCurrentFilter(filter.type)}
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
  };

  return (
    <View style={styles.container}>
      <Canvas ref={canvasRef} style={styles.image}>
        <Group>
          <ColorMatrix
            matrix={filters.find((f) => f.type === currentFilter)?.matrix || []}
          />
          {image && (
            <SkiaImage
              image={image}
              fit="cover"
              x={0}
              y={0}
              width={320}
              height={440}
            />
          )}
        </Group>
      </Canvas>
      {renderFilterButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    overflow: "hidden",
  },
  filterContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    marginHorizontal: 5,
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
