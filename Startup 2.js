dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=,DDA=CENTER,DDS=,DDID=2,DDC=false}");
dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=,DDA=CENTER,DDS=,DDID=3,DDC=false}");
dom.GetObject("HmIP-RF.002A5D8989D5D9:3.COMBINED_PARAMETER").State("{DDBC=WHITE,DDTC=BLACK,DDI=,DDA=CENTER,DDS=,DDID=4,DDC=false}");

dom.GetObject("Systemvariabel - Temperaturen Heute").ProgramExecute();

dom.GetObject("Wandtaster - Zeile 2").ProgramExecute();
dom.GetObject("Wandtaster - Zeile 3").ProgramExecute();
dom.GetObject("Wandtaster - Zeile 4").ProgramExecute();