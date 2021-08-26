string stdout;
string stderr;
string url = "https://www.berlin.de/wetter/";

system.Exec("wget -q --no-check-certificate -O - '" # url # "' ", &stdout, &stderr);

stdout = stdout.Substr(stdout.Find("Temperaturen:") + 35);
stdout = stdout.Substr(0, stdout.Find("</span>"));

string firstTemp = stdout.Substr(0, stdout.Find("Â°C"));
stdout = stdout.Substr(stdout.Find("Â°C") + 6);
string secondTemp = stdout.Substr(0, stdout.Find("Â°C"));

string tempHeute = system.Date("%a").Substr(0, 2) + " " +firstTemp + dom.GetObject("Gradzeichen").Value() + "C / " + secondTemp + dom.GetObject("Gradzeichen").Value() + "C";

dom.GetObject("TemperaturenHeute").State(tempHeute);

system.Exec("/bin/sleep 10", &stdout, &stderr);
dom.GetObject("Wandtaster - Zeile 2").ProgramExecute();