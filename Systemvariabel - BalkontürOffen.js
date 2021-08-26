var tuerKontakt = dom.GetObject("Wohnzimmer Balkontür Unten");
var ch = tuerKontakt.Channels().GetAt(1);
var dp  = ch.DPByHssDP("STATE");

boolean isOpen;

if(dp.Value() == 1)
{
    isOpen = true;
}
else
{
    isOpen = false;
}

if(dom.GetObject("BalkontürOffen").Value() != isOpen) 
{
    dom.GetObject("BalkontürOffen").State(isOpen);
    WriteLine("New BalkontürOffen: " # isOpen);
}

!WriteLine(dom.GetObject("BalkontürOffen").Value());