import { Stack } from 'expo-router';

const GuiaAlimentarNav = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="GerarGuia"
        options={{ headerShown: false }}
        title={true}
      />
      <Stack.Screen
        name="GuiaAlimentarHome"
        options={{ headerShown: false }}
        title={true}
      />
    </Stack>
  );
};

export default GuiaAlimentarNav;
