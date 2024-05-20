string icon = "";
string text = "";
string beep = "";

if(dom.GetObject("AnzahlNiedrigeBatterien").Value() > 0)
{
    icon = "9";
    text = "Batterie ";
};

if(dom.GetObject("BalkontürOffen").Value() == true)
{
    text = " Balkont}r";
    if(icon != "")
    {
        text = text + " ";
    };
};

text = text.Replace("ä", "{");
text = text.Replace("ö", "|");
text = text.Replace("ü", "}");
text = text.Replace("Ä", "[");
text = text.Replace("Ö", "#");
text = text.Replace("Ü", "$");
text = text.Replace("ß", "_");
text = text.Replace("°", dom.GetObject("Gradzeichen").Value());

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # ",DDID=4,DDC=true}" # beep);