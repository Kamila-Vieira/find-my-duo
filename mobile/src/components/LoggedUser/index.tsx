import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { SignOut } from "phosphor-react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";

interface LoggedUseProps {
  avatar: string;
  discord: string;
  accessToken: string;
}

export function LoggedUser({ avatar, discord, accessToken }: LoggedUseProps) {
  const { navigate } = useNavigation();

  async function handleLogout() {
    const loggedOut = await AuthSession.revokeAsync(
      { token: accessToken },
      { revocationEndpoint: "https://discord.com/api/oauth2/token/revoke" }
    );

    if (loggedOut) {
      navigate("auth");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: avatar,
        }}
        style={styles.avatar}
      />
      <Text style={styles.username}>{discord}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <SignOut color={THEME.COLORS.TEXT} size={20} />
      </TouchableOpacity>
    </View>
  );
}
