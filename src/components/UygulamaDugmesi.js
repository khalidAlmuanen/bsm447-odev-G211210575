import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function UygulamaDugmesi({ title, onPress, disabled = false, accessibilityLabel = title }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.disabledBackground : colors.buttonBackground },
      ]}
    >
      <Text style={[
        styles.title,
        { color: disabled ? colors.disabledText : colors.buttonText },
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
