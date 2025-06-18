import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const FontSizeContext = createContext({
  fontSizeMultiplier: 1, // Default is medium (100%)
  changeFontSizeMultiplier: (multiplier: number) => {},
});

export const FontSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1);

  useEffect(() => {
    const loadFontSize = async () => {
      try {
        const savedMultiplier = await AsyncStorage.getItem(
          "fontSizeMultiplier"
        );
        if (savedMultiplier !== null) {
          setFontSizeMultiplier(parseFloat(savedMultiplier));
        }
      } catch (error) {
        console.error(
          "Failed to load font size multiplier from AsyncStorage.",
          error
        );
      }
    };
    loadFontSize();
  }, []);

  const changeFontSizeMultiplier = async (multiplier: number) => {
    try {
      await AsyncStorage.setItem("fontSizeMultiplier", multiplier.toString());
      setFontSizeMultiplier(multiplier);
    } catch (error) {
      console.error(
        "Failed to save font size multiplier to AsyncStorage.",
        error
      );
    }
  };

  return (
    <FontSizeContext.Provider
      value={{ fontSizeMultiplier, changeFontSizeMultiplier }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeContext;
