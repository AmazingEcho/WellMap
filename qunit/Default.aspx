<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Call Server Side C# method from JavaScript 
using XMLHttpRequest with Parameters</title>
    <script type="text/javascript">
        function GetServerDate(format) {
            var xmlhttp;
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            var url = "Default.aspx?Method=GetServerDate&format=" + format;
            xmlhttp.open("Get", url, false);
            xmlhttp.send(null);
            document.getElementById("currentDate").innerHTML = xmlhttp.responseText;
        }
 
    </script>
     
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <input type="button" value="Show UTC Server Time" onclick="GetServerDate('utc')" />
    <input type="button" value="Show Local Server Time" onclick="GetServerDate('local')" />
    <label id="currentDate">This is current Date Time in Web Server</label>
    </div>
    </form>
</body>
</html>
