1. INSTALLER REDUX OG ANDRE PAKKER
----------------------------------

pakker:
redux - selve biblioteket
react-redux - hjelpebibliotek  for react
redux-devtools-extensions - debugging i browser
reduxt-thunk - Tillater asynkrone kall (promises)

I tillegg ligger det inne 
MSW - for mock  av backend  rest
Faker - for generering av  fake data


2. AKTIVER REDUX
----------------
Katalogen reduxstore inneholder to filer:
createstore.js - oppretter redux store og kobler på middleware, 
    merk bruk av composeWithDevTools, som gjør det mulig å bruke 
    browser extension "redux-devtools"
index.js - Kobler sammen alle reducerene du lager

i rot filen /index.js der react App componenten settes opp, må du importere 
Provider - gjør redux tigljengelig i applikasjonen
Createstore (som du laget i /reduxstore/index.js) som er parameter  inn i provideren.


3. BRUKE REDUX I EN component
-----------------------------
Importer redux:

  import { useSelector, useDispatch } from 'react-redux'

Så må vi aktivere state og dispatcher funksjonen, merk at de kan ha andre navn,
det kan hende du har flere states inni en component.  Migrerer du fra usestate, er kanksje 
dispatch navnet opptatt...

  const state = useSelector(state => state.products)
                                     **************
  const dispatch = useDispatch()

I JSX kan du nå bruke state
  
  ...
  <span>{state.firstName}, {state.lastName}</span>
  ...


4. LAG EN NY ACTION/REDUCER TIL REDUX STOREN DIN
------------------------------------------------
a) Lag deg en ...Actions.js file med det du trenger, husk at constantene må være unike for hele systemet.
b) Lag deg en ...Reducer.js file med reducerfunksjonen. 
   Importer de unike konstantene dine
   Lag en initiell state
c) I reduxStore katalogen din, rediger index.js og legg til den nye reduceren din

    const allReducersCombined = combineReducers({  
        products: productListReducer,
        ********
        ...... andre reducere ......
    })



5. HVA KOMMER DU TIL Å KLUSSE TIL OG BRUKE MYE TID PÅ Å FIKSE?
--------------------------------------------------------------
I reducerfunksjonen må du ikke mutere, men bruke spread operatoren.
Når du kopierer og paster er det fort gjort å glemme forskjellen på 
  objekt - {...action.payload}
  array - [...action.payload]

Så dobbellsjekk dette ALLTID!!!

Så er det også viktig å huske at spread operatoren har begrenset dybde når den kloner et objekt.
Spør Christian Uchermann :-)

Husk at når du sender noe en action til reducerne, vil alle reducerfunksjonene få anledning til å plukke den opp,
derfor må disse ALLTID VÆRE UNIKE
