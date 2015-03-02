<%@ Page Language="C#" AutoEventWireup="true" CodeFile="dbaccess.aspx.cs" Inherits="_Default" %>
 
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
		$.ajax({
			type: "POST",
			url: 'WellMap.dbaccess/delete_well',
			data: "{workingWellKey: " +key+ "}",
			contentType: "application/json; charset=utf-8",
			datatype: "json",
			async:false,
			success: function(msg){
				$('#toDeleteWellKey').val('');
				$("#divResult").html("success");
			},
			error: function(e){
				$("#divResult").html("Something Wrong.");
			}
		});
	</script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="demo">
        <div class="ui-widget">
            <label for="tbAuto">
                Enter UserName:
            </label>
&nbsp;<asp:TextBox ID="txtUserName" runat="server" ClientIDMode="Static" Width="202px"></asp:TextBox>
            <br />
            <br />
            Email: <asp:TextBox ID="txtEmail" runat="server" ClientIDMode="Static" Width="210px"></asp:TextBox>
            <br />
            <br />           
            <asp:Button ID="Button1" runat="server" Text="Button" ClientIDMode="Static" />
        </div>
    </div>
    </form>
</body>
</html>