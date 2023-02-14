# Geosoftware2

Hier entsteht in Zusammenarbeit von den vier Studierenden Maximilian Elfers, Hendrik Lüning, Maike Schröder und Derya Sen das Projekt für den Kurs Geosoftware 2 an der Westfälischen Wilhelms-Universität Münster.


# Applicability Estimation Tool for Spatial Prediction Models

## Inhaltsverzeichnis
  - [Autoren](#autoren)
  - [Abstract](#abstract)
  - [Ziel der Anwendung](#ziel)
  - [Zielgruppe](#zielgruppe)
  - [Lexikon](#lexikon)
    - [Satellitenbilder](#satellitenbilder)
    - [Maschinelles Lernen](#maschinelles-Lernen)
    - [Trainingsdaten](#trainingsdaten)
    - [Landnutzungsklassifikation](#landnutzungsklassifikation)
    - [Area of Applicability](#area-of-applicability)
    - [Quellen](#quellen)
  - [Funktionen](#funktionen)
    - [Upload](#upload)
    - [Machine-Learning Algorithmen](#machine-learning-algorithmen)
    - [AOA](#aoa)
    - [Download](#download)
  - [Installation](#installation)
  - [Demo](#demo)
  - [Testen der Anwendung](#test)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Abhängigkeiten](#abhängigkeiten)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Weitere Informationen](#weitere-informationen)
    - [nodeJS](#nodeJS)
    - [express](#express)
  - [License](#license)

## Autoren
[Maximilian Elfers](https://github.com/MaxiElfers),
[Hendrik Lüning](https://github.com/luening),
[Maike Schröder](https://github.com/maschroder),
[Derya Sen](https://github.com/derya-sen),



## Abstract

Machine learning Methoden werden für räumliche Vorhersagen immer beliebter. Dadurch können die immer komplexer werdenden Klassifikationsaufgaben gelöst werden. Ein Problem dabei ist, dass machine learning Algorithmen nur gute Vorhersagen berechnen, wenn die neuen Daten ähnlich zu den trainierten Daten verwendet werden. Sobald ein trainiertes Modell in einem neuen unbekannten geographischen Gebiet angewendet wird, ist nicht klar, ob die Vorhersage valide ist oder nicht. Um das Problem zu lösen, wird die Area of Applicability angewendet. Hier werden Bereiche hervorgehoben, die zusätzliche Trainingsdaten benötigen für eine zuverlässige Klassifikation. 

Das Projekt stellt eine einfache Webumgebung bereit, um die Area of Applicability für ein übergebenes Modell. 

## Ziel

Die AnwenderInnen bekommen eine Bewertungsmöglichkeit für ihre durchgeführten Klassifikationen. Ziel
ist es, anhand der AOA die Übereinstimmung/Anwendbarkeit eines Modells in Bezug auf die
Klassifikation auf eine bestimmte Region zu überprüfen. Falls die Bewertung durch die AOA schlecht
ausfällt, werden neue Orte vorgeschlagen, an denen es sinnvoll ist, noch einmal Trainingsdaten zu
sammeln. Die Anwendung der AOA wird für die AnwenderInnen erleichtert, indem sie nur mit einem
Klick auf einen Button die Berechnung ausführen lassen, ohne sich Gedanken um die Funktionsweise
zu machen

## Zielgruppe

Zielgruppe(n) sind Forscher oder Praktikanten im Bereich der Fernerkundung/räumlichen
Modellierung, die mit Hilfe vom Maschinellen Lernen Landnutzungsklassifikationen durchführen möchten. Vorwissen in den Bereichen Klassifikation und Area of Aplicability sind nützlich, aber nicht notwendig.

## Lexikon

### Satellitenbilder

Satellitenbilder stellen ein zentrales Instrument der Fernerkundung dar und bilden die Grundlage für Datenerfassung, Datenvisualisierung und Analyse. Durch die Etablierung von hochqualitativer Satellitensensoren wird heutzutage eine Bildgebung mit sehr hoher Auflösung ermöglicht. Anwendung findet diese Technologie beispielsweise in der Erkennung von Landnutzungsänderungen, Landwirtschaft oder Katastrophenschutz. Auch das Webtool der AtlantGIS GmbH profitiert von den genauen, zuverlässigen und zeitnahen Daten, die von Sentinel-Satelliten aufgenommen werden.

### Maschinelles Lernen

Maschinelles Lernen ist eine Unterkategorie der künstlichen Intelligenz. Ziel ist es, dass die ausdauernde und schnelle Maschine Muster erkennt und Wissen erwirbt. Dafür arbeiten Entwickler mit Algorithmen und Technologien zur Mustererkennung und die Nutzung zusätzlicher Daten führt dazu, dass die Ergebnisse der Maschine immer präziser werden.

### Trainingsdaten

Im Gegensatz zum unüberwachten Lernen benötigt das Vorgehen des überwachten Lernens Datensätze mit Trainings-, Validierungs- und Testdaten. Damit das Modell des maschinellen Lernens möglichst präzise Ergebnisse liefert, muss dieses mit Trainingsdaten trainiert werden. Ein Trainingsdatensatz ist ein Datensatz, der Beispiele, die für das Lernen der Muster und Zusammenhänge in den Daten verwendet wird, enthält.

### Landnutzungsklassifikation

Landnutzung und -bedeckung sind wichtige Indikatoren für menschengemachte Umweltbelastung. Landnutzungsänderungen können Auswirkungen auf den Klimawandel oder Biodiversität haben. Landnutzngsklassifikation ist eine anspruchsvolle Bildbearbeitung der Fernerkundung, bei der durch eine schematische Klassifizierung die verschiedenen Nutzungsarten (z.B. Land-/Forstwirtschaft, Industrie, Siedlungsfläche, Gewässer, ...) auf einer Karte visualisiert werden können.

### Area of Applicability

Modelle des maschinellen Lernens werden in den Geowissenschaften vor allem auch für die Vorhersage von Ort und Räumen verwendet (s. Landnutzungsklassifikation). Trifft der Algorithmus Aussagen über unbekannt Orte, kann es schnell zu Fehlern kommen. Die Area od Applicability (AOA) bietet hierbei eine Unterstützung zur Beaurteilung, inwiefern die getroffenen Aussagen zuverlässig sind. Mithilfe von Schwellenwerten kann über die Güte der Informationen entschieden werden, ob das aktuelle Modell verwendet werden sollte, oder ob es mit weiteren Trainingsdaten trainiert werden soll, das somit gegebenenfalls ein besseres Ergebnis erzielen könnte. Neben der Abgrenzung eines solchen Bereichs der Anwendbarkeit (AOA) kann dieses Tool auch verwendet werden, um auf Bereiche hinzuweisen, in denen die Sammlung zusätzliche Trainingsdaten erforderlich sind, um ein besser anwendbares Modell zu trainieren.

### Quellen

https://eos.com/de/products/high-resolution-images/ <br>
https://datasolut.com/wiki/trainingsdaten-und-testdaten-machine-learning/ <br>
https://github.com/Geosoft2/geosoft2-2022 <br>
https://www.umweltbundesamt.de/themen/boden-landwirtschaft/flaechensparen-boeden-landschaften-erhalten/corine-land-cover-clc

## Funktionen

### Upload
Das Produkt unterstützt den Upload von Trainingsdaten auf den Server, indem über einen Button auf der Website der Datei-Upload ermöglicht wird. Dabei handelt es sich um Trainingsdaten und Satellitenbilder.
Für diese Uploads werden die folgenden Dateiformate erlaubt sein: GeoJSON, GeoPackage (für
Vektordaten) und GeoTIFF (für Rasterdaten).

### Machine-Learning Algorithmen
Das Produkt wird einen überwachte Klassifikationsalgorithmen zur Verfügung stellen. Bei diesem wird es sich um den “random forest”-Algorithmus handeln.  

### AOA
Zu jeder Klassifikation wird außerdem die AOA berechnet und ausgegeben.

### Download
Für alle erstellten und berechneten Daten gibt es eine Downloadoption in Form eines
Downloadbuttons. Die Vorhersagekarte und die AOA kann man als GeoTIFF herunterladen. Möchte man weitere Trainingsdaten nach Empfehlung der AOA
sammeln, kann man die empfohlenen Standorte durch die AOA als Standard-Vektordatenformat
herunterladen. Man hat auch die Option das Modell, mit dem man das Training durchgeführt hat,
über einen Button herunterzuladen.

## Installation

Die Webanwendung kann ganz einfach durch den Befehl
```
docker compose up 
```
im root-Verzeichnis des Projekts gestartet werden. Das erstmalige Starten kann einige Minuten in Anspruch nehmen, da alle benötigten Abhängigkeiten und Pakete installiert werden müssen. Dafür muss eine Internetverbindung vorhanden sein. 

## Hauptkomponenten unserer App
Unsere App ist in drei Abschnitte gegliedert. Einer Upload-Seite, einer Ergebnis-Seite und einer Bearbeitungsseite. 
<br>

Auf der ersten Seite müssen die nötigen Dateien wie Satellitenbild und Trainingsdaten hochgeladen werden. Ebenfalls muss der Bereich für die Klassifikation ausgewählt werden, den man entweder per Datei-Upload oder durch Einzeichnen in der Karte festlegen kann. Desweiteren braucht man noch ein trainiertes Modell. Hat man ein eigenes trainiertes Modell kann man es wie bei den anderen Daten einfach hochladen, ansonsten wird ein Modell automatisch von der Anwendung trainiert. Anschließend kann die AOA und Klassifikation berechnet werden. 

<img width="623" alt="start1" src="https://user-images.githubusercontent.com/82390935/218565452-9439e726-02dc-465b-9181-523dfb699535.png">

Auf der Ergebnisseite werden die berechnete AOA, die Klassifikation sowie weitere Vorschläge zur Sammlung von Trainingsdaten mit ihren entsprechenden Legenden angezeigt. Ist man bereits an dieser Stelle zufrieden von seiner Klassifikation, besteht die Möglichkeit alle Dateien in ihrem entsprechenden Format herunterzuladen. Möchte man jedoch Verbesserungen vornehmen, kann man diese auf der Bearbeitungsseite durchführen. 

<img width="617" alt="ergebnis1" src="https://user-images.githubusercontent.com/82390935/218565498-253471b6-d60f-4e4a-919d-1d09257b0231.png">

Auf der Bearbeitungsseite besteht die Möglichkeit entweder neue Trainingsdaten hochzuladen oder zu den vorher geladenen Trainingsdaten neue durch Einzeichnen auf der Karte hinzuzufügen. Dabei kann man sich an dem Layer für Vorschläge von weiteren Trainingsdaten orientieren. Ist man mit der Bearbeitung fertig, kann man sich erneut die AOA und Klassifikation berechnen lassen und auf der Ergebnisseite anschauen. 
Dieser Prozess ist iterativ aufgebaut und lässt sich solange wiederholen, bis man mit seiner AOA und Klassifikation zufrieden ist. Sobald man mehr als einmal die AOA berechnet hat, wird der Vergleich der letzten beiden AOA-Berechnungen zur Karte hinzugefügt. 

<img width="671" alt="bearbeitung" src="https://user-images.githubusercontent.com/82390935/218592755-6ad22da0-d454-4e5e-8031-bc1250f4694c.png">

## Demo
Die Demo-Seite dient als Schritt-für-Schritt Anweisung, für Leute ohne Erfahrung bzw. mit wenig Vorkenntnissen oder falls man sich mit der App noch nicht auskennt. Es wurden von uns erstellte Daten hochgeladen, so dass der User nichts weiter machen muss, als den "Legen Sie Los" - Button zu betätigen. Alle Schritte werden mit den Beispieldaten durchlaufen und beinhalten Informationen und Tipps zum Durchlesen auf der linken Seite, die bei der Ausführung wichtig sind.

<img width="941" alt="demo1" src="https://user-images.githubusercontent.com/82390935/218587159-c7e87e68-b551-457e-9682-c2143e457dae.png">
<img width="935" alt="demo2" src="https://user-images.githubusercontent.com/82390935/218588223-0072d20b-9a96-450f-843a-fa1330a5306b.png">




## Testen der Anwendung

### Frontend:

Die Testumgebung für das Frontend wurde mit dem Test-Framework [Jest](#https://jestjs.io/) umgesetzt. Um die Tests auszuführen, müssen Sie mit 
```
cd atlantGIS_app
``` 
in das Frontend Verzeichnis navigieren und mit 
```
npm test
``` 
werden Sie ausgeführt.

### Backend:

Die Testumgebung für das Backend wurde mithilfe von RStudio und dem testthat package aufgesetzt. Um die Funktionen zu testen, müssen die sich im Backend unter plumber befindliche plumber.R und test-plumber.R in RStudio geöffnet werden. Unter Build -> More -> Load All oder mit dem Befehl 
```
devtools::load_all(".") 
```
werden die Funktionen aus dem Skript eingeladen. Im Anschluss können unter Build -> More -> Test Package die Tests durchgeführt und deren Ergebnisse angezeigt werden.


## Abhängigkeiten


### Frontend
dependencies:
- @ngageoint/leaflet-geopackage: ^4.1.3
- bootstrap: ^5.2.2
- bootstrap-icons: ^1.10.2
- cookie-parser: ~1.4.4
- cors: ^2.8.5
- darkmode-js: ^1.5.7
- debug: ~2.6.9
- express: ~4.16.1
- express-zip: ^3.0.0
- http-errors: ~1.6.3
- leaflet: ^1.9.2
- leaflet-draw: ^1.0.4
- morgan: "~1.9.1
- multer: ^1.4.5-lts.1
- node-fetch: ^2.6.7
- pug: ^3.0.2
- utm-latlng: ^1.0.7

devDependencies:
- jest: ^29.4.2,
- supertest: ^6.3.3


### Backend
r-packages:
- plumber
- rjson
- geojson
- geojsonsf
- ggplot2
- dplyr
- lubridate
- hms
- terra
- mapview
- raster
- sf
- sp
- caret
- CAST
- latticeExtra
- viridis

## Weitere Information


### nodeJS
[NodeJS](#https://nodejs.org/en/) ist eine plattformübergreifende Open-Source-JavaScript-Laufzeitumgebung, die JavaScript-Code außerhalb eines Webbrowsers ausführen kann. 

### express
 Express ist ein einfaches und flexibles Node.js-Framework von Webanwendungen, das zahlreiche leistungsfähige Features und Funktionen für Webanwendungen und mobile Anwendungen bereitstellt. (2023 [Express](#http://expressjs.com/de/))

## License
Copyright (C) 2022  Maximilian Elfers, Hendrik Lüning, Maike Schröder, Derya Sen

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.


