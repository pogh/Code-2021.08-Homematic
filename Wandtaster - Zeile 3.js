real temperatur = dom.GetObject("IstTemperatur").Value();
string text = temperatur.ToString();
text = text.Substr(0, text.Find(".") + 2);
text = text + dom.GetObject("Gradzeichen").Value() + "C";

string icon = "";
string beep = "";

if(dom.GetObject("FensterOffen").Value() == true)
{
    icon = "24";
    text = text # "  ";
}
else
{
    icon = "";
};

if(dom.GetObject("NiedrigtempWarnung").Value() == true)
{
    icon = "7";
    beep = ",{R=2,IN=5,ANS=7}";
}

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # ",DDID=3,DDC=true}" # beep);