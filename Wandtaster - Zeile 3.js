real temperatur = dom.GetObject("IstTemperatur").Value();
string text = temperatur.ToString();
text = text.Substr(0, text.Find(".") + 2);
text = text + dom.GetObject("Gradzeichen").Value() + "C";

string icon = "0";
if(dom.GetObject("FensterOffen").Value() == true)
{
icon = "24";
text = text # "  ";
}
else
{
icon = "";
};

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # ",DDID=3,DDC=true}");