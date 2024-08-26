import React, { useEffect } from "react";
import { SafeAreaView, View, Text, Image } from "react-native"; // Import the 'Text' and 'Image' components
import { SplashProps } from "./types/SplashProps";
import { styles } from "./styles/SplashScreen.styles";

const Splash = (props: SplashProps) => {
  const { navigation } = props;

  const handleSplash = async () => {
    setTimeout(() => {
      navigation.replace("UserList");
    }, 3400);
  };

  useEffect(() => {
    handleSplash();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/017/398/790/non_2x/white-circle-free-png.png",
            width: 200,
            height: 200,
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Built by yakisan</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Splash;
