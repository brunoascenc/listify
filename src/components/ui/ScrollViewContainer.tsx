import { ScrollView, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
};

export const ScrollViewContainer = ({
  children,
  contentContainerStyle,
  style,
}: Props) => {
  return (
    <ScrollView
      style={[{ flex: 1, backgroundColor: '#fff' }, style]}
      contentContainerStyle={[
        {
          padding: 20,
          paddingBottom: 40,
          backgroundColor: '#fff',
          flexGrow: 1,
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};
