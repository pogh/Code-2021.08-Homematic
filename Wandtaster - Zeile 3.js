real temp = dom.GetObject("IstTemperatur").Value();
string text = temp.ToString();
text = text.Substr(0, text.Find(".") + 2) + dom.GetObject("Gradzeichen").Value() + "C";

string icon = "";
string beep = "";

if(dom.GetObject("FensterOffen").Value() == true)
{
    icon = "24";
}

if(dom.GetObject("NiedrigtempWarnung").Value() == true)
{
    icon = "21";
    beep = ",{R=2,IN=5,ANS=7}";
}

if(icon != "")
{
    text = text # "  ";
}

text = text.Replace("ä", "{");
text = text.Replace("ö", "|");
text = text.Replace("ü", "}");
text = text.Replace("Ä", "[");
text = text.Replace("Ö", "#");
text = text.Replace("Ü", "$");
text = text.Replace("ß", "_");
text = text.Replace("°", dom.GetObject("Gradzeichen").Value());

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # ",DDID=3,DDC=true}" # beep);