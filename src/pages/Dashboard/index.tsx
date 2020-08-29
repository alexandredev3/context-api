import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  function handleSignOut() {
    signOut();
    /**
     * Retorno:
      false,
      null
     */
  };

  return (
    <View>
      <TouchableOpacity style={{ 
        alignItems: 'center', marginTop: 100
      }} onPress={handleSignOut}>
        <Text style={{ fontSize: 18 }}>
          Logout
        </Text>
        <Text>
          Usurario: {user?.name}
          {'\n'}
          Email: {user?.email}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default Dashboard;
