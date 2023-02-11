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

## Demo

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

## Testen der Anwendung

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
noch nicht implementiert


## Abhängigkeiten


### Frontend
npm-packages:
- @ngageoint/leaflet-geopackage: ^4.1.3
- bootstrap: ^5.2.2
- bootstrap-icons: ^1.10.2
- cookie-parser: ~1.4.4
- cors: ^2.8.5
- darkmode-js: ^1.5.7
- debug: ~2.6.9
- express: ~4.16.1
- express-zip: ^3.0.0
- form-data: ^4.0.0
- formidable: ^2.1.1
- http-errors: ~1.6.3
- leaflet: ^1.9.2
- leaflet-draw: ^1.0.4
- morgan: "~1.9.1
- multer: ^1.4.5-lts.1
- node-fetch: ^2.6.7
- pug: ^3.0.2
- r-integration: ^2.4.0


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


