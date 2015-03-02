using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using System.Web.Script.Services;
using System.IO;
using System.Xml.Serialization;
using System.Data;
using System.Text;

[WebService(Namespace = "http://team-avengineers.github.io/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]

//public class DBImport : System.Web.Services.WebService {
public partial class _DBImport : System.Web.UI.Page {

public struct WellInfo{
  public int wellKey;
  public int wellGroup;
  public string wellName;
  public string wellType;
  public double latitude;
  public double longitude;
  public int wellCapacity;
  public int wellOutput;


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
  
   SqlConnection myConnection = new SqlConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   SqlCommand myCommand = new SqlCommand("INSERT into wells Values('" + wellGroup + "', '" + wellname +"', '" + welltype + "', '" + latitude + "', '" + longitude + "', '" + wellCapacity + "', '" + wellOutput + "')", myConnection);
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
     SqlCommand command = new SqlCommand("select * from wells");
	 DataSet ds = GetData(command);
	 DataTable dt = ds.Tables[0];
	 foreach(DataRow item in ds.Tables[0].Rows){
		 WellInfo WI = new WellInfo();
		 WI.wellKey = Convert.ToInt16(item["wellKey"].ToString());
		 WI.wellGroup = Convert.ToInt16(item["wellGroup"].ToString());
		 WI.wellName = item["wellName"].ToString();
		 WI.wellType = item["wellType"].ToString();
		 WI.latitude = Convert.ToInt16(item["lat"].ToString());
		 WI.longitude = Convert.ToInt16(item["lng"].ToString());
		 WI.wellCapacity = Convert.ToInt16(item["wellCapacity"].ToString());
		 WI.wellOutput = Convert.ToInt16(item["wellOutput"].ToString());
		 wellInfoList.Add(WI);
	 }
	 return wellInfoList;

   }
   catch (Exception e){
     Console.WriteLine(e.ToString());
     return null;
   }
}

//used by readData to pull info from the database
private static DataSet GetData(SqlCommand command){
	string str = "userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30";
	using (SqlConnection con = new SqlConnection(str)){
		using (SqlDataAdapter sda = new SqlDataAdapter()){
			command.Connection = con;
			sda.SelectCommand = command;
			using (DataSet ds = new DataSet()){
                sda.Fill(ds);
				return ds;
			}
		}
	}
}	

//updates a well entry in the database with the given information
//returns true if successful, false if an exception occurred

[WebMethod]
public string update_well(int workingWellKey, int newWellGroup, string newWellname, string newWelltype, double newLatitude, double newLongitude, int newWellCapacity, int newWellOutput){
  SqlConnection myConnection = new SqlConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
  SqlCommand myCommand = new SqlCommand("UPDATE wells SET wellGroup = newWellGroup, wellName = newWellName, wellType = newWellType, lat = newLatitude, lng = newLongitude, wellCapacity = newWellCapacity, wellOutput = newWellOutput" +
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
    SqlConnection myConnection = new SqlConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
    SqlCommand myCommand = new SqlCommand("Delete from wells WHERE wellKey = workingWellKey", myConnection);
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
   SqlConnection myConnection = new SqlConnection("userid = tconxnet_CScode; password = z2lafile6b2mq044; server = http://www.tconx.net/phpMyAdmin/; Trusted_Connection = yes; database = tconxnet_wellmap2; connection timeout = 30");
   
  try{
  myConnection.Close();
  }
  catch(Exception e){
  Console.WriteLine(e.ToString());
  }
  return 0;
}*/

}