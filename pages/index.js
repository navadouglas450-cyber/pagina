import Head from 'next/head';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google' // O el que prefieras
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      <Head>
        <title>Mi Página Web</title>
        <meta name="description" content="Bienvenido a mi página web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container">
          <h1>Bienvenido a mi pagina web</h1>
          <p>cejemplooooooooo.</p>
          <a href="#" className="boton-redireccion">Click aquí</a>
          {user ? (
            <div>
              <p>Bienvenido, {user.email}!</p>
              <button onClick={signOut}>Cerrar sesión</button>
            </div>
          ) : (
            <button onClick={signIn}>Iniciar sesión con Google</button>
          )}
        </div>
      </main>
    </div>
  );
}