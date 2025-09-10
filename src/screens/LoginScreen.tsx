import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {
    createRequestToken,
    createSessionId,
    getAcount,
    validateTokenWithLogin,
} from "../api/authApi";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";

type HomeNaviagationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const LoginScreen = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [account, setAccount] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigation = useNavigation<HomeNaviagationProp>();
    const handleLogin = async () => {
        try {
            setErrorMessage("");
            console.log("token ID");
            const tokenRes = await createRequestToken();
            const requestToken = tokenRes.data.request_token;
            console.log("token ID:", requestToken);
            await validateTokenWithLogin(userName, password, requestToken);

            const sessionRes = await createSessionId(requestToken);
            const sessionId = sessionRes.data.session_id;
            console.log("Session ID:", sessionId);
            setSessionId(sessionId);

            const accountRes = await getAcount(sessionId);
            setAccount(accountRes.data);
            navigation.replace('InApp', {screen: 'Home'});
        } catch (err: any) {
            setErrorMessage(
                "Login failed: " +
                (err.response?.data?.status_message || err.message)
            );
            console.log("Error");
            setUserName("");
            setPassword("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>

            <View style={styles.registerRow}>
                <Text style={styles.text}>Bạn chưa có tài khoản? </Text>
                <TouchableOpacity>
                    <Text style={styles.link}>Đăng ký</Text>
                </TouchableOpacity>
            </View>

            {/* Ô nhập username */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập Email"
                value={userName}
                onChangeText={setUserName}
            />

            {/* Ô nhập password */}
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <View style={styles.row}>
                <TouchableOpacity>
                    <Text style={styles.smallText}>Lưu mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.link}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
            </View>

            {/* Nút đăng nhập */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Kết quả */}
            {sessionId && <Text style={styles.success}>Session ID: {sessionId}</Text>}
            {account && <Text style={styles.success}>Hello {account.username}</Text>}
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
    },
    registerRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    text: {
        fontSize: 14,
        color: "#333",
    },
    link: {
        fontSize: 14,
        color: "#007bff",
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 14,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    smallText: {
        fontSize: 13,
        color: "#555",
    },
    button: {
        backgroundColor: "#1976d2",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    success: {
        color: "green",
        textAlign: "center",
        marginTop: 10,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 10,
    },
});

export default LoginScreen;
