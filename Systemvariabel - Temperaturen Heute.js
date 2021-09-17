!-----------------------------------------------------------------------------!
! Debug

dom.GetObject("WetterTempMin").State("");
dom.GetObject("WetterTempMax").State("");
dom.GetObject("WetterTempDewPoint").State(0);
dom.GetObject("WetterIcon").State("");

!-----------------------------------------------------------------------------!
! WebService

string stdout;
string stderr;
string url = "https://api.openweathermap.org/data/2.5/onecall?lat=52.5220&lon=13.4133&mode=json&units=metric&exclude=current,minutely,hourly,alerts&appid=" # dom.GetObject("OpenWeatherMapApiKey").Value();

system.Exec("wget -q --no-check-certificate -O - '" # url # "' ", &stdout, &stderr);

!-----------------------------------------------------------------------------!

string minString;
string maxString;
string dewPointString;
string iconString;

string tagName;
integer tagNameLength;
string tagValue;

real r;

!-----------------------------------------------------------------------------!
! Min 

tagName = "min";
tagNameLength = tagName.Length();

tagValue = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
tagValue = tagValue.Substr(0, tagValue.Find(","));
tagValue = tagValue.Substr(tagNameLength + 3);

minString = tagValue;
WriteLine("Min: " # minString);

r = minString.ToFloat();
r = r.Round(0);
minString = r.ToString();
minString = minString.Substr(0, minString.Find("."));

dom.GetObject("WetterTempMin").State(minString + dom.GetObject("Gradzeichen").Value() + "C");

WriteLine("Min: " # minString);

!-----------------------------------------------------------------------------!
! Max

tagName = "max";
tagNameLength = tagName.Length();

tagValue = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
tagValue = tagValue.Substr(0, tagValue.Find(","));
tagValue = tagValue.Substr(tagNameLength + 3);

maxString = tagValue;
WriteLine("Max: " # maxString);

r = maxString.ToFloat();
r = r.Round(0);
maxString = r.ToString();
maxString = maxString.Substr(0, maxString.Find("."));

dom.GetObject("WetterTempMax").State(maxString  + dom.GetObject("Gradzeichen").Value() + "C");

WriteLine("Max: " # maxString);

!-----------------------------------------------------------------------------!
! Dew Point

tagName = "dew_point";
tagNameLength = tagName.Length();

tagValue = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
tagValue = tagValue.Substr(0, tagValue.Find(","));
tagValue = tagValue.Substr(tagNameLength + 3);

dewPointString = tagValue;
WriteLine("Dew Point: " # dewPointString);

dom.GetObject("WetterTempDewPoint").State(dewPointString);

!-----------------------------------------------------------------------------!
! Icon

tagName = "icon";
tagNameLength = tagName.Length();

tagValue = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
tagValue = tagValue.Substr(0, tagValue.Find(",") - 2);
tagValue = tagValue.Substr(tagNameLength + 3);
tagValue = tagValue.Substr(1, tagValue.Length() - 2);

iconString = tagValue;
dom.GetObject("WetterIcon").State(iconString);

WriteLine("Icon: " # iconString);


!-----------------------------------------------------------------------------!
! Debug

WriteLine(dom.GetObject("WetterTempMin").Value());
WriteLine(dom.GetObject("WetterTempMax").Value());
WriteLine(dom.GetObject("WetterTempDewPoint").Value());
WriteLine(dom.GetObject("WetterIcon").Value());