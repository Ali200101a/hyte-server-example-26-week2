```md
# Ohjelmistotestaus – dokumentaatio

## Tehtävä 1 – Testaustyökalujen asennus

Tässä tehtävässä asensin ohjelmistotestauksen työkalut omaan kehitysympäristööni.

### Asennetut työkalut

- Robot Framework
- Browser Library
- RequestsLibrary
- CryptoLibrary
- Robotidy

### Asennuskomennot

```bash
python -m pip install robotframework
python -m pip install robotframework-browser
python -m pip install robotframework-requests
python -m pip install robotframework-crypto
python -m pip install robotframework-tidy
```

### Versioiden tarkistus

Robot Frameworkin asennus voidaan varmistaa seuraavalla komennolla:

```bash
python -m robot --version
```

---

## Havainnot

Asennuksen jälkeen huomattiin, että `robot`-komento ei toiminut suoraan terminaalissa PATH-ympäristömuuttujan puuttumisen vuoksi. Komento `robot --version` tuotti virheen, koska Robot Frameworkin suoritettavaa tiedostoa ei löydetty järjestelmän hakupoluista.

Ongelma ratkaistiin käyttämällä Pythonin `-m`-lippua, joka ajaa moduulin suoraan Python-tulkin kautta:

```bash
python -m robot --version
```

Tämä tapa toimii aina, kun Robot Framework on asennettu käytössä olevaan Python-ympäristöön, riippumatta PATH-asetuksista.

---

## Projektirakenne

Projekti on jäsennelty selkeästi testauksen kannalta olennaisiin kansioihin:

| Kansio | Tarkoitus |
|--------|-----------|
| `tests/` | Sisältää kaikki testitapaukset Robot Framework -muodossa (`.robot`-tiedostot) |
| `outputs/` | Sisältää testiajojen tuottamat raportit ja lokitiedostot (`report.html`, `log.html`, `output.xml`) |

Testitapaukset kirjoitetaan `tests/`-kansioon ja testiraportit tallentuvat automaattisesti `outputs/`-kansioon testiajon jälkeen.

---

## Yhteenveto

Testausympäristön asennus ja konfigurointi onnistui kokonaisuudessaan. Seuraavat asiat on suoritettu:

- Robot Framework ja tarvittavat kirjastot on asennettu onnistuneesti
- Asennuksen toimivuus on varmistettu `python -m robot --version` -komennolla
- PATH-ongelma on tunnistettu ja dokumentoitu
- Projektirakenne on selkeä ja testausvalmiudessa

Dokumentaatio on tallennettu ja viety GitHubiin osana kurssin palautusta.```