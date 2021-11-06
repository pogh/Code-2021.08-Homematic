!----------------------------------------------------------------------------- !
    !WebService

string stdout;
string stderr;
string url = "https://api.openweathermap.org/data/2.5/onecall?lat=52.5220&lon=13.4133&mode=json&units=metric&exclude=current,daily,minutely&appid=" # dom.GetObject("OpenWeatherMapApiKey").Value();

system.Exec("wget -q --no-check-certificate -O - '" # url # "' ", & stdout, & stderr);

!----------------------------------------------------------------------------- !

    real realValue;
integer integerValue;

real min = 99.9;
real max = 00.0;
real dewPoint = 0.0;
integer id = 0;
integer icon = 0;

string minString;
string maxString;
string dewPointString;
string iconString;
integer clearSkyIconCount = 0;
integer cloudIconCount = 0;

string tagName;
integer tagNameLength;
string tagValue;

!----------------------------------------------------------------------------- !

if (stdout.Length() > 0) {
integer i = 0;
    while (i < 12) {
        i = i + 1;

        tagName = "temp";
        tagNameLength = tagName.Length();

        stdout = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
        tagValue = stdout.Substr(0, stdout.Find(","));
        tagValue = tagValue.Substr(tagNameLength + 3);

        !WriteLine(i # " temp: " # tagValue);

        realValue = tagValue.ToFloat().Round(0);

        if (realValue < min) {
            min = realValue;
            minString = min.ToString();
            minString = minString.Substr(0, minString.Find("."));
        }

        if (realValue > max) {
            max = realValue;
            maxString = max.ToString();
            maxString = maxString.Substr(0, maxString.Find("."));
        }

        ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !

            tagName = "dew_point";
        tagNameLength = tagName.Length();

        stdout = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
        tagValue = stdout.Substr(0, stdout.Find(","));
        tagValue = tagValue.Substr(tagNameLength + 3);

        !WriteLine(i # " dew_point: " # tagValue);

        realValue = tagValue.ToFloat();

        if (realValue > dewPoint) {
            dewPoint = realValue;
            dewPointString = tagValue;
        }

        ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !

            tagName = "id";
        tagNameLength = tagName.Length();

        stdout = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
        tagValue = stdout.Substr(0, stdout.Find(","));
        tagValue = tagValue.Substr(tagNameLength + 3);

        !WriteLine(i # " id: " # tagValue);

        id = tagValue.Substr(0, 3).ToInteger();

        ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !

            tagName = "icon";
        tagNameLength = tagName.Length();

        stdout = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
        tagValue = stdout.Substr(0, stdout.Find(",") - 2);
        tagValue = tagValue.Substr(tagNameLength + 3);
        tagValue = tagValue.Substr(1, tagValue.Length() - 2);

        !WriteLine(i # " icon: " # tagValue);

        integerValue = tagValue.Substr(0, 2).ToInteger();

        !Change 'broken clouds: 51%-84%' icon to 'scattered clouds' icon
        if (id == 803) {
            integerValue = 3;
            iconString = "03x";
        }

        if (integerValue < 4) {
            clearSkyIconCount = clearSkyIconCount + 1;
        }

        if (integerValue == 4) {
            cloudIconCount = cloudIconCount + 1;
        }

        if (integerValue > icon) {
            icon = integerValue;
            iconString = tagValue;
        }
    }

    !----------------------------------------------------------------------------- !

if ((iconString.Substr(0, 2).ToInteger() <= 4)
        && (clearSkyIconCount > 0)
        && (cloudIconCount > 0)) {
        iconString = "03x";
    }

    !----------------------------------------------------------------------------- !

        tagName = "alerts";

    if (stdout.Find("\"" + tagName + "\":") > -1) {
        stdout = stdout.Substr(stdout.Find("\"" + tagName + "\":"));

        tagName = "event";
        tagNameLength = tagName.Length();

        stdout = stdout.Substr(stdout.Find("\"" + tagName + "\":"));
        tagValue = stdout.Substr(1, stdout.Find(",\"") - 2);
        tagValue = tagValue.Substr(tagNameLength + 3);

        dom.GetObject("WetterAlert").State(tagValue);
        WriteLine("Alert: " # tagValue);
    }
    else {
        dom.GetObject("WetterAlert").State("");
    }

    !----------------------------------------------------------------------------- !

        dom.GetObject("WetterTempMin").State(minString + dom.GetObject("Gradzeichen").Value() + "C");
    dom.GetObject("WetterTempMax").State(maxString + dom.GetObject("Gradzeichen").Value() + "C");
    dom.GetObject("WetterTempDewPoint").State(dewPointString);
    dom.GetObject("WetterIcon").State(iconString);

    !----------------------------------------------------------------------------- !
        !Debug

    WriteLine("Min: " # dom.GetObject("WetterTempMin").Value());
    WriteLine("Max: " # dom.GetObject("WetterTempMax").Value());
    WriteLine("Dew Point: " # dom.GetObject("WetterTempDewPoint").Value());
    WriteLine("Icon: " # dom.GetObject("WetterIcon").Value());
}