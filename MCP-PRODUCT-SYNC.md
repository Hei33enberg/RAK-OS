# RAK-MCP ↔ Produkt — strategia synchronizacji (jak nad tym zapanować)

> **Problem (po ludzku):** RAK-MCP to osobny, publiczny protokół (`@rak/mcp`, narzędzia `rak_<moduł>_<op>`)
> który opakowuje API produktu (rak.ad). Produkt zmienia się codziennie (reader, narzędzia IDE/Stanowski,
> endpointy API, schematy). Bez procesu MCP **po cichu się rozjeżdża z produktem** → agenci/klienci
> dostają martwe albo błędne narzędzia, a nikt tego nie zauważa aż ktoś się poskarży.
>
> **Cel:** każda globalna zmiana produktu, która dotyka powierzchni MCP, jest **wykryta automatycznie**,
> a aktualizacja MCP jest w większości **wygenerowana, nie pisana ręcznie**.

---

## 0. Stan na dziś (fakty)

- **Powierzchnia MCP:** ~61 narzędzi `rak_*` (content, research, write, media, qa, rag, owned, crawl,
  distribution, meta) — patrz [SPEC.md](./SPEC.md) §7 (tabela namespace).
- **Transport:** `@rak/mcp` = proxy. Konfiguracja: `RAK_BASE_URL=https://rak.ad` + `RAK_API_KEY` + `RAK_TENANT_ID`.
  Czyli **każde narzędzie woła endpoint rak.ad**. Zmiana endpointu = potencjalnie zepsute narzędzie.
- **Druga powierzchnia (ryzyko duplikacji):** IDE/Stanowski ma własne narzędzia `creator.*`
  (`defineAiTool` w `rak-runtime`, packs research/write/media — robione przez CTO#2). To **równoległa
  powierzchnia** nad tymi samymi możliwościami co `rak_research_*` / `rak_write_*` / `rak_media_*` w MCP.
  Dziś utrzymywane **ręcznie, osobno** → główne źródło rozjazdu.
- **Brak dziś:** SSOT kontraktu narzędzi, bramki CI wykrywającej rozjazd, smoke-testów MCP na żywym API.

## 1. Gdzie powstaje rozjazd (5 wymiarów)

1. **Endpoint API** zmienia ścieżkę/parametry/odpowiedź → wrapper MCP woła w próżnię.
2. **Schemat** (kształt RAK Content Object / inputy narzędzia) się zmienia → walidacja/parse pada.
3. **Powierzchnia narzędzi** rośnie/maleje (CTO#2 dodaje narzędzie w IDE) → MCP go nie ma (luka) albo ma stare.
4. **SPEC.md** (publiczny protokół) przestaje opisywać to, co MCP realnie wystawia.
5. **Auth/limity/plany** się zmieniają (F2 gating, subskrypcje) → MCP nie egzekwuje tego samego.

## 2. Docelowa architektura (SSOT → codegen → bramki)

```
   [ SSOT: rejestr narzędzi w produkcie ]         <-- jedno miejsce prawdy
   (defineAiTool + OpenAPI rak.ad /api/docs/openapi)
                  |
                  | (1) codegen
                  v
   [ tools.manifest.json ]  --(2) generuje-->  [ @rak/mcp wrappery + SPEC.md §7 ]
                  |
                  | (3) CI drift-gate (porównuje manifest vs MCP vs SPEC)
                  | (4) nightly smoke-test (woła każde narzędzie na żywym rak.ad)
                  v
            FAIL → auto-PR na RAK-MCP / issue
```

**Zasada nadrzędna:** narzędzie definiowane jest **RAZ** (w rejestrze produktu), a obie powierzchnie
(IDE `creator.*` i MCP `rak_*`) są z niego **generowane**. Koniec ręcznego dublowania.

## 3. Zadania (kolejność wdrożenia)

### M1 — Manifest jako SSOT (fundament)
- [ ] W produkcie: ekspozycja maszynowego manifestu narzędzi pod `GET /api/mcp/manifest`
      (lista `rak_<module>_<op>` → {endpoint, input schema (zod→json-schema), output, plan/feature, deprecated}).
      Źródło: rejestr `defineAiTool` + mapowanie na publiczne nazwy `rak_*`.
- [ ] Wersjonowanie: `rak_version` (SPEC §3) + `manifest_revision` (hash). Zmiana = bump + changelog.

### M2 — Codegen MCP z manifestu
- [ ] Skrypt `generate` w RAK-MCP: pobiera `/api/mcp/manifest` → generuje wrappery narzędzi + tabelę
      namespace w SPEC.md + `server.json`. Ręczne edycje tylko w warstwie prezentacji/opisów.
- [ ] `npm run check:spec` — SPEC.md §7 musi == manifest (inaczej fail).

### M3 — Bramka CI rozjazdu (to jest „automatyczne wykrywanie")
- [ ] GitHub Action w **RAK** i **RAK-IDE**: na każdym PR dotykającym narzędzi/endpointów →
      odpal codegen na sucho → jeśli wynik ≠ aktualny RAK-MCP → **komentarz/issue „MCP drift"**
      + (opcjonalnie) auto-PR na RAK-MCP z wygenerowaną zmianą.
- [ ] GitHub Action w **RAK-MCP**: na PR → `check:spec` + walidacja manifestu (musi się rozwiązać z prod).

### M4 — Smoke-test na żywym API (łapie rozjazd runtime)
- [ ] Nightly cron: dla każdego `rak_*` wywołanie kontraktowe na `rak.ad` testowym kluczem
      (read-only / sandbox tenant) → asercja kształtu odpowiedzi. Fail → alert (mail/IRC) + issue.
- [ ] Pokrywa przypadki, których statyczny kontrakt nie złapie (endpoint przeniesiony, 500, zmiana auth).

### M5 — Unifikacja dwóch powierzchni (likwidacja źródła rozjazdu #3)
- [ ] IDE `creator.*` i MCP `rak_*` generowane z **tego samego** rejestru (różnią się tylko namespace
      + transportem). Gdy CTO#2 doda narzędzie w IDE → pojawia się w manifeście → codegen → auto-PR MCP.
- [ ] Mapowanie nazw: `creator.draft_article` ↔ `rak_write_draft` w jednym pliku-mapie.

## 4. Definicja „gotowe" (jak poznasz że zapanowane)

- Dodanie/zmiana narzędzia w IDE **nie wymaga** ręcznego dotykania RAK-MCP — wpada auto-PR.
- PR w produkcie, który zepsułby MCP, **nie przejdzie CI** (drift-gate) bez świadomej zmiany MCP.
- Nightly smoke-test zielony = każde publiczne `rak_*` realnie działa na rak.ad.
- SPEC.md zawsze == realna powierzchnia (gwarantowane `check:spec`).

## 5. Właściciel / tempo

- Domena: **MCP epic (LINEAR-3596)**. Wdrażać po B3 (gdy rejestr narzędzi produktu się ustabilizuje —
  inaczej generujemy z ruchomego celu). M1+M3 dają 80% wartości (SSOT + wykrywanie rozjazdu); M4/M5 potem.
- Do tego czasu **ręczny checkpoint:** przy każdym merge'u zmieniającym narzędzia/endpointy — pozycja
  „zaktualizować RAK-MCP?" w opisie PR (lekka proteza zanim M3 zautomatyzuje).
