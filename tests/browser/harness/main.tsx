import { createRoot } from "react-dom/client";
import { ControlSetup } from "@/components/control-setup";
import { Practice } from "@/components/practice";
import { KenVideo } from "@/components/ken-video";
import "@/app/globals.css";

const query = new URLSearchParams(location.search);
const locale = query.get("locale") === "pt-BR" ? "pt-BR" : "en";
document.documentElement.lang = locale;
createRoot(document.getElementById("root")!).render(
  <>
    <nav aria-label="Test harness">
      <a href={`/?view=setup&locale=${locale}`}>Setup fixture</a>
      <a href={`/?view=practice&locale=${locale}`}>Practice fixture</a>
    </nav>
    {query.get("view") === "setup" ? (
      <ControlSetup locale={locale} />
    ) : query.get("view") === "video" ? (
      <KenVideo locale={locale} />
    ) : (
      <Practice locale={locale} userId="browser-fixture-user" />
    )}
  </>,
);
