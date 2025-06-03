import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ImageBackground,
  FlatList,
} from "react-native";
import Slider from '@react-native-community/slider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import FontSizeContext from "./FontSizeContext";

const languageList = [
  {name:"English",code: "en-US",image: require("@/assets/images/english.jpeg")},
  { name: "Gujarati", code: "gu-IN", image: require("@/assets/images/gujarat.jpeg") },
  { name: "Tamil", code: "ta-IN", image: require("@/assets/images/tamil.jpeg") },
  { name: "Hindi", code: "hi-IN", image: require("@/assets/images/delhi.jpeg") },
  { name: "Telugu", code: "te-IN", image: require("@/assets/images/Andhra.jpeg") },
  { name: "Malayalam", code: "ml-IN", image: require("@/assets/images/kerala.jpg") },
];

const fontSizes = [
  { name: "Very Small", multiplier: 0.6 },
  { name: "Small", multiplier: 0.75 },
  { name: "Medium", multiplier: 1.0 },
  { name: "Large", multiplier: 1.25 },
  { name: "Very Large", multiplier: 1.5 },
];

export default function IndexScreen() {
  const {fontSizeMultiplier,changeFontSizeMultiplier} = useContext(FontSizeContext);
  const [fontSizeModalVisible, setFontSizeModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [previewMultiplier, setPreviewMultiplier] = useState<number>(fontSizeMultiplier);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const openmodel=()=>{
    setModalVisible(true)
  }
  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  const onSelectFontSize = (multiplier: number) => {
    changeFontSizeMultiplier(multiplier);
    setFontSizeModalVisible(false);
  };

  const openFontSizeModel=()=>{
    setPreviewMultiplier(fontSizeMultiplier);
    setFontSizeModalVisible(true);
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { fontSize: 24 * fontSizeMultiplier }]}>
          {t("home.title")}
        </Text>
        <TouchableOpacity onPress={openFontSizeModel} style={{marginLeft:200}}>
            <Ionicons name="text" size={30 * fontSizeMultiplier} color="black" style={{marginTop:6,}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={openmodel}>
          <Image
          style={[
            styles.languageswitch,
            {
              width: 40 * fontSizeMultiplier,   // base size is 40
              height: 40 * fontSizeMultiplier,  // scale accordingly
            },
          ]}
          source={require("@/assets/images/languageswitch.png")}
        />
         </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalcontent}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { fontSize: 24 * fontSizeMultiplier }]}>
                Choose Language
              </Text>
            </View>
            <FlatList
              data={languageList}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageCard}
                  onPress={() => changeLanguage(item.code)}
                >
                  <ImageBackground
                    source={item.image}
                    style={styles.imageBackground}
                  >
                    <Text style={[styles.languageCardText, { fontSize: 24 * fontSizeMultiplier }]}>
                      {item.name}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              contentContainerStyle={[styles.languagecontainer]}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
      </Modal>
      <View>
        <View style={styles.content}>
          <Text style={[styles.welcomeText, { fontSize: 40 * fontSizeMultiplier }]}>
            {t("home.welcome")}
          </Text>
          <Text style={[styles.subtitle, { fontSize: 24 * fontSizeMultiplier }]}>
            {t("home.subtitle")}
          </Text>
          <Text style={[styles.description, { fontSize: 16 * fontSizeMultiplier }]}>
            {t("home.description")}
          </Text>
          <Text style={[styles.exploringLanguages, { fontSize: 24 * fontSizeMultiplier }]}>
            {t("home.exploringLanguages")}
          </Text>
          <Text
            style={[
              styles.exploringLanguagesDescription,
              { fontSize: 16 * fontSizeMultiplier },
            ]}
          >
            {t("home.exploringLanguagesDescription")}
          </Text>
          <Text style={[styles.exploringLanguages, { fontSize: 24 * fontSizeMultiplier }]}>
            {t("home.userGuide")}
          </Text>
          <Text style={[styles.description, { fontSize: 16 * fontSizeMultiplier }]}>
            {t("home.homePageMessage")}
          </Text>
        </View>
      </View> 
      <Modal
        animationType="fade"
        visible={fontSizeModalVisible}
        onRequestClose={() => setFontSizeModalVisible(false)}
        transparent={true}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalcontent}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => setFontSizeModalVisible(false)}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { fontSize: 24 * fontSizeMultiplier }]}>
                Choose Font Size
              </Text>
            </View>
            <FlatList
              data={fontSizes}
              keyExtractor={(item) => item.multiplier.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageCard} 
                  onPress={() => onSelectFontSize(item.multiplier)}
                >
                  <Text style={[styles.languageCardText, { fontSize: 24 * fontSizeMultiplier }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={[styles.languagecontainer]}
              showsVerticalScrollIndicator={false}
            />
            <View style={styles.sliderSectionContainer}>
                  <Text style={[styles.modalTitle, { fontSize: 20 * fontSizeMultiplier, textAlign: 'center', marginBottom: 10, marginLeft: 0 }]}>
                    Adjust Font Size with Slider.
                  </Text>
                  <Text style={[styles.sliderValueText, { fontSize: 16 * fontSizeMultiplier }]}>
                          This is a sample paragraph. You can see how the text size changes as you move the slider. 
                          Adjust it to find the most comfortable reading size for you. The quick brown fox jumps over the lazy dog.
                  </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0.6} 
                  maximumValue={1.5} 
                  step={0.02}  
                  value={fontSizeMultiplier} 
                  onValueChange={(value) => {
                  }}
                  onSlidingComplete={(value) => {
                    changeFontSizeMultiplier(value);
                  }}
                  minimumTrackTintColor="#007AFF" 
                  maximumTrackTintColor="#BDBDBD" 
                  thumbTintColor="#007AFF"   
                />
            </View>
          </View>
        </SafeAreaView>
      </Modal>     
      
    </ScrollView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#EAE4D5",
  },
  backButton: {
    alignSelf:"flex-start",
    marginRight: 10,
  },
headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 16,
},

  imageBackground:{
    height:150,
    width:"100%",
    resizeMode:"cover",
  },
  modalContainer:{
    flex:1,
    backgroundColor:"#EAE4D5"
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight:10,
    color: 'black',
  },
  modalcontent:{
    maxHeight:"100%"
  }
  ,
  languageswitch:{
    fontSize:30,
    marginTop: 5,
    marginRight: 10,
  },
  header:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight:"bold",
    alignSelf: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50,  // Add spacing between icon and title
    color: '#000000',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight:30
  },
  exploringLanguages: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  exploringLanguagesDescription: {
    fontSize: 16,
    lineHeight:30,
    marginBottom: 16,
  },
  languagecontainer: {
    width: '100%',
    gap: 12,
    marginTop: 20,
    marginLeft:20,
    paddingBottom:40,
  },
  languageCard: {
    width: '90%',
    borderRadius: 10,
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'flex-start',
    backgroundColor:"#B6B09F"
  },

  languageCardText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  sliderSectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1, // Optional: to separate from FlatList
    borderTopColor: '#DDDDDD', // Optional
    marginTop: 10, // Optional
  },
  sliderValueText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#333', // Adjust color as needed
  },
  slider: {
    width: '100%',
    height: 60, 
  },
  selectedFontSizeItem: { // Optional: Style for the selected item in FlatList
      borderColor: '#007AFF', // Example highlight color
      borderWidth: 2.5,
  },
});
