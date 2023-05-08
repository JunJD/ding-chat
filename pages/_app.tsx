import { RecoilRoot } from "recoil";
import ThemeCustomization from "../lib/themes";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeCustomization>
      <Component {...pageProps} />
      </ThemeCustomization>
    </RecoilRoot>
  );
}
