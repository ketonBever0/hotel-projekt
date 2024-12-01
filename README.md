# Szalloda

###### SZTE TTIK Adatbázisok projekt

### Használati útmutató

#### Előkövetelmények

- Fusson a gépen egy MySQL szerver, amiben legyen egy felhasználó legalább SELECT, INSERT, UPDATE és DELETE jogokkal.
- Legyen telepítve [NodeJS](https://nodejs.org/en) a gépre.

#### Futtatás

1. Csináljunk egy adatbázist pl. `szalloda` néven, majd importáljuk be a `docs`-ban található `szalloda.sql` fájlt.
2. Nyissunk terminált a projekt gyökérmappájában (fejlesztői környezetbeni terminál is jó).
3. Írjuk be az `npm i` parancsot, ez feltelepíti a `package.json` fájlban található modulokat.
4. Ha még nincs `.env` fájl, csináljuk meg a projekt gyökérmappájában, amibe a következő környezeti változók kellenek:
    - DB_HOST: adatbázis hostja, esetünkben lehet `"localhost"` (fájlban: `DB_HOST = "localhost"`)
    - DB_NAME: adatbázis neve, esetünkben lehet `"szalloda"`
    - DB_USER: Az előbb elkészített felhasználó neve
    - DB_PASSWORD: Jelszava
    - JWT_SECRET: Token generáláshoz és hitelesítéshez használt kulcs, bármilyen nem üres string lehet az értéke
    - APP_HOST: Az alkalmazásunk hostja, esetünkben lehet `"http://localhost:3000"`
5. Indítsuk el a buildelt alkalmazást az `npm run start` paranccsal
    - Ha nincs build, akkor `npm run dev`, vagy `npm run build` után az előbbi parancs
    - Ha a 3000-es port foglalt, akkor a `npm run dev` vagy `npm run start` parancs után szóköz, majd írjuk a következőt: `-- -p (port)`, ahol a `(port)` az általunk választott port száma (pl. 3333)
        - Ekkor ne felejtsük el átírni az APP_HOST környezeti változóban szereplő 3000-es portot az általunk választottra

6. Próbáljuk ki a webapp egyes funkcióit.
    - Példa dolgozó:
        - username: test_user_1
        - jelszava: 123QWE#asd
