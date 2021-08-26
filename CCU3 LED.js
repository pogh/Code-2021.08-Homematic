if(dom.GetObject("AnzahlNiedrigeBatterien").Value() > 0)
{
    system.Exec("rm /etc/config/disableLED");
}
else
{
    system.Exec("touch /etc/config/disableLED");
}