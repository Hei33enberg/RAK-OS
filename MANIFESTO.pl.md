# RAK — Media bez właściciela

> **Oni mają feed. My mamy format.**
> Oddajmy media ludziom — i agentom, którzy dziś czytają za nich.

*(English: [`MANIFESTO.md`](./MANIFESTO.md).)*

---

## Czym jest RAK OS

RAK OS to **otwarty język treści dla agentowego internetu** i darmowy referencyjny stack na nim zbudowany. Piszesz raz; treść jest **własnością twórcy**, **cytowalna przez każdego agenta AI** i **świeża** — bo maszyna, która czyta świat za ciebie, nie powinna go scrapować, a autor, który to napisał, nie powinien dostać za to zera.

Kontraktem jest [`SPEC.md`](./SPEC.md). Ekonomią — [`ECONOMICS.md`](./ECONOMICS.md). **Pierwszym** węzłem referencyjnym jest [rak.ad](https://rak.ad): żywy indeks polskich mediów lokalnych (1709 źródeł, 16 regionów) — dowód, nie cel. Wszystko tutaj jest MIT. Węzeł to jedno wdrożenie; język — i ruch — są dla każdego kraju.

## Dlaczego istniejemy

Garstka właścicieli decyduje, co czyta większość świata: kilka platform, kilka holdingów, kilka feedów. Teraz na tej warstwie czytają agenci AI — scrapują treść, nie płacą autorom nic, po drodze piorą pochodzenie. Kolejna dekada dokłada presji, nie ulgi: automatyczna moderacja, nakazy skanowania, konsolidacja i bloki, z których każdy chce, by feed wskazywał w jego stronę.

Uważamy, że antidotum jest nudne i trwałe: **otwarty format, darmowy indeks i brak jedynego właściciela któregokolwiek z nich.** Nie lepszy ogród za murem. Dobro wspólne, które każdy kraj, społeczność czy twórca może prowadzić sam.

## W co wierzymy

- **Informacja to infrastruktura, nie towar.** To, co czytasz — i co agent czyta za ciebie — nie jest produktem do inwigilacji i sprzedaży. Warstwa czytelnika w RAK działa **bez klucza i bez konta**.

- **Jeden otwarty format.** Napisz raz, miej to na własność, pozwól każdemu agentowi cytować. Mały, wersjonowany obiekt ([`SPEC.md`](./SPEC.md), który **komponuje** istniejące standardy (RSL — licencje, C2PA — pochodzenie, MCP — transport, x402/ACP — płatność) zamiast je wymyślać na nowo.

- **Agreguj lokalne.** Najpierw przejmowane są historie lokalne, bo lokalne redakcje najtaniej kupić albo zagłodzić. RAK indeksuje je — każdy region, każdy powiat — w jedno miejsce, które trudno przejąć, bo nie jest jednym miejscem.

- **Własne i opłacone.** Treść twórcy nosi przenośny content-wallet (`wallet.json` — [SPEC §4](./SPEC.md)). Pochodzenie jest weryfikowalne, manipulacja wykrywalna, tożsamość podróżuje między węzłami. Gdy płacący agent cytuje własną treść, wartość wraca do twórcy ([`ECONOMICS.md`](./ECONOMICS.md)).

- **Żadnych backdoorów do skanowania.** Wobec nakazów skanowania po stronie klienta w rodzaju „Chat Control" nasza odpowiedź jest prosta: prędzej wyjdziemy z rynku, niż wpleciemy backdoor w czytelnika. Nie składamy absolutnych obietnic, których nie da się dotrzymać — mówimy wprost, co jest odczytywalne po stronie serwera, a co nie: w kodzie, w tym repo.

- **Oddolnie, samofinansująco, suwerennie.** Za tym nie stoją miliardy z USA ani z Chin. Żaden venture capital, private equity ani giełda nie decyduje o roadmapie. Projekt finansuje się z własnego komercyjnego węzła i zostaje na tyle mały, by móc powiedzieć „nie".

- **Królestwo, uczciwie.** Jeden maintainer trzyma wizję i ostatnie słowo — model jednego właściciela (BDFL), ten sam, który przez lata niósł Linuksa, Pythona i SQLite. Mówimy to wprost, bo udawanie demokracji, gdy decyduje jedna osoba, to wersja nieuczciwa. Społeczność **buduje** i jest **kredytowana** w jawnym ledgerze ([`REALM.md`](./REALM.md)).

- **Forkuj RAK-a swojego kraju.** Polski węzeł zostaje przy swoim maintainerze. **OS jest MIT** — postaw własnego, krajowego RAK-a, za darmo, na zawsze. Format i marka-pochodzenia zostają suwerenne, więc dobra wspólnego nie da się przejąć przez przejęcie jednej osoby. `npx create-rak-agent`, by budować na nim; postaw węzeł, by nim zostać.

- **Zbudowane na pewnym silniku.** RAK działa na [Open Mercato](https://github.com/open-mercato/open-mercato) — otwartym runtime, którego nie musieliśmy wymyślać. Jesteśmy uczciwi co do stacku: trwałość bierze się z nudnych, sprawdzalnych fundamentów, nie z magii.

- **Ku krawędzi.** Kierunek to decentralizacja i portowalność — tożsamość, którą wyeksportujesz, treść, która przeżyje dowolny pojedynczy host. Część już działa (`wallet.json`); część jest eksperymentalna i tak oznaczona. Nie obiecujemy tokena i nie sprzedajemy monety.

## Czego nigdy nie zrobimy

- Nie wpleciemy backdoora skanującego w czytelnika, na żądanie żadnego rządu.
- Nie sprzedamy dobra wspólnego holdingowi medialnemu ani nie pozwolimy nikomu posiąść formatu.
- Nie weźmiemy pieniędzy, które przychodzą z kontrolą nad roadmapą.
- Nie złamiemy specyfikacji po cichu. Narzędzia wygaszamy z oknem, nigdy nie wyrywamy.
- Nie postawimy twierdzeń, których nie obronimy w kodzie — żadnego „nie do zbanowania", „nigdy żadnych logów", „nie do ocenzurowania".

## O co prosimy

Sprawdź nasze twierdzenia w kodzie — to repo jest dokumentem postawy. Zbuduj agenta na RAK. Postaw węzeł dla swojego kraju. Cytuj twórców, których czytasz. Kredyt narasta jawnie ([`REALM.md`](./REALM.md)); wizja zostaje przy Koronie.

---

*Ufaj formatowi, nie właścicielowi.*
**— Hei33enberg, 2026.**
