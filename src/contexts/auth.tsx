import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import * as auth from '../services/auth';

interface User {
  name: string;
  email: string;
}

// formatos das informações qua vão esta dentro do AuthContext.
interface AuthContextData {
  signed: boolean;
  user: User | null; // Estou colocando object porque eu não sei quais são as informações do usuario.
  signIn(): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
// aqui nos não vamos passa o valor default, aqui vamos passar o formato.

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // estou criando uma função dentro do useEffect para usar o async.
  useEffect(() => {
    async function loadStorageData() {
      // podemos usar o multiGet, para pegar informações do user e o token em apenas uma chamada.
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      // se tiver algum data la dentro do storageUser e do storageToken eu vou colocar dentro do estado user.
      if (storageUser && storageToken) {
        // aqui estamos pegando o token do storage.
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        // podemos fazer o Authorization com o ponto também.

        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    // const { token, user } = response;

    setUser(response.user);

    // agora toda requisição que for feita nessa api, ele vai automaticamente enviar um header Authorization com o token.
    api.defaults.headers['Authorization'] = `Bearer ${response.token}`

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
    // RNAuth nome do seu app.
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
