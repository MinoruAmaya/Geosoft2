# AtlantGIS GmbH

Hier entsteht in Zusammenarbeit von den vier Studierenden Maximilian Elfers, Hendrik Lüning, Maike Schröder und Derya Sen das Projekt für den Kurs Geosoftware 2 an der Westfälischen Wilhelms-Universität Münster.

### Worum geht es in dem Projekt?
Bereitstellung einer App mit Tools zur Sammlung von Trainingsdaten, dem Trainieren von Modellen und Erstellung von Klassifikationen unter Bewertung durch das räumliche Analyse Tool "Area of Applicability (AOA)".

### Ziel des Projekts
Ziel ist es, anhand der AOA die Übereinstimmung/Anwendbarkeit eines Modells in Bezug auf die Klassifikation auf eine bestimmte Region zu überprüfen. Falls die Bewertung durch die AOA schlecht ausfällt, werden neue Orte vorgeschlagen, an denen es sinnvoll ist, noch einmal Trainingsdaten zu sammeln. Die Anwendung der AOA wird für die AnwenderInnen erleichtert, indem sie nur mit einem Klick auf einen Button die Berechnung ausführen lassen, ohne sich Gedanken um die Funktionsweise zu machen.  
### Zielgruppe
Zielgruppe(n) sind ForscherInnen oder PraktikantInnen im Bereich der Fernerkundung/räumlichen Modellierung, die mit Hilfe vom Maschinellen Lernen Landnutzungsklassifikationen durchführen möchten. Sie beziehen sich dabei hauptsächlich auf Sentinel-2 Daten und haben bereits Erfahrungen in Bezug auf die Anwendung und das Training mit Maschinellem Lernen. Sie sind nicht in der Lage bzw. haben nicht die Bereitschaft, sich mit der Umsetzung/Anwendung oder der Berechnung der AOA auseinanderzusetzen. Diese möchten sie nur ausführen können. Sie sind an großen Kartierungs-/Modellierungsanwendungen interessiert, besitzen aber nicht die nötige Hardwarekomponente, um Maschinelles Lernen oder die Berechnung der AOA durchzuführen.  


### Funktionsweise der App (Demo Bilder einfügen und paar Sätze)

### Installation der App
Um unser Tool zu nutzen, wurde eine möglichst unkomplizierte Bereitstellung des nötigen Codes über Docker und seine docker-compose Umgebung verwendet.
Die einzig notwendigen Schritte sind, dieses Repository herunterzuladen mit git clone "link" und dann den Befehl docker-compose up --build in das Terminal einzugeben. \n
Dadurch werden die images für das backend und das frontend erstellt, was einige Sekunden dauern kann, da alle benötigten Abhängigkeiten, wie zahlreiche R-packages installiert werden. Um das Tool nun auch aufrufen zu können, kann es über http://localhost:3000 angesteuert werden.
