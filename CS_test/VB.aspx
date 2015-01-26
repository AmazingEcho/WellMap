<%@ Page Language="VB" AutoEventWireup="false" CodeFile="VB.aspx.vb" Inherits="VB" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
<script type = "text/javascript">
    function ShowCurrentTime() {
        debugger;
        PageMethods.GetCurrentTime(document.getElementById("<%=txtUserName.ClientID%>"), OnSucceed);
    }
    function OnSucceed(response, userContext, methodName) {
        alert(response);
    }
</script> 
</head>
<body style = "font-family:Arial; font-size:10pt">
<form id="form1" runat="server">
<asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods = "true">
</asp:ScriptManager>

<div>
    Your Name : 
    <asp:TextBox ID="txtUserName" runat="server"></asp:TextBox>
    <input id="btnGetTime" type="button" value="Show Current Time" onclick = "ShowCurrentTime()" />
</div>
</form>
</body>
</html>
