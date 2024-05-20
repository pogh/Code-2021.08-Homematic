!----------------------------------------------------------------------------- !
! Icons

! 10 = Sonne
! 11 = Mond
! 12 = Wind
! 13 = Wolke
! 14 = Wolke/Blitz
! 15 = Wolke/leichter Regen
! 16 = Wolke/Mond
! 17 = Wolke/Regen
! 18 = Wolke/Schnee
! 19 = Wolke/Sonne
! 20 = Wolke/Sonne/Regen
! 21 = Wolke/Schneeflocke
! 22 = Wolke/Regentropfen

!----------------------------------------------------------------------------- !
!WebService

string stdout;
string stderr;
string url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&forecast_hours=12&hourly=temperature_2m,dew_point_2m,weather_code&timezone=Europe%2FBerlin";

system.Exec("wget -q --no-check-certificate -O - '" # url # "' ", & stdout, & stderr);

!----------------------------------------------------------------------------- !

real realValue;
integer integerValue;

string values;
string tagName;
integer tagNameLength;
string tagValue;

integer hours_ahead_count = 12;   ! Same as in URL
integer hour = system.Date("%H").ToInteger();
boolean is_night = true;

real temp_min = 99.9;
real temp_max = 00.0;

real first_temp = 99.9;
integer temp_rising_count = 0;
integer temp_falling_count = 0;
boolean wetter_temp_rising = true;

real temp_dew_point = 00.0;

integer weather_code = -1;
string icon;

!------------------------------------------------------------------------------!

if (stdout.Length() > 0) {

    !--------------------------------------------------------------------------!
    ! Min, Max Temps

    integer i = 0;
    tagName = "temperature_2m";
    tagNameLength = tagName.Length();

    values = stdout;
    values = values.Substr(values.Find("\"" + tagName + "\":") + tagNameLength + 3);
    values = values.Substr(values.Find("\"" + tagName + "\":") + tagNameLength + 4);

    while (i < hours_ahead_count) {
        i = i + 1;

        tagValue = values.Substr(0, values.Find(","));
        values = values.Substr(tagValue.Length() + 1);

        !WriteLine(i # " temperature_2m: " # tagValue);

        realValue = tagValue.ToFloat();

        if (realValue < temp_min) {
            temp_min = realValue;
        }

        if (realValue > temp_max) {
            temp_max = realValue;
        }

        if(first_temp == 99.9)
        {
            first_temp = realValue;
        }
        else
        {
            if(realValue > first_temp)
            {
                temp_rising_count = temp_rising_count + 1;
            }
            else
            {
                temp_falling_count = temp_falling_count + 1;
            }
        }
    }
    
    !WriteLine(temp_rising_count);
    !WriteLine(temp_falling_count);

    if(temp_rising_count > temp_falling_count)
    {
        wetter_temp_rising = true;
    }
    else
    {
        wetter_temp_rising = false;
    }

    !WriteLine(temp_min);
    !WriteLine(temp_max);
    !WriteLine(wetter_temp_rising);

    !--------------------------------------------------------------------------!
    ! Dew Point Temperature

    integer i = 0;
    tagName = "dew_point_2m";
    tagNameLength = tagName.Length();

    values = stdout;
    values = values.Substr(values.Find("\"" + tagName + "\":") + tagNameLength + 3);
    values = values.Substr(values.Find("\"" + tagName + "\":") + tagNameLength + 4);

    while (i < hours_ahead_count) {
        i = i + 1;

        tagValue = values.Substr(0, values.Find(","));
        values = values.Substr(tagValue.Length() + 1);

        !WriteLine(i # " dew_point_2m: " # tagValue);

        realValue = tagValue.ToFloat();

        if (realValue > temp_dew_point) {
            temp_dew_point = realValue;
        }
    }

    !WriteLine(temp_dew_point);

    !--------------------------------------------------------------------------!
    ! Weather Icon

    integer i = 0;
    tagName = "weather_code";
    tagNameLength = tagName.Length();

    values = stdout;
    values = values.Substr(values.Find("\"" + tagName + "\":") + tagNameLength + 3);
    values = values.Substr(values.Find("\"" + tagName + "\":") + tagNameLength + 4);

    while (i < hours_ahead_count) {
        i = i + 1;

        tagValue = values.Substr(0, values.Find(","));
        values = values.Substr(tagValue.Length() + 1);

        !WriteLine(i # " weather_code: " # tagValue);

        integerValue = tagValue.ToInteger();

        if (integerValue > weather_code) {
            weather_code = integerValue;
        }
    }
    
    !WriteLine(weather_code);
    
    if(hour < 4 || hour > 5)
    {
        is_night = true;
    }
    else
    {
        is_night = false;
    }
    
    icon = "05";

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    ! 0  Clear sky
    if(weather_code == 0) 
    {
        if(!is_night)
        {
            icon = "10"; ! Sonne
        }
        else
        {
            icon = "11"; ! Mond
        }
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    ! 1, 2, 3  Mainly clear, partly cloudy, and overcast
    if(weather_code == 1) 
    {
        if(!is_night)
        {
            icon = "10"; ! Sonne
        }
        else
        {
            icon = "11"; ! Mond
        }
    }
    if(weather_code == 2)
    {
        if(!is_night)
        {
            icon = "19"; ! Wolke/Sonne
        }
        else
        {
            icon = "16"; ! Wolke/Mond
        }
    }
    if(weather_code == 3) 
    {
        if(!is_night)
        {
            icon = "19"; ! Wolke/Sonne
        }
        else
        {
            icon = "16"; ! Wolke/Mond
        }
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    ! 45, 48  Fog and depositing rime fog
    if(weather_code == 45) 
    {
        icon = "13"; ! Wolke
    }
    if(weather_code == 48) 
    {
        icon = "13"; ! Wolke
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    ! 51, 53, 55  Drizzle: Light, moderate, and dense intensity
    if(weather_code == 51) 
    {
        icon = "15"; ! Wolke/leichter Regen
    }
    if(weather_code == 53) 
    {
        icon = "17"; ! Wolke/Regen
    }
    if(weather_code == 55) 
    {
        icon = "17"; ! Wolke/Regen
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    ! 56, 57  Freezing Drizzle: Light and dense intensity
    if(weather_code == 56) 
    {
        icon = "15"; ! Wolke/leichter Regen
    }
    if(weather_code == 57) 
    {
        icon = "17"; ! Wolke/Regen
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    !61, 63, 65  Rain: Slight, moderate and heavy intensity
    if(weather_code == 61)
    {
        icon = "15"; ! Wolke/leichter Regen
    }
    if(weather_code == 63)
    {
        icon = "17"; ! Wolke/Regen
    }
    if(weather_code == 65) 
    {
        icon = "17"; ! Wolke/Regen
    }

    !66, 67  Freezing Rain: Light and heavy intensity
    if(weather_code == 66) 
    {
        icon = "15"; ! Wolke/leichter Regen
    }
    if(weather_code == 67)
    {
        icon = "17"; ! Wolke/Regen
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    !71, 73, 75  Snow fall: Slight, moderate, and heavy intensity
    if(weather_code == 71) 
    {
        icon = "18"; ! Wolke/Schnee
    }
    if(weather_code == 73) 
    {
        icon = "18"; ! Wolke/Schnee
    }
    if(weather_code == 75) 
    {
        icon = "18"; ! Wolke/Schnee
    }

    !77  Snow grains
    if(weather_code == 77) 
    {
        icon = "18"; ! Wolke/Schnee
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    !80, 81, 82  Rain showers: Slight, moderate, and violent
    if(weather_code == 80) 
    {
        icon = "20"; ! Wolke/Sonne/Regen
    }
    if(weather_code == 81) 
    {
        icon = "20"; ! Wolke/Sonne/Regen
    }
    if(weather_code == 82) 
    {
        icon = "20"; ! Wolke/Sonne/Regen
    }

    !85, 86  Snow showers slight and heavy
    if(weather_code == 85) 
    {
        icon = "21"; ! Wolke/Schneeflocke
    }
    if(weather_code == 86) 
    {
        icon = "21"; ! Wolke/Schneeflocke
    }

    ! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !
    !95 *  Thunderstorm: Slight or moderate
    if(weather_code == 95) 
    {
        icon = "14"; ! Wolke/Blitz;
    }

    !96, 99 *  Thunderstorm with slight and heavy hail
    if(weather_code == 96) 
    {
        icon = "14"; ! Wolke/Blitz;
    }
    if(weather_code == 99)
    {
        icon = "14"; ! Wolke/Blitz;
    }

    !----------------------------------------------------------------------------- !

    dom.GetObject("WetterTempMin").State(temp_min);
    dom.GetObject("WetterTempMax").State(temp_max);
    dom.GetObject("WetterTempRising").State(wetter_temp_rising);
    dom.GetObject("WetterTempDewPoint").State(temp_dew_point);
    dom.GetObject("WetterIcon").State(icon);

    !----------------------------------------------------------------------------- !
    !Debug

    WriteLine("Min: " # dom.GetObject("WetterTempMin").Value());
    WriteLine("Max: " # dom.GetObject("WetterTempMax").Value());
    WriteLine("WetterTempRising: " # dom.GetObject("WetterTempRising").Value());
    WriteLine("Dew Point: " # dom.GetObject("WetterTempDewPoint").Value());
    WriteLine("Icon: " # dom.GetObject("WetterIcon").Value());
}