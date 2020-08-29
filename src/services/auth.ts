interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  }
}

export function signIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'jhwdu8ew2e2ewdf893ufhn8eddfhe3h8dhxe2jmxkdch23e8de2wj',
        user: {
          name: 'Alexandre',
          email: 'alexandre@gmail.com'
        }
      })
    }, 2000);
  });
}