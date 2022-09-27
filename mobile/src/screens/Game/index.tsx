import { TouchableOpacity, View, Image, FlatList, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, Route, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import logoImg from "../../assets/logo-nlw-esports.png";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { LoggedUser } from "../../components/LoggedUser";
import { DouCard, DouCardProps } from "../../components/DouCard";
import { DouMatch } from "../../components/DouMatch";

import { THEME } from "../../theme";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";

export function Game() {
  const [loadingAds, setLoadingAds] = useState(false);
  const [duos, setDuos] = useState<DouCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");
  const navigation = useNavigation();
  const {
    params: { accessToken, avatar, discord, ...game },
  } = useRoute<Route<"game", GameParams>>();

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.11:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordDuoSelected(data.discord);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    setLoadingAds(true);
    fetch(`http://192.168.15.11:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        setDuos(data);
        setLoadingAds(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <LoggedUser {...{ accessToken, avatar, discord }} />

        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" size={20} color={THEME.COLORS.CAPTION_300} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} style={styles.containerScroll}>
          <Image source={{ uri: game.bannerUrl }} resizeMode="cover" style={styles.cover} />
          <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

          {loadingAds ? (
            <Loading />
          ) : (
            <FlatList
              data={duos}
              keyExtractor={(duo) => duo.id}
              renderItem={({ item }) => (
                <DouCard onConnect={() => getDiscordUser(item.id)} data={item} />
              )}
              showsHorizontalScrollIndicator={false}
              style={styles.containerList}
              contentContainerStyle={
                duos.length === 0 ? styles.emptyListContent : styles.contentList
              }
              ListEmptyComponent={() => (
                <Text style={styles.emptyListText}>
                  Não há anúncios publicados para este jogo ainda!
                </Text>
              )}
              horizontal
            />
          )}

          <DouMatch
            discord={discordDuoSelected}
            visible={discordDuoSelected.length > 0}
            onClose={() => setDiscordDuoSelected("")}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
