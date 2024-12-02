import {
  Canvas,
  ColorMatrix,
  Group,
  Image as SkiaImage,
  useCanvasRef,
  useImage,
} from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet, View } from "react-native";

export type FilterType = "normal" | "grayscale" | "sepia";

type Props = {
  imgSource: any;
  selectedImage?: string;
  currentFilter: FilterType;
};

export const filters: { type: FilterType; matrix: number[] }[] = [
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

export default function ImageViewer({
  imgSource,
  selectedImage,
  currentFilter,
}: Props) {
  const image = useImage(selectedImage || imgSource);
  const canvasRef = useCanvasRef();

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
});
