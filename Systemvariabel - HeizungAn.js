string sDevId;
boolean btempSet;

foreach (sDevId, root.Devices().EnumUsedIDs()) {
    object oDevice = dom.GetObject(sDevId);
    
    boolean bDevReady = oDevice.ReadyConfig();

    if (bDevReady) {
        if(oDevice.HssType() == "HmIP-eTRV-2") {
            string sDevName = oDevice.Name();
            object oChn = oDevice.Channels().GetAt(1);
            object dp  = oChn.DPByHssDP("SET_POINT_TEMPERATURE");

            WriteLine(sDevName # ': ' # dp.Value().ToString());

            if(dp.Value() > 4.5) {
                btempSet = true;
            }
        }
    }
}

if(dom.GetObject("HeizungAn").Value() != btempSet) 
{
    dom.GetObject("HeizungAn").State(btempSet);
    WriteLine("New HeizungAn: " # btempSet);
}