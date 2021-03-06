
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>WellMap QUnit Test Suite</title>
  <link rel="stylesheet" href="qunit.css">
</head>
<body>
	<asp:ScriptManager ID="ScriptMgr" runat="server" EnablePageMethods="true">
        </asp:ScriptManager>
	<div id="qunit"></div>
	<div id="qunit-fixture"></div>
	<script src="qunit.js"></script>
	<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBvwCMuLz31gLXoawbDBntieQjGPMrf5vA&sensor=false"></script>
	<script src="../gmaps.js"></script>
	<script src="../controller.js"></script>
	<script src="qunit_tests.js"></script>
</body>

</html>
