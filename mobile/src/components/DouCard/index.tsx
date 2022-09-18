import { TouchableOpacity, View, Text } from "react-native";
import { GameController } from "phosphor-react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";
import { styles } from "./styles";

export interface DouCardProps {
  id: string;
  name: string;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DouCardProps;
  onConnect: () => void;
}

export function DouCard({
  data: { name, hourStart, hourEnd, weekDays, yearsPlaying, useVoiceChannel },
  onConnect,
}: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={name} />
      <DuoInfo label="Tempo de jogo" value={`${yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${weekDays.length} dias \u2022 ${hourStart.split(":")[0]}h - ${
          hourEnd.split(":")[0]
        }h`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={useVoiceChannel ? "Sim" : "Não"}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />

        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
