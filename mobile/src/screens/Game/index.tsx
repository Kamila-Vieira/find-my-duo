import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, Route, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DouCard, DouCardProps } from "../../components/DouCard";

import { THEME } from "../../theme";
import { styles } from "./styles";
import { useEffect, useState } from "react";

export function Game() {
  const [duos, setDuos] = useState<DouCardProps[]>([]);
  const navigation = useNavigation();
  const { params: game } = useRoute<Route<"game", GameParams>>();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.15.11:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" size={20} color={THEME.COLORS.CAPTION_300} />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} resizeMode="cover" style={styles.cover} />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(duo) => duo.id}
          renderItem={({ item }) => <DouCard onConnect={() => {}} data={item} />}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={duos.length === 0 ? styles.exptyListContent : styles.contentList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para este jogo ainda!
            </Text>
          )}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}
