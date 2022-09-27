# Homematic IP CCU3

Here are the programs I have on my Homematic IP CCU3.  A great home automation system that’s hobbled by terrible documentation (where it exists at all) and a questionable script language.  

Many thanks to the active posters on https://homematic-forum.de otherwise none of this would be posible.  There are plenty of script examples to get you going there.

## Programs

* **CCU3 LED**: Lights the annoyingly bright LED in the CCU3 when the system variable ```AnzahlNiedrigeBatterien``` is non-zero.
* **Startup**: Updates ```Systemvariabel - Wetter Heute``` 10 minutes after startup (to allow time for the firewall to come on line).

## Programs for the Button with E-Paper Status Display (HmIP-WRCD) 

* **Wandtaster - Zeile 2:** Displays the content of the sytem variables ```WetterTempMin```, ```WetterTempMax```, ```WetterTempDewPoint``` and ```WetterIcon```.
* **Wandtaster - Zeile 3:** Displays the content of the system variable ```IstTemperatur``` and a ‘Window Open’ icon if the system variable ```FensterOffen``` is true.
* **Wandtaster - Zeile 3:** Display a ‘Warning‘ icon if the system variable ```AnzahlNiedrigeBatterien``` is non-zero, otherwise display text if the system variable ```BalkontürOffen``` is true.  

## System Variables

* **AnzahlNiedrigeBatterien**: Count of devices with a low battery warning
* **BalkontürOffen**: Whether the balcony door is open
* **FensterOffen**: Whether any window is open
* **Gradzeichen**: A work around because the CCU3 frontend can’t save the degree symbol.  (Use this in string concatination)
* **HeizungAn**: Whether any of the thermostats are active.
* **IstTemperatur**: The average of all thermostats’ current temperature
* **WetterTempMin**, **WetterTempMax**, **WetterTempDewPoint** and **WetterIcon** are populated from the OpenWeatherMap API
