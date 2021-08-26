string icon = "0";
string text = "";
string beep = "";

icon = "0";
text = dom.GetObject("TemperaturenHeute").Value();
beep = "";

dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=" # icon # ",DDA=CENTER,DDS=" # text # ",DDID=2,DDC=true}" # beep);