import { View, Text, ViewProps } from "react-native";

import { styles } from "./styles";

interface HeadingProps extends ViewProps {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, ...rest }: HeadingProps) {
  return (
    <View style={styles.container} {...rest}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
