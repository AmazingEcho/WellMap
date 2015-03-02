<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DBImport.aspx.cs" Inherits="_DBImport" %>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>AutoComplete Box with jQuery</title>
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/themes/base/jquery-ui.css"
        rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.min.js"></script>
       <script type="text/javascript">
           $(document).ready(function () {
               $('#Button1').click(function () {
                   $.ajax({
                       type: "POST",
                       url: 'DBImport.aspx/add_new',
                       data: "{'wellGroup': " +document.getElementById('txtWellGroup').value+ ", 'wellName': " +document.getElementById('txtWellName').value+ ", 'wellType': " +document.getElementById('txtWellType').value+ ", 'latitude': " +document.getElementById('txtWellLat').value+ ", 'longitude': " +document.getElementById('txtWellLong').value+ ", 'wellCapacity': " +document.getElementById('txtWellCapacity').value+ ", 'wellOutput': " +document.getElementById('txtWellOutput').value+ "}",
                       contentType: "application/json; charset=utf-8",
                       datatype: "json",
                       async:false,
                       success: function(msg){
                           $('#txtWellGroup').val('');
                           $('#txtWellName').val('')
                           $('#txtWellType').val('');
                           $('#txtWellLat').val('');
                           $('#txtWellLng').val('');
                           $('#txtWellCapacity').val('');
                           $('#txtWellOutput').val('');
                           $("#divResult").html("success");
                       },
                       error: function(e){
                           $("#divResult").html("Something Wrong.");
                       }
                   });              
               });
            });

	</script>
</head>
<body>
    <form id="form1" runat="server">
    <div>


       WellGroup: <asp:TextBox ID="txtWellGroup" runat="server" ClientIDMode="Static" Width="202px"></asp:TextBox>
            <br />
            <br />
       WellName: <asp:TextBox ID="txtWellName" runat="server" ClientIDMode="Static" Width="210px"></asp:TextBox>
            <br />
            <br />           
       WellType: <asp:TextBox ID="txtWellType" runat="server" ClientIDMode="Static" Width="202px"></asp:TextBox>
            <br />
            <br />           
       Latitude: <asp:TextBox ID="txtWellLat" runat="server" ClientIDMode="Static" Width="202px"></asp:TextBox>
            <br />
            <br />           
       Longitude: <asp:TextBox ID="txtWellLong" runat="server" ClientIDMode="Static" Width="202px"></asp:TextBox>
            <br />
            <br />           
       WellCapacity: <asp:TextBox ID="txtWellCapacity" runat="server" ClientIDMode="Static" Width="202px"></asp:TextBox>
            <br />
            <br />           
       WellOutput: <asp:TextBox ID="txtWellOutput" runat="server" ClientIDMode="Static" Width="202px"></asp:TextBox>
            <br />
            <br />





        <asp:Button ID="Button1" runat="server" Text="Button" ClientIDMode="Static" />

    </div>
    </form>
</body>
</html>