REDUX SESJON to
***************

Nå skal vi se på en applikasjon som ligner mer på noe man vil ha i produksjon.
Vi har et filter i header som påvirker andre komponenter.

Vi har et forms bibliotek med state, validering etc.

Oppgave en. (oppvarming)
------------------------
Se på CustomersListContainer.  Det er en container som skal liste alle produkter.
Den henter  date i fetchCustomers, og setter disse i local state.

Det er allerede laget en reducer som kan håndtere state for denne, se i reducerkatalogen
customerList.  Der ligger det allerede en action som gjør det samme som fetchCustomer, 
dvs henter data og ligger disse i state.

ALt du trenger å gjøre er å convertere denne klassen til å bruke REDUX state som er ferdig 
laget for deg.  Du må endre getItems funksjonen slik at den kjører en map på dat fra filteret.


Oppgave to. (nå er vi varm)
---------------------------
Implementere en filterfunksjon, der man har en input control i header (AppmMenu.js).
Denne må ha en state, så du må lage en ny reducer for denne.  Den må hente
verdi fra den nye redux staten, og på onChange må den sette state.

  - Du må lage en ny store (dvs både reducer og actions) for filter (filene ligger klare)
  - Dette er ekstremt enkelt, fordi det ikke er asynkront...
    Jeg gjentar dette er ekstremt enkelt, du tenker for komplisert!
    4 linjer i action og 20 linjer i reducer skal holde.....
  - Begynn med en hardkodet filter variant i default i storen


Oppgave tre. (da er vi i gang!)
-------------------------------
Da skal vi bruke filteret i CustomerListContainer.  Det skal fungere slik at om 
filteret er ulikt "", så skal du filtrere data.  Du må endre i funksjonen getItems  igjen, 
se på koden som er kommentert ut fo hvordan du kan bruke em map funksjon på data fra state.


Oppgave tre (ekstraoppgave)
---------------------------
Hva med å implementere filter i productslist containeren?


Oppgave 4. (for dem med hår på brystet)
---------------------------------------
Dersom du kan så mye REDUX at du synes de tre første oppgavene er plankekjøring kan du begynne med
denne.

Se på customerEditContaineren.  Det er et bilde for å registrere/endre på en customer record.
Den henter allerede data fra Rexux. 

Bildet bruker et formsbibliotek som er laget for anledningen (useUcForm), og her er det arbeidet 
skal gjøres.

Her er det state på flere verdier:
    - formState        - Har verdien av feltene
    - formFields       - Har properties på feltene
    - errMess          - Har array med feilmeldinger 
    - isDirty          - formen er redigert, save skal være tigljengelig
    - formErrorMessage - en meldingstekst som skal vises dersom formen ikke validerer    
    - formMessage      - en meldingstekst som vises etter form er lagret, men forsvinner når det skjer redigering

Du må ha en reducer for å lagre disse verdiene.  Du kan lagre alle disse (og mere til)
i en reducer, du trenger ikke flere reducere.  For å gjøre det enkelt for deg er dette arbeidet allerede
påbegynt.

Anbefalt fremgangsmåte:
Lag til action for å sette en av overnevnte, begynn med formstate.  Så setter du verdien i både 
localstate og formstate, da har du kontroll.  Deretter kan du ta formFields.  Nå kan du gå over
til å hente data fra redux istedenfor localstate.

    - Hvordan kan vi lage reduceren slik at vi kan håndtere flere forms i en a
      applikasjon?
    - Hvordan kan vi håndtere flere forms, ved bruk av local state
    - Hva er fordelene og ulempene ved å bruke redux til form?
    - Her er det masse godt arbeid du kan gjøre, og du vil få 
      et super forms bibliotek som du kan utvide....

** SNUBLEFELLE **
Når du kommer i gang med denne så vil du merke at spread operatoren ikke kloner dypt.  
Spread operatoren kloner ikke subobjekter(dvs arrays eller objekter, fordi det er                                    │
pekere som ligger i objektet.  Har du bruk for å kopiere dypt, kan du bruke Rambda biblioteket,                                                     │
 
npm install--save Rambda               (!allerede gjort)                                                                                │
│                                                                                                                      │
import * as R from 'rambda'     
..
..                                                                                     │
cloned_A = R.clone(a)                                                                                                │
 │                                                                                                                      │
Da har du fått klonet dypt, bruk dette i reduceren.   


Hvordan virker filteret: 
----------------------- 
    Se i FakeDataGenerator filen. Der genereres det data som benyttes 
    av mockingen av rest apiet.
    Property searchField inneholder alle feltene til uppercase og 
    conkatenert med en separator.  Dermed kan du sjekke om en rad inneholder
    filterverdien din (i upperCase selvsagt), og dermed får du søkt over flere
    felter i en smell.  MERK: det er ikke alltid man ønsker alle feltene inn 
    i searchField, noen ganger vil man ha færre, andre ganger vil man kanskje
    ha flere searchFields.


En oppsummering av redux:
-------------------------

    - Lag en actions file
      > Den har konstaner som exporteres
      > Den har actions som exporteres og kalles i en dispatcher funksjon i en metode
      > Under reduxstore katalogen finner du en index.js file som aktiverer alle 
        dine redux stores
    
    - I component som skal bruke redux store må du først importere redux
        import { useSelector, useDispatch } from 'react-redux'
    - Deretter må du aktivere storen ved hjelp av en useSelector kommando:
        const filterState = useSelector(state => state.filter)
      her må navnet (state.filter) stemme overens med det du kalte det i index.js
    - Nå kan du bruke state i komponenten
    - Får å endre state må du distpatche en action
        dispatch(fetchCustomers())
      Action skal gjøre noe og så endre state

    Snublefelle:  Det du henter ut av state er det 
      et objekt: {}
      en Array: []
      eller bare en streng: ''
    Vær konsistent i både initialisering og setting av state, vanligste feilen å gjøre...



