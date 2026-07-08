import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Layout from "./components/Layout";

function App() {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <Layout />
      </I18nextProvider>
    </HelmetProvider>
  );
}

export default App;
