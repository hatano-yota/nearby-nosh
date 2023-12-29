import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

const Login: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ようこそ, {session.user && session.user.email}</h1>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <button onClick={() => signIn()}>ログイン</button>
          </div>
        )
      }
    </>
  );
};

export default Login;
