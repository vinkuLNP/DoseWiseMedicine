import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const SuccessModal = ({ visible, message, onClose }: any) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.4)",
                }}
            >
                <View
                    style={{
                        width: "80%",
                        borderRadius: 20,
                        overflow: "hidden",
                        backgroundColor: "white",
                    }}
                >
                    <LinearGradient
                        colors={["#22C55E", "#16A34A"]}
                        style={{ padding: 20 }}
                    >
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                            ✅ Success
                        </Text>
                    </LinearGradient>

                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 16, color: "#374151" }}>
                            {message}
                        </Text>

                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                marginTop: 20,
                                padding: 12,
                                backgroundColor: "#16A34A",
                                borderRadius: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "600" }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};