import { useState } from "react";
import {
  View,
  Modal,
  Text,
  ModalProps,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Heading } from "../Heading";

import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";

interface DouMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DouMatch({ discord, onClose, ...rest }: DouMatchProps) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert("Discord copiado", "Usuário do discord copiado para a sua área de transferência!");
    setIsCopping(false);
  }

  return (
    <Modal animationType="fade" {...rest} transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_300} />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let’s play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />
          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            disabled={isCopping}
            onPress={handleCopyDiscordToClipboard}
            style={styles.discordButton}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
