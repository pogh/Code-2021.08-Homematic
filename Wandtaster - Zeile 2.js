real temp;
string icon = "0";
string text = "";
string beep = "";

! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !

if(dom.GetObject("WetterTempRising").Value() == true)
{
    temp = dom.GetObject("WetterTempMax").Value();
}
else
{
    temp = dom.GetObject("WetterTempMin").Value();
}
temp = temp.Round(0);

text = temp.ToString();

! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !

text = text.Substr(0, text.Find(".") + 0) + dom.GetObject("Gradzeichen").Value() + "C";  ! Find() + 0 ==> Homematic Bug

text = text.Replace("ä", "{");
text = text.Replace("ö", "|");
text = text.Replace("ü", "}");
text = text.Replace("Ä", "[");
text = text.Replace("Ö", "#");
text = text.Replace("Ü", "$");
text = text.Replace("ß", "_");
text = text.Replace("°", dom.GetObject("Gradzeichen").Value());

! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !

icon = dom.GetObject("WetterIcon").Value();

! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - !

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # " ,DDID=2,DDC=true}" # beep);
