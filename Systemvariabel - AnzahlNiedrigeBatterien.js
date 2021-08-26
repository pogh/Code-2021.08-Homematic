integer count = 0;
integer lowBatCount = 0;

string id;
foreach(id, dom.GetObject(ID_DEVICES).EnumUsedIDs())
{
count = count + 1;

var device = dom.GetObject(id);
var ch = device.Channels().GetAt(0);

var dp = ch.DPByHssDP("LOWBAT");
if (!dp) {
    var dp = ch.DPByHssDP("LOW_BAT");
 }

 if ( dp.State() && dp.Value() ) {
     lowBatCount = lowBatCount + 1;
 }

!WriteLine(device.Name());
}

if(dom.GetObject("AnzahlNiedrigeBatterien").Value() != lowBatCount)
{
dom.GetObject("AnzahlNiedrigeBatterien").State(lowBatCount);
WriteLine("New AnzahlNiedrigeBatterien: " # lowBatCount);
}

WriteLine("Count: " # count);
WriteLine("Low Battery Count: " # lowBatCount);