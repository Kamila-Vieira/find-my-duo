import { Route, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { Loading } from "../../components/Loading";
import { styles } from "./styles";
import { HomeParams } from "../../@types/navigation";
import { LoggedUser } from "../../components/LoggedUser";

export function Home() {
  const { navigate } = useNavigation();
  const {
    params: { accessToken, avatar, discord },
  } = useRoute<Route<"home", HomeParams>>();
  const [loadingGames, setLoadingGames] = useState(false);
  const [games, setGames] = useState<GameCardProps[]>([]);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigate("game", { id, title, bannerUrl, accessToken, discord, avatar });
  }

  useEffect(() => {
    setLoadingGames(true);
    fetch("http://192.168.15.11:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setLoadingGames(false);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <LoggedUser {...{ accessToken, avatar, discord }} />

        <Image source={logoImg} style={styles.logo} />

        <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

        {loadingGames ? (
          <Loading />
        ) : (
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
            horizontal
          />
        )}
      </SafeAreaView>
    </Background>
  );
}
