
string deviceId;
object device;

integer deviceCount = 0;
real temperatureTotal = 0.0;

foreach(deviceId, dom.GetObject(ID_DEVICES).EnumUsedIDs()) {
  var device = dom.GetObject(deviceId);
  if(device.HssType() == "HmIP-eTRV-2")
  {
        var channel = device.Channels().GetAt(1);
        var dp  = channel.DPByHssDP("ACTUAL_TEMPERATURE");
        
        WriteLine(device # ": " # dp.Value());

        if(dp.Value() > 0)
        {
            deviceCount = deviceCount + 1;
            temperatureTotal = temperatureTotal + dp.Value();
        }
  }
}


real temperatur = (temperatureTotal / deviceCount);
real savedTemperatur = dom.GetObject("IstTemperatur").Value();

WriteLine("");
WriteLine("temperatur: " # temperatur);
WriteLine("savedTemperatur: " # savedTemperatur);
WriteLine("");

if(
    ((temperatur - savedTemperatur) > 0.25)
    ||
    ((savedTemperatur - temperatur) > 0.25)
)
{
    string newTemperatur = temperatur.ToString();
    newTemperatur = newTemperatur.Substr(0, newTemperatur.Find(".") + 2);
    dom.GetObject("IstTemperatur").State(newTemperatur);
    WriteLine("New Temperature: " # newTemperatur);
}