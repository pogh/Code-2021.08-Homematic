integer openCount = 0;
integer closedCount = 0;

string fensterKontaktId;
foreach(fensterKontaktId, dom.GetObject("Fensterkontakt").EnumUsedIDs())
{
    var fensterKontakt = dom.GetObject(fensterKontaktId);
    var device = dom.GetObject(fensterKontakt.Device());
    var ch = device.Channels().GetAt(1);
    var dp  = ch.DPByHssDP("STATE");

    !WriteLine(device.Name());

    if(dp.Value() == 1) {
        openCount = openCount + 1;
    } else {
        closedCount = closedCount + 1;
    }       
}

WriteLine("Opened: " # openCount);
WriteLine("Closed: " # closedCount);

boolean fensterOffen = (openCount > 0);

if(dom.GetObject("FensterOffen").Value() != fensterOffen) 
{
    dom.GetObject("FensterOffen").State(fensterOffen);
    WriteLine("New FensterOffen: " # fensterOffen);
}

!WriteLine(dom.GetObject("FensterOffen").Value());