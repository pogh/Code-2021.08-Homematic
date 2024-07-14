dom.GetObject("InternetShuttingDown").State(false);
dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=25,DDA=CENTER,DDS= ,DDID=3,DDC=},{R=,IN=,ANS=1}");
dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=,DDA=CENTER,DDS=" # system.Date(" %T").Substr(0,6) # ",DDID=4,DDC=true}");
system.Save();
system.Exec("poweroff -d 15");