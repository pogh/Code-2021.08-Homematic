!-----------------------------------------------------------------------------!
! Day icon 	Night icon 	Description
! 01d.png 	01n.png 	clear sky
! 02d.png 	02n.png 	few clouds
! 03d.png 	03n.png 	scattered clouds
! 04d.png 	04n.png 	broken clouds
! 09d.png 	09n.png 	shower rain
! 10d.png 	10n.png 	rain
! 11d.png 	11n.png 	thunderstorm
! 13d.png 	13n.png 	snow
! 50d.png 	50n.png 	mist 

!-----------------------------------------------------------------------------!
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

!-----------------------------------------------------------------------------!

string icon = "0";
string text = "";
string beep = "";

string iconVariable = dom.GetObject("WetterIcon").Value().Substr(0, 2);

if((system.Date("%H").ToInteger() >= 3)
&& (system.Date("%H").ToInteger() < 17))
{
    text = dom.GetObject("WetterTempMax").Value();

    if(dom.GetObject("WetterTempDewPoint").Value() > 16)
    {
        text = "Warm! " + text;
    }

    icon = "10"; ! Sonne

    !clear sky
    if(iconVariable == "01")
    { 	
        icon = "10"; ! Sonne
    }
    
    !few clouds: 11 - 25 %
    if(iconVariable == "02")  
    {
        icon = "10"; ! Sonne
    }
    
    !scattered clouds: 25 - 50 %
    if(iconVariable == "03")  
    { 	
        icon = "19";  ! Wolke/Sonne
    }
    
    !broken clouds: 51 - 100 %
    if(iconVariable == "04")  
    { 	
        icon = "13";  ! Wolke
    }
    
    !shower rain
    if(iconVariable == "09")  
    { 	
        icon = "17";  ! Wolke/Regen
    }
    
    !rain
    if(iconVariable == "10")  
    { 	
        icon = "17";  ! Wolke/Regen
    }
    
    !thunderstorm
    if(iconVariable == "11")  
    { 	
        icon = "14";  ! Wolke/Blitz
    }
    
    !snow
    if(iconVariable == "13")  
    { 	
        icon = "18";  ! Wolke/Schnee
    }
    
    !mist
    if(iconVariable == "50")   
    { 	
        icon = "13";  ! Wolke
    }
}
else
{
    text = dom.GetObject("WetterTempMin").Value();
    icon = "11"; ! Mond

    !clear sky
    if(iconVariable == "01")  
    { 	
        icon = "11"; ! Mond
    }
    
    !few clouds: 11 - 25 %
    if(iconVariable == "02")  
    {
        icon = "11"; ! Mond
    }
    
    !scattered clouds: 25 - 50 %
    if(iconVariable == "03")  
    { 	
        icon = "16"; ! Wolke/Mond
    }
    
    !broken clouds: 51 - 100 %
    if(iconVariable == "04")  
    { 	
        icon = "13";  ! Wolke
    }
    
    !shower rain
    if(iconVariable == "09")  
    { 	
        icon = "17";  ! Wolke/Regen
    }
    
    !rain
    if(iconVariable == "10")  
    { 	
        icon = "17";  ! Wolke/Regen
    }
    
    !thunderstorm
    if(iconVariable == "11")  
    { 	
        icon = "14";  ! Wolke/Blitz
    }
    
    !snow
    if(iconVariable == "13")  
    { 	
        icon = "18";  ! Wolke/Schnee
    }
    
    !mist
    if(iconVariable == "50")   
    { 	
        icon = "13";  ! Wolke
    }
}

text = text.Replace("ä", "{");
text = text.Replace("ö", "|");
text = text.Replace("ü", "}");
text = text.Replace("Ä", "[");
text = text.Replace("Ö", "#");
text = text.Replace("Ü", "$");
text = text.Replace("ß", "_");
text = text.Replace("°", dom.GetObject("Gradzeichen").Value());

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # ",DDID=2,DDC=true}" # beep);
