string deviceId;
object device;

integer deviceCount = 0;
real temperatureTotal = 0.0;
real temperatureLow = 99;

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
        if(dp.Value() < temperatureLow)
        {
            temperatureLow = dp.Value();
        }
  }
}

real temperatur = (temperatureTotal / deviceCount);
real savedTemperatur = dom.GetObject("IstTemperatur").Value();

WriteLine("");
WriteLine("temperatur: " # temperatur);
WriteLine("savedTemperatur: " # savedTemperatur);
WriteLine("temperatureLow: " # temperatureLow);
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

if(
    (temperatureLow == 0)
    && 
    (dom.GetObject("NiedrigtempWarnung").Value() != false)
)
{
    dom.GetObject("NiedrigtempWarnung").State(false);
}

if(
    (temperatureLow != 0)
    &&
    (temperatureLow < 16)
    && 
    (dom.GetObject("NiedrigtempWarnung").Value() != true)
)
{
    dom.GetObject("NiedrigtempWarnung").State(true);
}

if(
    (temperatureLow != 0)
    &&
    (temperatureLow >= 16)
    && 
    (dom.GetObject("NiedrigtempWarnung").Value() != false)
)
{
    dom.GetObject("NiedrigtempWarnung").State(false);
}