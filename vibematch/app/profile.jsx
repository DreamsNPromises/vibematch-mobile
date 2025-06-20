import LabeledInput from "@/components/LabeledInput.jsx";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { ImageBackground } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "../assets/styles/default.styles.js";
import { COLORS } from "../constants/colors.js";

export default function ProfileScreen() {
    const [name, setName] = useState("Ivan Ivanov");
    const [email, setEmail] = useState("ivan.ivanov@example.com");
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [avatarUri, setAvatarUri] = useState(null);
    //const [status, requestPermission] = MediaLibrary.usePermissions();

    const handleSave = () => {
        //alert("Данные сохранены!");
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
            alert("Нужно разрешение на доступ к фото");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    // useEffect(() => {
    //     if (!status?.granted) {
    //         requestPermission();
    //     }
    // }, []);

    return (
        <ImageBackground
            source={require("../assets/images/gradient-bg.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={localStyles.scrollContainer}>
                        <View style={localStyles.container}>
                            <Text style={localStyles.title}>Profile date</Text>
                        </View>

                        <View style={localStyles.avatarContainer}>
                            <Image
                                source={
                                    avatarUri
                                        ? { uri: avatarUri }
                                        : require("../assets/images/default-profile-icon2.jpg")
                                }
                                style={localStyles.avatar}
                                resizeMode="cover"
                            />

                            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
                                <Image
                                    source={require("../assets/images/camera-icon.png")}
                                    style={localStyles.cameraIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={localStyles.formContainer}>
                            <LabeledInput
                                label="Name"
                                value={name}
                                onChangeText={setName}
                                keyboardType="text"
                            />

                            <LabeledInput
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email"
                            />

                            <TouchableOpacity
                                style={localStyles.datePickerButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Image
                                    source={require("../assets/images/calendar-icon.png")}
                                    style={localStyles.calendarLogo}
                                    resizeMode="contain"
                                />
                                <Text style={localStyles.datePickerText}>
                                    {format(birthDate, "dd.MM.yyyy")}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={birthDate}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                    maximumDate={new Date()}
                                />
                            )}
                        </View>

                    </ScrollView>

                    <TouchableOpacity style={localStyles.saveButton} onPress={handleSave}>
                        <Text style={localStyles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 16,
    },
    avatarContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 25,
        borderColor: COLORS.secondary,
    },
    formContainer: {
        width: 300,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "ADLaM",
        marginBottom: 8,
        fontWeight: "600",
    },
    input: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "ADLaM",
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        marginHorizontal: 16,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 40,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "ADLaM",
    },
    title: {
        fontSize: 34,
        fontFamily: "ADLaM",
        marginBottom: 16,
    },
    datePickerButton: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 24,
        justifyContent: "center",
        backgroundColor: "#FF6B6B2A",
        flexDirection: "row",         // горизонтальное расположение
        alignItems: "center",         // вертикальное выравнивание
        justifyContent: "start",
    },
    datePickerText: {
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "ADLaM",
    },
    calendarLogo: {
        width: 30,
        height: 30,
        marginHorizontal: 12,
    },
    cameraIcon: {
        width: 50,
        height: 50,
        position: "relative",
        bottom: 35,
        left: 60,
    },
});
