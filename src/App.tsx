import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { supabase } from "./supabaseClient";
// import { useEffect } from 'react';

const theme = createTheme();

function App() {

  // const user = supabase.auth.user();

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       handleAuthSession(event, session);
  //       if (event === "SIGNED_IN") {
  //         const signedInUser = supabase.auth.user();
  //         const userId = signedInUser.id;
  //         supabase
  //           .from("user")
  //           .upsert({ id: userId })
  //           .then((_data, error) => {
  //             if (!error) {
  //               console.log(error)
  //             }
  //           });
  //       }
  //       if (event === "SIGNED_OUT") {
  //           console.log('SIGNED_OUT')
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener.unsubscribe();
  //   };
  // }, [router]);

  // useEffect(() => {
  //   if (user) {
  //     if (router.pathname === "/signin") {
  //       router.push("/");
  //     }
  //   }
  // }, [router.pathname, user, router]);

  // const handleAuthSession = async (event, session) => {
  //   await fetch("/api/auth", {
  //     method: "POST",
  //     headers: new Headers({ "Content-Type": "application/json" }),
  //     credentials: "same-origin",
  //     body: JSON.stringify({ event, session }),
  //   });
  // };


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
      </Routes>
     </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
