# Entwicklung

Dieses Dokument beschreibt den Prozess, um diese Anwendung lokal auf deinem PC entwickeln und starten zu können.

## Erste Schritte

Wir nutzen primär TypeScript für die Entwicklung der Karte. Aber da jeder JavaScript-Code auch prinzipiell erstmal gültiges TypeScript ist,
sind natürlich auch Ergänzungen in JavaScript gerne gesehen.

Für das CSS nutzen wir [Tailwind](https://tailwindcss.com/). Das erleichtert uns ein wenig die Entwicklung, aber wenn du damit noch keine Erfahrung
hast, würde es auch reichen, gewöhnliches CSS zu schreiben.

Damit der ganze Spaß aber lokal auch läuft, brauchst du Node.js. Empfohlen ist Version 16 oder höher, dieses kannst du über den [LTS-Installer auf nodejs.org](https://nodejs.org) beziehen.

Sobald Node.js installiert ist, welches den Paketmanager `npm` beinhaltet, öffne deine Konsole und führe den folgenden Code aus:

```sh
git clone https://github.com/Queer-Lexikon/regenbogenkarte.git
npm ci
npm run dev
```

Du solltest nun eine lokale Version der Karte haben! Besuche [localhost:5173](http://localhost:5173) in deinem Browser.

Sobald du fertig bist und den lokalen Server wieder stoppen willst, tippe <kbd>Ctrl</kbd>+<kbd>C</kbd> in deinem Terminal.

`npm ci` muss in der Regel nur einmal ausgeführt werden, oder wenn du deinen Branch aktualisierst.
Der Befehl lädt die notwendigen Abhängigkeiten für die Regenbogenkarte herunter und installiert diese.
