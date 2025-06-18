import { Feather } from "@expo/vector-icons"; // For menu and settings icons
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [permissionStatus, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [camerastatus, requestcameraPermission] =
    ImagePicker.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const pickImage = async () => {
    console.log(camerastatus);
    console.log(permissionStatus);
    Alert.alert("Select Image", "Choose an option", [
      {
        text: "Take Photo",
        onPress: async () => {
          if (camerastatus?.status !== "granted") {
            const { status } = await requestcameraPermission();
            if (status !== "granted") {
              Alert.alert(
                "Permission required",
                "Please allow camera access to take a photo."
              );
              return;
            }
          }
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        },
      },
      {
        text: "Pick from gallery",
        onPress: async () => {
          if (permissionStatus?.status !== "granted") {
            const { status } = await requestPermission();
            if (status !== "granted") {
              Alert.alert(
                "Permission required",
                "Please allow photo access to upload an image."
              );
              return;
            }
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const ViewImage = () => {
    setModalVisible(true);
  };

  const CloseImage = () => {
    setModalVisible(false);
  };
  const removeImage = () => {
    Alert.alert("Are you sure?", "Do you want to remove this image?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setImage(null);
          console.log("Image removed");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <TouchableOpacity>
          <Feather name="menu" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Profile</Text>

        <TouchableOpacity>
          <Feather name="settings" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage} onLongPress={ViewImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <AntDesign name="user" size={75} color="gray" />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={ViewImage}>
          <Text style={styles.buttonText}>View Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Edit Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={removeImage}>
          <Text style={styles.buttonText}>Delete Image</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={CloseImage}>
          <View style={styles.modalOverlay}>
            {image && (
              <Image source={{ uri: image }} style={styles.modalImage} />
            )}
            <TouchableOpacity onPress={CloseImage}></TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 50,
    height: 200,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "black",
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  closeButton: {
    fontSize: 24,
    color: "white",
    marginTop: 15,
  },
  iconoverlay: {
    position: "absolute",
  },
});
