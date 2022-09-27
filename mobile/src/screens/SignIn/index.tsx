import { useNavigation } from "@react-navigation/native";
import { DiscordLogo } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as AuthSession from "expo-auth-session";
import { Image, View, TouchableOpacity, Text, Alert } from "react-native";
import { useState } from "react";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { Loading } from "../../components/Loading";
import { Heading } from "../../components/Heading";
import { THEME } from "../../theme";
import { styles } from "./styles";
import { DiscordAuthResponse } from "../../@types/oauth";

export function SignIn() {
  const [singingIn, setSingingIn] = useState(false);
  const { navigate } = useNavigation();

  async function handleDiscordSingIn() {
    setSingingIn(true);
    try {
      const response = await AuthSession.startAsync({
        authUrl:
          "https://discord.com/api/oauth2/authorize?client_id=1021159373394935858&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40kamila_almeida%2Ffind-my-duo&response_type=token&scope=identify",
      });
      if (response.type === "success") {
        const accessToken = response.params.access_token;

        fetch(`https://discord.com/api/users/@me`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
          .then((dataResponse) => dataResponse.json())
          .then((data: DiscordAuthResponse) => {
            setSingingIn(false);
            const avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
            const discord = `${data.username}#${data.discriminator}`;
            navigate("home", { avatar, discord, accessToken });
          })
          .catch((err) => {
            console.log(err);
            Alert.alert("Ops!", "Ocorreu um erro ao tentar buscar os dados do discord.");
            setSingingIn(false);
          });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Ops!", "Ocorreu um erro ao tentar logar no discord.");
      setSingingIn(false);
    }
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading title="Entrar" subtitle="Encontre seu duo e bora jogar!" />

        {singingIn ? (
          <Loading />
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <DiscordLogo color={THEME.COLORS.TEXT} size={20} />

              <Text style={styles.buttonTitle} onPress={handleDiscordSingIn}>
                Entrar com Discord
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </Background>
  );
}
