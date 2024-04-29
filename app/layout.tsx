import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "ChatCapsule",
  description: "Capture & Organize AI Conversations",
};

interface RootLayoutProps {
	children: React.ReactNode,
}



const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang='en'>
	<head>
        <link rel="icon" href="/favicon.png" />
	</head>
    <body>
      <Provider>
        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
