using System.Web.Services;
using System.Data.SQLClient;
using System;
using System.Xml.Serialization;

public class WellAccess{

public Struct WellInfo{
  int wellKey;
  int wellGroup;
  string wellName;
  string wellType;
  double latitude;
  double longitude;
  int wellCapacity;
  int wellOutput;
}

static List<WellInfo> wellInfoList = new List<WellInfo> {};

//adding to each function
/*
static void initialize_connection(){
  
  SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
  try{
    myConnection.Open();
  }
  catch(Exception e){
    Console.WriteLine(e.ToString());
  }
  return 0;
}
*/

//inserts new well into database with given information
//returns true if successful, false if an exception occurred
[WebMethod]
static string add_new(int wellGroup, string wellname, string welltype, double latitude, double longitude, int wellCapacity, int wellOutput){
  
   SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   SQLCommand myCommand = new SQLCommand("INSERT into wells (wellGroup, wellName, wellType, lat, lng, wellCapacity, wellOutput")" +
    "Values('wellgroup', 'wellname', 'welltype', latitude, longitude, wellCapacity, wellOutput)", myConnection);
    try{
      myConnection.Open();
      myCommand.ExecuteNonQuery();
      myConnection.Close();
    }
    catch (Exception e){
      Console.WriteLine(e.ToString());
	  return "False";
    }
    return "True";
}

//returns an array of the wells in the database
[WebMethod]
public List<WellInfo> read_data(){
     try{
     SQLCommand command = new SQLCommand("select * from wells", myConnection);
	 DataSet ds = GetData(command);
	 DataTable dt = ds.Tables[0];
	 foreach(DataRow item in ds.Tables[0].Rows){
		 wellInfo WI = new wellInfo();
		 WI.wellKey = item["wellKey"].GetInt16();
		 WI.wellGroup = item["wellGroup"].GetInt16();
		 WI.wellName = item["wellName"].ToString();
		 WI.wellType = item["wellType"].ToString();
		 WI.latitude = item["lat"].GetInt16();
		 WI.longitude = item["lng"].GetInt16();
		 WI.wellCapacity = item["wellCapacity"].GetInt16();
		 WI.wellOutput = item["wellOutput"].GetInt16();
		 wellInfoList.Add(WI);
	 }
	 return wellInfoList;

   }
   Catch (Exception e){
     Console.WriteLine(e.ToString());
   }
}

//used by readData to pull info from the database
private static DataSet GetData(SQLCommand command){
	string str = "userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30";
	using (SQLConnection con = new SQLConnection(str)){
		using (SQLDataAdaptor sda = new SQLDataAdaptor()){
			command.Connection = con;
			sda.SelectCommand = command;
			using (DataSet ds = new DataSet()){
				sda.Fill(ds)
				return ds;
			}
		}
	}
}	

//updates a well entry in the database with the given information
//returns true if successful, false if an exception occurred

[WebMethod]
public string update_well(int workingWellKey, int newWellGroup, string newWellname, string newWelltype, double newLatitude, double newLongitude, int newWellCapacity, int newWellOutput){
  SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
  SQLCommand myCommand = new SQLCommand("UPDATE wells SET wellGroup = newWellGroup, wellName = newWellName, wellType = newWellType, lat = newLatitude, lng = newLongitude, wellCapacity = newWellCapacity, wellOutput = newWellOutput" +
      "WHERE wellKey == workingWellKey", myConnection);
    try{
      myConnection.Open();
      myCommand.ExecuteNonQuery();
      myConnection.Close();
    }
    catch (Exception e){
      Console.WriteLine(e.ToString());
	  return "False";
    }
    return "True";
}

//delete a well from the database with the matching key as given
//returns true if successful, false if an exception occurred

[WebMethod]
public string delete_well(int workingWellKey){
    SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
    SQLCommand myCommand = new SQLCommand("Delete from wells WHERE wellKey = workingWellKey", myConnection);
    try{
      myConnection.Open();
      myCommand.ExecuteNonQuery();
      myConnection.Close();
    }
    catch (Exception e){
      Console.WriteLine(e.ToString());
	  return "False";
    }
    return "True";
}

/*static void close_connection(){
   SQLConnection myConnection = new SQLConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   
  try{
  myConnection.Close();
  }
  catch(Exception e){
  Console.WriteLine(e.ToString());
  }
  return 0;
}*/

}