string icon = "";
string text = "";
string beep = "";

if(dom.GetObject("AnzahlNiedrigeBatterien").Value() > 0)
{
    icon = "7";
    text = "Batterie ";
    beep = ",{R=2,IN=5,ANS=7}";
};

if(dom.GetObject("BalkontürOffen").Value() == true)
{
    text = " Balkont}r";
    if(icon != "")
    {
        text = text + " ";
    };
};

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # ",DDID=4,DDC=true}" # beep);