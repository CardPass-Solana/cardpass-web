import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/layout/Nav";
import { I18nProvider, useI18n } from "~/contexts/i18n";
import "~/styles/app.css";

function AppContent() {
  const { locale } = useI18n();

  return (
    <Router
      root={props => (
        <div class="transition-opacity duration-200">
          <Nav />
          <Suspense>{props.children}</Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
