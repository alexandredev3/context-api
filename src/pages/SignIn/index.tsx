import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signed, signIn, user } = useAuth()

  console.log(signed);
  console.log(user);

  function handleSingIn() {
    signIn();
    /**
     * Retorno:
     * Object {
        "token": "jhwdu8ew2e2ewdf893ufhn8eddfhe3h8dhxe2jmxkdch23e8de2wj",
        "user": Object {
          "email": "alexandre@gmail.com",
          "name": "Alexandre",
        },
      }
     */
  };

  return (
    <View>
      <TouchableOpacity style={{ 
        alignItems: 'center', marginTop: 100
      }} onPress={handleSingIn}>
        <Text style={{ fontSize: 18 }}>
          SignIn
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default SignIn;
