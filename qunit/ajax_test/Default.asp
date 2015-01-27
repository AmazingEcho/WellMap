<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager 
        EnablePageMethods="true" 
        ID="MainSM" 
        runat="server" 
        ScriptMode="Release" 
        LoadScriptsBeforeUI="true"
        >
        <Scripts>
            <asp:ScriptReference Path="~/Scripts/Main.js" />
        </Scripts>
    </asp:ScriptManager>
        <input value="GetTime" type="button" onclick="mainScreen.GetTime();" />
        <div id="resultDiv"></div>
    </form>
</body>
</html>
